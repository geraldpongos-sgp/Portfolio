import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #2a231a; border-radius: 12px; background: #14100c; color: #f5efe4;">
          <h2 style="margin: 0 0 16px; font-size: 18px;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a89a83; width: 80px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #a89a83;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #e8b654;">${email}</a></td></tr>
            ${subject ? `<tr><td style="padding: 8px 0; color: #a89a83;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #2a231a; margin: 16px 0;" />
          <p style="white-space: pre-wrap; color: #d8cbb2; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
