import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 9555;

app.use(express.json());

const MCP_SCHEMA = './schema.json';

// GET /schema.json → MCP service discovery
app.get('/schema.json', (req, res) => {
  res.sendFile(MCP_SCHEMA, { root: process.cwd() });
});


app.post('/screenshot', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing "url" in body' });

  try {
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    await page.goto(url);

    const buffer = await page.screenshot({ fullPage: true });

    await browser.close();

    // ✅ Envoyer le bon header AVANT de renvoyer le buffer
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length
    });
    res.end(buffer);

  } catch (err) {
    console.error('❌ Screenshot error:', err);
    res.status(500).json({ error: 'Failed to capture screenshot' });
  }
});

app.listen(port, () => {
  console.log(`🚀 MCP Puppeteer server listening on http://localhost:${port}`);
});
