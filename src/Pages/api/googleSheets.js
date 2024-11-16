import { google } from "googleapis";

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Destructure data from the request body
  const { name, contactNumber, stream, qualification } = req.body;

  // Log received data for debugging
  console.log("Received data:", { name, contactNumber, stream, qualification });

  try {
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1Ofv_aqtrPPquN9RqnvsLuhEmCRAf9gdFOo96aYBiMZE"; // Replace with your actual spreadsheet ID

    // Append data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:D", // Update range to match your Google Sheet
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, contactNumber, stream, qualification]],
      },
    });

    // Respond with success
    res.status(200).json({ success: true, message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data to Google Sheets:", error.message);
    console.error(error); // Log the full error object for debugging
    res.status(500).json({ success: false, message: "Failed to save data" });
  }
}
