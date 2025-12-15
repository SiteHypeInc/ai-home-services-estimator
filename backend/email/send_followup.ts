import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";

const resendApiKey = secret("ResendApiKey");

export interface SendFollowupEmailRequest {
  to: string;
  customerName: string;
  estimateId: number;
  totalCost: number;
  tradeName: string;
  daysSinceEstimate: number;
}

export interface SendFollowupEmailResponse {
  emailId: string;
  success: boolean;
}

export const sendFollowup = api(
  { method: "POST", path: "/email/send-followup", expose: true },
  async (req: SendFollowupEmailRequest): Promise<SendFollowupEmailResponse> => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "team@yourdomain.com",
        to: req.to,
        subject: getFollowupSubject(req.daysSinceEstimate, req.tradeName),
        html: generateFollowupEmailHTML(req),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw APIError.aborted(`Failed to send follow-up email: ${error}`);
    }

    const data = await response.json() as { id: string };

    return {
      emailId: data.id,
      success: true,
    };
  }
);

function getFollowupSubject(daysSince: number, tradeName: string): string {
  if (daysSince <= 2) {
    return `Following up on your ${tradeName} estimate`;
  } else if (daysSince <= 7) {
    return `Still interested in your ${tradeName} project?`;
  } else {
    return `Your ${tradeName} estimate expires soon`;
  }
}

function generateFollowupEmailHTML(req: SendFollowupEmailRequest): string {
  const isUrgent = req.daysSinceEstimate >= 20;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Follow-up on Your Estimate</title>
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
    }
    .header h1 {
      color: #2563eb;
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    .highlight-box {
      background-color: ${isUrgent ? '#fef2f2' : '#f8fafc'};
      border-left: 4px solid ${isUrgent ? '#ef4444' : '#2563eb'};
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
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
      margin: 20px 0;
      width: 100%;
      box-sizing: border-box;
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
      <h1>Following Up on Your ${req.tradeName} Estimate</h1>
    </div>
    
    <p>Hi ${req.customerName},</p>
    
    <p>We wanted to follow up on the estimate we sent you ${req.daysSinceEstimate} ${req.daysSinceEstimate === 1 ? 'day' : 'days'} ago for your ${req.tradeName} project.</p>
    
    <div class="highlight-box">
      <p style="margin: 0; font-weight: 600;">Estimate #${req.estimateId}</p>
      <p style="margin: 10px 0 0 0; font-size: 20px; color: #2563eb; font-weight: 700;">
        $${req.totalCost.toFixed(2)}
      </p>
      ${isUrgent ? '<p style="margin: 10px 0 0 0; color: #ef4444; font-weight: 600;">⚠️ This estimate expires in ' + (30 - req.daysSinceEstimate) + ' days</p>' : ''}
    </div>
    
    ${req.daysSinceEstimate <= 2 ? `
      <p>We understand that deciding on a contractor is an important decision. Do you have any questions about the estimate or the work involved?</p>
      <p>Our team is here to help and would be happy to discuss any concerns or modifications you might need.</p>
    ` : req.daysSinceEstimate <= 7 ? `
      <p>We'd love to help you move forward with your project! If you have any questions or concerns about the estimate, please let us know.</p>
      <p>We can also schedule a call to discuss the project in more detail and address any questions you might have.</p>
    ` : `
      <p>This is a friendly reminder that your estimate will expire soon. We'd hate for you to miss out on this pricing!</p>
      <p>If you're still interested in moving forward, please reach out as soon as possible. We're ready to get started on your project.</p>
    `}
    
    <div style="text-align: center;">
      <a href="mailto:reply@yourdomain.com?subject=Re: Estimate ${req.estimateId}" class="cta-button">
        Reply to This Estimate
      </a>
    </div>
    
    <p>Looking forward to hearing from you!</p>
    
    <p style="margin-top: 30px;">
      Best regards,<br>
      <strong>Your Contractor Team</strong>
    </p>
    
    <div class="footer">
      <p>If you're no longer interested, simply ignore this email.</p>
      <p>You can unsubscribe from future follow-ups at any time.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
