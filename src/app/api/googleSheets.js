import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, contactNumber, stream, qualification } = req.body;

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      const sheetId = process.env.GOOGLE_SHEET_ID;

      const request = {
        spreadsheetId: sheetId,
        range: 'Sheet1!A2:D',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [[name, contactNumber, stream, qualification]],
        },
      };

      const response = await sheets.spreadsheets.values.append(request);

      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        throw new Error('Failed to write to Google Sheets');
      }
    } catch (error) {
      console.error('Error interacting with Google Sheets:', error);
      res.status(500).json({ success: false, message: 'Error saving data to Google Sheets' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
