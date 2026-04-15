import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ error: 'Data is required' });
  }

  try {
    const qrImage = await QRCode.toBuffer(data, {
      scale: 20,
      errorCorrectionLevel: 'H'
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(qrImage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR' });
  }
}
