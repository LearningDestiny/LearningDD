import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, contactNumber, stream, qualification } = req.body;

  console.log("Received data:", { name, contactNumber, stream, qualification });

  if (!name || !contactNumber || !stream || !qualification) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const { google } = await import('googleapis');

    console.log("Initializing Google Auth...");
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

    console.log("Creating Google Sheets instance...");
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1Ofv_aqtrPPquN9RqnvsLuhEmCRAf9gdFOo96aYBiMZE";

    console.log("Attempting to save data to Google Sheets...");
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, contactNumber, stream, qualification]],
      },
    });

    console.log("Data saved successfully:", result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error saving data to Google Sheets:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to save data", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}