// pages/api/googleSheets.js
import { appendData } from "../../path/to/your/GoogleSheetService"; // Adjust the path accordingly

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, contact } = req.body;

    // Validate the incoming data
    if (!name || !email || !contact) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
      await appendData([name, email, contact]); // Assuming appendData handles the Google Sheets logic
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error saving data:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
