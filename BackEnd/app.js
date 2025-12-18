// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const adminRoutes = require('./Router/Admin');
// const path = require('path');
// const Order = require("../Admin/Models/Order");
// const puppeteer = require("puppeteer");
// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ THIS IS THE ONLY IMAGE CONFIG YOU NEED

// app.use(
//   "/images",
//   express.static(path.join(__dirname, "../dashboard/public/images"))
// );

// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "uploads"))
// );

// // Middleware
// app.use(morgan('tiny'));
// app.use(bodyParser.json());
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001','http://localhost:3002'],
//   credentials: true
// }));

// // JWT
// app.use((req, res, next) => {
//   const auth = req.headers.authorization;
//   if (auth && auth.startsWith("Bearer ")) {
//     try {
//       const token = auth.split(" ")[1];
//       req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
//     } catch (err) {}
//   }
//   next();
// });

// // Routes
// app.use('/api/admin', adminRoutes);

// app.get('/', (req, res) => {
//   res.json({ message: "Backend Running" });
// });

// app.get("/invoice/:orderId", async (req, res) => {
//   try {
//     const order = await Order.findOne({ customOrderId: req.params.orderId })
//       .populate("items.productId");

//     if (!order) return res.status(404).send("Order not found");

//     // HTML TEMPLATE
//     const html = `
//    <!DOCTYPE html>
// <html>
//     <head>
//         <meta charset="UTF-8">
//         <title>Invoice</title>
//     </head>
//     <body
//         style="margin:0;padding:0;background:#f4f4f4;font-family:Arial, Helvetica, sans-serif;">

//         <div
//             style="max-width:820px;margin:40px auto;background:#ffffff;padding:40px;border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,0.12);">

//             <!-- HEADER -->
//             <table width="100%" cellspacing="0" cellpadding="0"
//                 style="margin-bottom:40px;">
//                 <tr>
//                     <td style="font-size:28px;font-weight:700;color:#1a1a1a;">

//                         <img
//                             src="./original-logo.png"
//                             alt="Your Brand"
//                             style="
//                 height:100px;
//                 display:block;
//                 margin-bottom:6px;
//               " />

//                     </td>

//                     <td align="right">
//                         <div
//                             style="font-size:34px;font-weight:700;color:#c9a14a;letter-spacing:1px;">
//                             INVOICE
//                         </div>
//                         <div style="font-size:14px;color:#777;margin-top:6px;">
//                             #INV-2025-001
//                         </div>
//                     </td>
//                 </tr>
//             </table>

//             <!-- BILL TO -->
//             <table width="100%" cellspacing="0" cellpadding="0"
//                 style="margin-bottom:35px;">
//                 <tr>
//                     <td width="50%">
//                         <div
//                             style="font-size:13px;color:#999;text-transform:uppercase;letter-spacing:1px;">
//                             Billed To
//                         </div>
//                         <div
//                             style="font-size:16px;font-weight:600;color:#222;margin-top:6px;">
//                             John Doe
//                         </div>
//                         <div
//                             style="font-size:14px;color:#555;line-height:22px;margin-top:4px;">
//                             221B Baker Street<br>
//                             London, UK<br>
//                             johndoe@email.com
//                         </div>
//                     </td>

//                     <td width="50%" align="right">
//                         <table cellspacing="0" cellpadding="0">
//                             <tr>
//                                 <td
//                                     style="font-size:14px;color:#777;padding:4px 0;">Invoice
//                                     Date:</td>
//                                 <td
//                                     style="font-size:14px;font-weight:600;color:#222;padding-left:10px;">15
//                                     Dec 2025</td>
//                             </tr>
//                             <tr>
//                                 <td
//                                     style="font-size:14px;color:#777;padding:4px 0;">Due
//                                     Date:</td>
//                                 <td
//                                     style="font-size:14px;font-weight:600;color:#222;padding-left:10px;">25
//                                     Dec 2025</td>
//                             </tr>
//                             <tr>
//                                 <td
//                                     style="font-size:14px;color:#777;padding:4px 0;">Status:</td>
//                                 <td
//                                     style="font-size:14px;font-weight:600;color:#0a8f3c;padding-left:10px;">Paid</td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>

//             <!-- ITEM TABLE -->
//             <table width="100%" cellspacing="0" cellpadding="0"
//                 style="border-collapse:collapse;">
//                 <tr style="background:#111;">
//                     <th align="left"
//                         style="padding:14px;color:#ffffff;font-size:14px;font-weight:600;">
//                         Description
//                     </th>
//                     <th align="center"
//                         style="padding:14px;color:#ffffff;font-size:14px;font-weight:600;">
//                         Qty
//                     </th>
//                     <th align="right"
//                         style="padding:14px;color:#ffffff;font-size:14px;font-weight:600;">
//                         Price
//                     </th>
//                     <th align="right"
//                         style="padding:14px;color:#ffffff;font-size:14px;font-weight:600;">
//                         Total
//                     </th>
//                 </tr>

//                 <tr>
//                     <td
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;color:#333;">
//                         Premium Website Design
//                     </td>
//                     <td align="center"
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;">
//                         1
//                     </td>
//                     <td align="right"
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;">
//                         ₹50,000
//                     </td>
//                     <td align="right"
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;font-weight:600;">
//                         ₹50,000
//                     </td>
//                 </tr>

//                 <tr>
//                     <td
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;color:#333;">
//                         Branding & UI Consultation
//                     </td>
//                     <td align="center"
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;">
//                         1
//                     </td>
//                     <td align="right"
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;">
//                         ₹20,000
//                     </td>
//                     <td align="right"
//                         style="padding:14px;border-bottom:1px solid #eee;font-size:14px;font-weight:600;">
//                         ₹20,000
//                     </td>
//                 </tr>
//             </table>

//             <!-- TOTAL -->
//             <table width="100%" cellspacing="0" cellpadding="0"
//                 style="margin-top:30px;">
//                 <tr>
//                     <td width="60%"></td>
//                     <td width="40%">
//                         <table width="100%" cellspacing="0" cellpadding="0">
//                             <tr>
//                                 <td
//                                     style="padding:8px 0;font-size:14px;color:#555;">Subtotal</td>
//                                 <td align="right"
//                                     style="padding:8px 0;font-size:14px;font-weight:600;">₹70,000</td>
//                             </tr>
//                             <tr>
//                                 <td
//                                     style="padding:8px 0;font-size:14px;color:#555;">Tax
//                                     (18%)</td>
//                                 <td align="right"
//                                     style="padding:8px 0;font-size:14px;font-weight:600;">₹12,600</td>
//                             </tr>
//                             <tr>
//                                 <td
//                                     style="padding:12px 0;font-size:16px;font-weight:700;color:#000;border-top:2px solid #111;">
//                                     Total
//                                 </td>
//                                 <td align="right"
//                                     style="padding:12px 0;font-size:20px;font-weight:700;color:#c9a14a;border-top:2px solid #111;">
//                                     ₹82,600
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>

//             <!-- FOOTER -->
//             <div
//                 style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center;">
//                 <div style="font-size:14px;color:#555;">
//                     Thank you for choosing <strong>Tolvv</strong>
//                 </div>
//                 <div style="font-size:13px;color:#999;margin-top:6px;">
//                     care@tolvvsingscom · +91 98242 57356
//                 </div>
//             </div>

//         </div>

//     </body>
// </html>
//     `;

//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox"]
//     });

//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: "networkidle0" });

//     const pdf = await page.pdf({ format: "A4" });
//     await browser.close();

//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename=invoice_${order.customOrderId}.pdf`
//     });

//     res.send(pdf);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to generate invoice");
//   }
// });

// mongoose.connect(process.env.MONGODB_URI).then(() => {
//   console.log("✔ MongoDB connected");
//   app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
// });


// server.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const puppeteer = require('puppeteer');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./Router/Admin'); // <-- import admin routes
const Order = require('./Models/Order');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

app.use(express.json()); // <-- parse JSON bodies

// Serve images and uploads
app.use('/images', express.static(path.join(__dirname, '../FrontEnd/public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount admin routes
app.use('/api/admin', adminRoutes); // <-- THIS fixes 404

// Invoice PDF generation route
app.get('/invoice/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ customOrderId: req.params.orderId })
      .populate('items.productId');

    if (!order) return res.status(404).send('Order not found');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Invoice - ${order.customOrderId}</title>
        </head>
        <body style="font-family:Arial,sans-serif; margin:0; padding:0; background:#f4f4f4;">
          <div style="max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:10px;">
            <h1 style="color:#c9a14a;">Invoice</h1>
            <p><strong>Order ID:</strong> ${order.customOrderId}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>

            <h3>Billed To</h3>
            <p>${order.address?.buildingName || 'Guest'}<br>
               ${order.address?.houseNumber || ''}, ${order.address?.city || ''}<br>
               ${order.address?.pincode || ''}</p>

            <h3>Items</h3>
            <table width="100%" border="1" cellspacing="0" cellpadding="6">
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              ${order.items.map(item => `
                <tr>
                  <td>${item.productId?.ProductName || 'Unknown Product'}</td>
                  <td>${item.quantity}</td>
                  <td>₹${new Intl.NumberFormat('en-IN').format(item.priceAtBuy)}</td>
                  <td>₹${new Intl.NumberFormat('en-IN').format(item.quantity * item.priceAtBuy)}</td>
                </tr>
              `).join('')}
            </table>

            <h3>Total: ₹${new Intl.NumberFormat('en-IN').format(order.totalAmount)}</h3>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({ format: 'A4', printBackground: true, timeout: 30000 });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice_${order.customOrderId}.pdf`,
      'Cache-Control': 'no-store'
    });

    res.send(pdf);
  } catch (err) {
    console.error('Invoice generation error:', err);
    res.status(500).send('Failed to generate invoice');
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✔ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('🚀 Server running'));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
