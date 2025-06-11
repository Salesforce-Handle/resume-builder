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



app.use(express.json({ limit: '10mb' })); // in case HTML is large


app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    //const pdfBuffer = await page.pdf({ format: 'A4' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '25mm', // make room for footer
        left: '10mm',
        right: '10mm',
      },
      footerTemplate: `
        <div style="width: 100%; font-size: 10px; text-align: center; color: #666">
        <div class="page-footer">
        © 2025 Resume Handle | www.salesforcehandle.com </div> 
        </div>
      `,
      headerTemplate: '<div></div>', // Optional, can be empty if you don’t need a header
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

// In server new 
console.log("server.js updated");
