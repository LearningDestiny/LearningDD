import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import os from 'os';
import fs from 'fs/promises';
import path from 'path';

// Credentials object for Google API
const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
};

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function authorize() {
  const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    SCOPES
  );

  await jwtClient.authorize();
  return jwtClient;
}

async function uploadFile(authClient, file) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileMetadata = {
    name: file.name,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: file.type,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('resume');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file into a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use the OS temporary directory
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, file.name);

    // Write the buffer to a temporary file
    await fs.writeFile(filePath, buffer);

    // Authorize and upload to Google Drive
    const authClient = await authorize();
    const fileId = await uploadFile(authClient, { name: file.name, type: file.type, path: filePath });

    // Clean up the temporary file
    await fs.unlink(filePath);

    return NextResponse.json({ message: 'File uploaded successfully', fileId });
  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
