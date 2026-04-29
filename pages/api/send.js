import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const { name, email, subject, message } = body || {};

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "koreanmainyas@gmail.com",
      subject: subject || "New Portfolio Message",
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    if (!result || result.error) {
      return res.status(400).json({
        error: result?.error || "Email failed",
      });
    }

    return res.status(200).json({
      success: true,
      id: result.id,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}