import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { Header } from "encore.dev/api";
import db from "../db";

const stripeWebhookSecret = secret("StripeWebhookSecret");

export interface StripeWebhookRequest {
  type: string;
  data: {
    object: {
      id: string;
      metadata?: {
        estimate_id?: string;
      };
      payment_status?: string;
      status?: string;
    };
  };
}

export interface StripeWebhookResponse {
  received: boolean;
}

export const webhook = api(
  { 
    method: "POST", 
    path: "/payment/webhook", 
    expose: true,
  },
  async (req: StripeWebhookRequest): Promise<StripeWebhookResponse> => {
    if (req.type === "checkout.session.completed") {
      const estimateId = req.data.object.metadata?.estimate_id;
      
      if (estimateId) {
        await db.exec`
          UPDATE estimates 
          SET status = 'paid', paid_at = NOW()
          WHERE id = ${parseInt(estimateId)}
        `;
        
        await db.exec`
          UPDATE leads 
          SET status = 'won'
          WHERE estimate_id = ${parseInt(estimateId)}
        `;
      }
    }
    
    if (req.type === "payment_link.updated") {
      const estimateId = req.data.object.metadata?.estimate_id;
      
      if (estimateId && req.data.object.payment_status === "paid") {
        await db.exec`
          UPDATE estimates 
          SET status = 'paid', paid_at = NOW()
          WHERE id = ${parseInt(estimateId)}
        `;
        
        await db.exec`
          UPDATE leads 
          SET status = 'won'
          WHERE estimate_id = ${parseInt(estimateId)}
        `;
      }
    }
    
    return { received: true };
  }
);
