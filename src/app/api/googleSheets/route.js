import { google } from 'googleapis';

export async function POST(req) {
  try {
    // Parse incoming request data
    const data = await req.json();

    // Ensure required environment variables are loaded
    if (
      !process.env.LD_CLIENT_EMAIL ||
      !process.env.LD_PRIVATE_KEY ||
      !process.env.LD_SPREADSHEET_ID
    ) {
      throw new Error("Missing required environment variables");
    }

    // Initialize Google Sheets API credentials
    const auth = new google.auth.JWT(
      process.env.LD_CLIENT_EMAIL,
      null,
      process.env.LD_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Define the spreadsheet ID and the range where data will be appended
    const SPREADSHEET_ID = process.env.LD_SPREADSHEET_ID;
    const range = 'Sheet1!A1'; // Adjust based on your sheet structure

    // Prepare the data to be appended
    const values = [Object.values(data)];
    const resource = { values };

    // Append data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'RAW',
      resource,
    });

    // Respond with success
    return new Response(
      JSON.stringify({
        success: true,
        data: response.data,
        message: "Data appended successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    // Respond with error details
    console.error("Error appending data to Google Sheets:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}