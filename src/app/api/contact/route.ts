import { NextRequest } from 'next/server';
import { Resend } from 'resend';

/* ── Rate limiting (in-memory, per-IP, 5 requests / 10 min) ── */
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

/* ── Validation helpers ── */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[+\d\s()-]{7,20}$/.test(phone);
}

/* ── POST handler ── */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    const { name, email, phone } = body as {
      name?: string;
      email?: string;
      phone?: string;
    };

    // Validate
    if (!name || name.trim().length < 2) {
      return Response.json(
        { error: 'Name is required (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!phone || !isValidPhone(phone)) {
      return Response.json(
        { error: 'A valid phone number is required.' },
        { status: 400 }
      );
    }

    // Spam prevention — honeypot-style: reject if body has unexpected fields
    const allowedKeys = ['name', 'email', 'phone'];
    const bodyKeys = Object.keys(body);
    if (bodyKeys.some((k) => !allowedKeys.includes(k))) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY is not set');
      return Response.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const submissionTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    await resend.emails.send({
      from: 'Sri Venkateshwara Infra Tech <onboarding@resend.dev>',
      to: 'adithyavarmapenmetcha@gmail.com',
      subject: 'New Callback Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #041B2D; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            New Callback Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #0B3B5C; width: 140px;">Name:</td>
              <td style="padding: 10px;">${name.trim()}</td>
            </tr>
            <tr style="background: #f8f8f8;">
              <td style="padding: 10px; font-weight: bold; color: #0B3B5C;">Email:</td>
              <td style="padding: 10px;">${email.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #0B3B5C;">Phone Number:</td>
              <td style="padding: 10px;">${phone.trim()}</td>
            </tr>
            <tr style="background: #f8f8f8;">
              <td style="padding: 10px; font-weight: bold; color: #0B3B5C;">Submission Time:</td>
              <td style="padding: 10px;">${submissionTime}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This email was sent from the Sri Venkateshwara Infra Tech website contact form.
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return Response.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
