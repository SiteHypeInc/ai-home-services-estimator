import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import db from "../db";

const pdfCoApiKey = secret("PdfCoApiKey");

export interface GenerateEstimatePDFRequest {
  estimateId: number;
}

export interface GenerateEstimatePDFResponse {
  pdfUrl: string;
}

export const generateEstimate = api(
  { method: "POST", path: "/pdf/generate-estimate", expose: true },
  async (req: GenerateEstimatePDFRequest): Promise<GenerateEstimatePDFResponse> => {
    const estimate = await db.queryRow<{
      id: number;
      customerName: string;
      customerEmail: string;
      customerPhone: string | null;
      customerAddress: string | null;
      zipCode: string;
      subtotal: number;
      taxAmount: number;
      totalCost: number;
      createdAt: Date;
      tradeName: string;
    }>`
      SELECT 
        e.id, e.customer_name as "customerName", e.customer_email as "customerEmail",
        e.customer_phone as "customerPhone", e.customer_address as "customerAddress",
        e.zip_code as "zipCode", e.subtotal, e.tax_amount as "taxAmount", 
        e.total_cost as "totalCost", e.created_at as "createdAt",
        t.name as "tradeName"
      FROM estimates e
      JOIN trades t ON e.trade_id = t.id
      WHERE e.id = ${req.estimateId}
    `;

    if (!estimate) {
      throw new Error("Estimate not found");
    }

    const itemsGen = db.query<{
      itemCode: string;
      itemName: string;
      quantity: number;
      unit: string;
      laborCost: number;
      materialCost: number;
      totalCost: number;
    }>`
      SELECT 
        item_code as "itemCode", item_name as "itemName", quantity, unit,
        labor_cost as "laborCost", material_cost as "materialCost", total_cost as "totalCost"
      FROM estimate_items
      WHERE estimate_id = ${req.estimateId}
    `;
    const items = [];
    for await (const row of itemsGen) {
      items.push(row);
    }

    const htmlContent = generateEstimatePDFHTML(estimate, items);

    const response = await fetch("https://api.pdf.co/v1/pdf/convert/from/html", {
      method: "POST",
      headers: {
        "x-api-key": pdfCoApiKey(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: htmlContent,
        name: `estimate-${req.estimateId}.pdf`,
        async: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to generate PDF: ${error}`);
    }

    const data = await response.json() as { url: string };

    return {
      pdfUrl: data.url,
    };
  }
);

function generateEstimatePDFHTML(
  estimate: any,
  items: any[]
): string {
  const itemsHTML = items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${item.itemName}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">${item.unit}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">$${item.laborCost.toFixed(2)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">$${item.materialCost.toFixed(2)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right; font-weight: 600;">$${item.totalCost.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #2563eb;
    }
    .company-info {
      flex: 1;
    }
    .company-name {
      font-size: 28px;
      font-weight: 700;
      color: #2563eb;
      margin: 0 0 10px 0;
    }
    .estimate-info {
      text-align: right;
    }
    .estimate-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 10px 0;
      color: #1e293b;
    }
    .customer-section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #64748b;
      margin: 0 0 15px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 30px 0;
    }
    th {
      background-color: #f1f5f9;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 2px solid #cbd5e1;
    }
    .totals-section {
      margin: 30px 0;
      display: flex;
      justify-content: flex-end;
    }
    .totals-table {
      width: 300px;
    }
    .totals-table tr {
      border: none;
    }
    .totals-table td {
      padding: 10px;
      border: none;
    }
    .total-row {
      background-color: #eff6ff;
      font-size: 18px;
      font-weight: 700;
      color: #2563eb;
    }
    .terms-section {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #e5e5e5;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-info">
      <h1 class="company-name">Your Company Name</h1>
      <p style="margin: 5px 0; color: #64748b;">123 Business Street<br>City, State 12345<br>Phone: (555) 123-4567<br>Email: info@yourcompany.com</p>
    </div>
    <div class="estimate-info">
      <h2 class="estimate-title">ESTIMATE</h2>
      <p style="margin: 5px 0;"><strong>Estimate #:</strong> ${estimate.id}</p>
      <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(estimate.createdAt).toLocaleDateString()}</p>
      <p style="margin: 5px 0;"><strong>Valid Until:</strong> ${new Date(new Date(estimate.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
    </div>
  </div>

  <div class="customer-section">
    <h3 class="section-title">Customer Information</h3>
    <p style="margin: 5px 0;"><strong>Name:</strong> ${estimate.customerName}</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> ${estimate.customerEmail}</p>
    ${estimate.customerPhone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${estimate.customerPhone}</p>` : ''}
    ${estimate.customerAddress ? `<p style="margin: 5px 0;"><strong>Address:</strong> ${estimate.customerAddress}</p>` : ''}
    <p style="margin: 5px 0;"><strong>Zip Code:</strong> ${estimate.zipCode}</p>
  </div>

  <div style="margin: 30px 0;">
    <h3 class="section-title">Project Details</h3>
    <p style="margin: 5px 0;"><strong>Service Type:</strong> ${estimate.tradeName}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Item Description</th>
        <th style="text-align: center;">Quantity</th>
        <th style="text-align: center;">Unit</th>
        <th style="text-align: right;">Labor</th>
        <th style="text-align: right;">Materials</th>
        <th style="text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHTML}
    </tbody>
  </table>

  <div class="totals-section">
    <table class="totals-table">
      <tr>
        <td><strong>Subtotal:</strong></td>
        <td style="text-align: right;">$${estimate.subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td><strong>Tax (8%):</strong></td>
        <td style="text-align: right;">$${estimate.taxAmount.toFixed(2)}</td>
      </tr>
      <tr class="total-row">
        <td><strong>TOTAL:</strong></td>
        <td style="text-align: right;">$${estimate.totalCost.toFixed(2)}</td>
      </tr>
    </table>
  </div>

  <div class="terms-section">
    <h3 class="section-title">Terms & Conditions</h3>
    <ul style="color: #64748b; font-size: 14px; line-height: 1.8;">
      <li>This estimate is valid for 30 days from the date of issue.</li>
      <li>A 50% deposit is required to schedule work.</li>
      <li>Final payment is due upon completion of work.</li>
      <li>Prices are subject to change if project scope changes.</li>
      <li>All work is guaranteed for 1 year from completion date.</li>
      <li>Payment accepted via check, credit card, or electronic transfer.</li>
    </ul>
  </div>

  <div class="terms-section">
    <h3 class="section-title">Acceptance</h3>
    <p style="color: #64748b; font-size: 14px;">By accepting this estimate, you agree to the terms and conditions outlined above.</p>
    <div style="margin-top: 30px;">
      <p style="margin: 5px 0;"><strong>Customer Signature:</strong> _______________________________</p>
      <p style="margin: 5px 0;"><strong>Date:</strong> _______________________________</p>
    </div>
  </div>

  <div class="footer">
    <p>Thank you for your business!</p>
    <p>For questions about this estimate, please contact us at info@yourcompany.com</p>
  </div>
</body>
</html>
  `.trim();
}
