import { google } from 'googleapis';

// This will fetch the credentials from environment variables
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  project_id: process.env.GOOGLE_PROJECT_ID,
};

// Google Sheets setup
const sheets = google.sheets('v4');
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Authenticate and create a client
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
  null
);

// Fetch data from Google Sheets
export const fetchSheetData = async () => {
  try {
    const res = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:Z1000', // Adjust the range based on your sheet
    });
    return res.data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return null;
  }
};

// Insert data into Google Sheets
export const insertDataIntoSheet = async (data) => {
  try {
    const res = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1', // Adjust the range based on your sheet
      valueInputOption: 'RAW',
      resource: {
        values: [data], // 'data' should be an array of values to append
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error inserting data into Google Sheets:', error);
    return null;
  }
};

// API handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch data from Google Sheets
    const data = await fetchSheetData();
    if (data) {
      res.status(200).json({ success: true, data });
    } else {
      res.status(500).json({ success: false, message: 'Failed to fetch data.' });
    }
  } else if (req.method === 'POST') {
    // Insert data into Google Sheets
    const { formData } = req.body;
    const result = await insertDataIntoSheet(formData);
    if (result) {
      res.status(200).json({ success: true, message: 'Data inserted successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to insert data.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
