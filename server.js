import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import gmailSend from 'gmail-send';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let db;
const SERVICE_ACCOUNT_FILE = './firebase-service-account.json';
const SERVICE_ACCOUNT_ENV = process.env.FIREBASE_SERVICE_ACCOUNT;

if (existsSync(SERVICE_ACCOUNT_FILE) || SERVICE_ACCOUNT_ENV) {
  try {
    let serviceAccount;
    if (existsSync(SERVICE_ACCOUNT_FILE)) {
      serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8'));
    } else {
      serviceAccount = JSON.parse(SERVICE_ACCOUNT_ENV);
    }
    initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
    console.log('Firebase Admin initialized successfully');
  } catch (err) {
    console.error('Failed to initialize Firebase Admin:', err);
  }
} else {
  console.warn('Firebase credentials not found — API will be limited');
}

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173', 'https://*.vercel.app'] }));
app.use(express.json());

app.post('/api/bookings', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not initialized' });
  
  const bookingId = randomUUID();
  const booking = {
    id: bookingId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  try {
    await db.collection('bookings').doc(bookingId).set(booking);
    res.json({ success: true, booking });
  } catch (err) {
    console.error('Error saving booking:', err.message);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

app.get('/api/bookings', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not initialized' });

  try {
    const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
    const docs = snapshot.docs.map(doc => doc.data());
    res.json(docs);
  } catch (err) {
    console.error('Error fetching bookings:', err.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.patch('/api/bookings/:id/confirm', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not initialized' });
  
  const { id } = req.params;
  try {
    await db.collection('bookings').doc(id).update({ status: 'confirmed' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error confirming booking:', err.message);
    res.status(500).json({ error: 'Failed to confirm booking' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not initialized' });

  const { id } = req.params;
  try {
    await db.collection('bookings').doc(id).delete();
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting booking:', err.message);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

app.get('/api/services', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not initialized' });

  try {
    const snapshot = await db.collection('services').get();
    const services = snapshot.docs.map(doc => doc.data());
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.post('/api/send-confirmation', async (req, res) => {
  const { GMAIL_USER, GMAIL_PASS } = process.env;

  if (!GMAIL_USER || !GMAIL_PASS) {
    return res.json({ 
      success: false, 
      reason: 'GMAIL_USER or GMAIL_PASS not configured' 
    });
  }

  const send = gmailSend({
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  });

  try {
    const { email, name, serviceTitle, servicePrice, phone, address, date, time } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing recipient email' });
    }

    const htmlContent = `
      <!DOCTYPE html><html>
      <body style="background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:0;">
        <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:40px 48px;text-align:center;">
            <h1 style="color:#fff;font-size:28px;font-weight:900;margin:0 0 8px;">✅ Booking Confirmed!</h1>
            <p style="color:rgba(255,255,255,0.8);font-size:16px;margin:0;">Your service has been successfully booked.</p>
          </div>
          <div style="padding:40px 48px;">
            <p style="color:#334155;font-size:16px;margin:0 0 8px;">Hi <strong>${name}</strong>,</p>
            <p style="color:#64748b;font-size:15px;margin:0 0 24px;">Thank you for booking with ServicePro! Here are your booking details:</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;" cellpadding="8">
                <tr><td style="color:#64748b;font-size:14px;">Service</td><td style="color:#0f172a;font-size:14px;font-weight:700;text-align:right;">${serviceTitle}</td></tr>
                ${date ? `<tr><td style="color:#64748b;font-size:14px;">Date</td><td style="color:#0f172a;font-size:14px;font-weight:700;text-align:right;">${date}</td></tr>` : ''}
                ${time ? `<tr><td style="color:#64748b;font-size:14px;">Time</td><td style="color:#0f172a;font-size:14px;font-weight:700;text-align:right;">${time}</td></tr>` : ''}
                ${address ? `<tr><td style="color:#64748b;font-size:14px;">Address</td><td style="color:#0f172a;font-size:14px;font-weight:700;text-align:right;">${address}</td></tr>` : ''}
                <tr><td style="color:#64748b;font-size:14px;">Phone</td><td style="color:#0f172a;font-size:14px;font-weight:700;text-align:right;">${phone}</td></tr>
                <tr style="border-top:2px solid #e2e8f0;"><td style="color:#0f172a;font-size:15px;font-weight:700;padding-top:12px;">Total Paid</td><td style="color:#2563eb;font-size:18px;font-weight:900;text-align:right;padding-top:12px;">$${servicePrice}</td></tr>
              </table>
            </div>
            <div style="text-align:center;"><a href="http://localhost:5173" style="background:#2563eb;color:#fff;text-decoration:none;padding:14px 36px;border-radius:100px;font-weight:700;font-size:15px;display:inline-block;">Visit ServicePro</a></div>
          </div>
          <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 48px;text-align:center;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 ServicePro. All rights reserved.</p>
          </div>
        </div>
      </body></html>
    `;

    const result = await send({
      to: email,
      subject: `✅ Booking Confirmed: ${serviceTitle}`,
      html: htmlContent,
    });
    
    res.json({ success: true, detailed: result });
  } catch (err) {
    console.error('Server Error during email sending:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', async (_req, res) => {
  const { GMAIL_USER, GMAIL_PASS } = process.env;
  const isEmailConfigured = !!(GMAIL_USER && GMAIL_PASS);
  const isDbConfigured = !!db;
  
  let bookingCount = 0;
  try {
    if (db) {
      const snapshot = await db.collection('bookings').get();
      bookingCount = snapshot.size;
    }
  } catch (err) {
    console.error('Health check DB error:', err.message);
  }

  res.json({ 
    status: 'ok', 
    emailConfigured: isEmailConfigured, 
    database: isDbConfigured ? 'Firestore' : 'Not Connected',
    bookingCount: bookingCount
  });
});

export default app;

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production' || (!process.env.VERCEL && !process.env.VERCEL_ENV)) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
