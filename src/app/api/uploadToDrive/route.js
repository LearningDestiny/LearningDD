import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

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
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
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

async function uploadFile(authClient, filePath, fileName, mimeType) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileMetadata = {
    name: fileName,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType,
    body: fs.createReadStream(filePath),
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

    // Save the file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempDir = os.tmpdir(); // Get the temp directory
    const filePath = path.join(tempDir, file.name);

    await fs.writeFile(filePath, buffer);

    // Upload to Google Drive
    const authClient = await authorize();
    const fileId = await uploadFile(authClient, filePath, file.name, file.type);

    // Clean up temp file
    await fs.unlink(filePath);

    return NextResponse.json({ message: 'File uploaded successfully', fileId });
  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
