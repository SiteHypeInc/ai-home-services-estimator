import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";

const resendApiKey = secret("ResendApiKey");

export interface SendEstimateEmailRequest {
  to: string;
  customerName: string;
  estimateId: number;
  totalCost: number;
  tradeName: string;
  pdfUrl?: string;
  paymentUrl?: string;
}

export interface SendEstimateEmailResponse {
  emailId: string;
  success: boolean;
}

export const sendEstimate = api(
  { method: "POST", path: "/email/send-estimate", expose: true },
  async (req: SendEstimateEmailRequest): Promise<SendEstimateEmailResponse> => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "estimates@yourdomain.com",
        to: req.to,
        subject: `Your ${req.tradeName} Estimate - $${req.totalCost.toFixed(2)}`,
        html: generateEstimateEmailHTML(req),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw APIError.aborted(`Failed to send email: ${error}`);
    }

    const data = await response.json() as { id: string };

    return {
      emailId: data.id,
      success: true,
    };
  }
);

function generateEstimateEmailHTML(req: SendEstimateEmailRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Estimate</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e5e5e5;
    }
    .header h1 {
      color: #2563eb;
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .estimate-details {
      background-color: #f8fafc;
      border-radius: 6px;
      padding: 20px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      color: #64748b;
    }
    .detail-value {
      color: #1e293b;
    }
    .total {
      font-size: 24px;
      font-weight: 700;
      color: #2563eb;
      text-align: center;
      margin: 30px 0;
      padding: 20px;
      background-color: #eff6ff;
      border-radius: 6px;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-weight: 600;
      text-align: center;
      margin: 10px 0;
      width: 100%;
      box-sizing: border-box;
    }
    .cta-button:hover {
      background-color: #1d4ed8;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e5e5e5;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your ${req.tradeName} Estimate</h1>
      <p style="color: #64748b; margin: 0;">Estimate #${req.estimateId}</p>
    </div>
    
    <p>Dear ${req.customerName},</p>
    
    <p>Thank you for requesting an estimate! We're pleased to provide you with the following quote for your ${req.tradeName} project:</p>
    
    <div class="total">
      Total Estimate: $${req.totalCost.toFixed(2)}
    </div>
    
    <div class="estimate-details">
      <div class="detail-row">
        <span class="detail-label">Service Type</span>
        <span class="detail-value">${req.tradeName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Estimate ID</span>
        <span class="detail-value">#${req.estimateId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Valid Until</span>
        <span class="detail-value">${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
      </div>
    </div>
    
    ${req.paymentUrl ? `
    <div style="text-align: center; margin: 30px 0;">
      <a href="${req.paymentUrl}" class="cta-button">Pay Now & Schedule Work</a>
      <p style="color: #64748b; font-size: 14px; margin-top: 10px;">
        Secure payment processing via Stripe
      </p>
    </div>
    ` : ''}
    
    ${req.pdfUrl ? `
    <div style="text-align: center; margin: 20px 0;">
      <a href="${req.pdfUrl}" class="cta-button" style="background-color: #64748b;">
        Download Full Estimate PDF
      </a>
    </div>
    ` : ''}
    
    <p>This estimate is valid for 30 days from the date of issue. If you have any questions or would like to discuss this estimate further, please don't hesitate to contact us.</p>
    
    <p>We look forward to working with you!</p>
    
    <p style="margin-top: 30px;">
      Best regards,<br>
      <strong>Your Contractor Team</strong>
    </p>
    
    <div class="footer">
      <p>This is an automated estimate. Please do not reply to this email.</p>
      <p>If you have questions, please contact us through our website or call our office.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
