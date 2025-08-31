import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://resume.salesforcehandle.com',
  'https://www.resume.salesforcehandle.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json({ limit: '10mb' })); // handle big HTML

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // ✅ Force desktop viewport so Tailwind lg: styles apply
    //await page.setViewport({
      //width: 1280,
      //height: 1024,
      //deviceScaleFactor: 2,
    //});

// 👇 Force desktop viewport so Tailwind lg: classes always apply
await page.setViewport({
  width: 1400,
  height: 1000,
  deviceScaleFactor: 2
});

await page.emulateMediaType('screen'); // prefer screen rules over print

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const currentYear = new Date().getFullYear();
    const pdfBuffer = await page.pdf({
      format: 'A4',
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '25mm', // space for footer
        left: '10mm',
        right: '10mm',
      },
      footerTemplate: `
        <div style="width: 100%; font-size: 10px; text-align: center; color: #666">
          <div class="page-footer">
            © ${currentYear} ImpactResume | www.salesforcehandle.com
          </div>
        </div>
      `,
      headerTemplate: '<div></div>',
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Failed to generate PDF');
  }
});

app.listen(PORT, () => {
  console.log(`PDF backend running at http://localhost:${PORT}`);
});

console.log("server.js updated with desktop viewport");
