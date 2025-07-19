const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET'],
  credentials: true,
}));

app.get('/api/scrape', async (req, res) => {
    console.log('✅ Received request to /api/scrape with query:', req.query);
  const { imo } = req.query;

  if (!imo) {
    console.error('[ERROR] Missing IMO');
    return res.status(400).json({ error: 'Missing IMO number' });
  }

  const scrapeURL = `http://api.scrapestack.com/scrape?access_key=892e1813776e7df4190c1772dc87af08&url=https%3A//www.vesselfinder.com/vessels/details/${imo}`;
  console.log('[INFO] Fetching from Scrapestack:', scrapeURL);

  try {
    const response = await axios.get(scrapeURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    console.log('[INFO] Scrape Success. Sending response...');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(response.data);

  } catch (error) {
    console.error('[ERROR] Scrapestack failed:', error.response?.status || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to scrape' });
  }
});

app.listen(3001, () => {
  console.log(`✅ Proxy running at http://localhost:3001`);
});

process.on('uncaughtException', err => {
  console.error('[CRITICAL] Uncaught Exception:', err);
});
