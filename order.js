const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, dress, location, website } = req.body || {};

  // Silent honeypot rejection for simple bots.
  if (website) return res.status(200).json({ ok: true });

  if (![name, email, phone, dress, location].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email) || name.length > 120 || dress.length > 3000 || location.length > 200) {
    return res.status(400).json({ error: 'Please check the submitted details.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.ORDER_TO_EMAIL || !process.env.ORDER_FROM_EMAIL) {
    return res.status(500).json({ error: 'Order email is not configured.' });
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.ORDER_FROM_EMAIL,
      to: [process.env.ORDER_TO_EMAIL],
      reply_to: email.trim(),
      subject: `House of Aura order enquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim()}\nDelivery location: ${location.trim()}\n\nRequest:\n${dress.trim()}`
    })
  });

  if (!response.ok) return res.status(502).json({ error: 'Unable to deliver order enquiry.' });
  return res.status(200).json({ ok: true });
}
