import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import db from "../db";

const stripeSecretKey = secret("StripeSecretKey");

export interface CreatePaymentLinkRequest {
  estimateId: number;
}

export interface CreatePaymentLinkResponse {
  paymentUrl: string;
  paymentLinkId: string;
}

export const createPaymentLink = api(
  { method: "POST", path: "/payment/create-link", expose: true },
  async (req: CreatePaymentLinkRequest): Promise<CreatePaymentLinkResponse> => {
    const estimate = await db.queryRow<{
      id: number;
      totalCost: number;
      customerName: string;
      customerEmail: string;
      tradeName: string;
    }>`
      SELECT 
        e.id, e.total_cost as "totalCost", e.customer_name as "customerName",
        e.customer_email as "customerEmail", t.name as "tradeName"
      FROM estimates e
      JOIN trades t ON e.trade_id = t.id
      WHERE e.id = ${req.estimateId}
    `;

    if (!estimate) {
      throw new Error("Estimate not found");
    }

    const priceResponse = await fetch("https://api.stripe.com/v1/prices", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey()}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "currency": "usd",
        "unit_amount": Math.round(estimate.totalCost * 100).toString(),
        "product_data[name]": `${estimate.tradeName} Service - Estimate #${estimate.id}`,
        "product_data[description]": `Estimate for ${estimate.customerName}`,
      }),
    });

    if (!priceResponse.ok) {
      const error = await priceResponse.text();
      throw new Error(`Failed to create Stripe price: ${error}`);
    }

    const price = await priceResponse.json() as { id: string };

    const linkResponse = await fetch("https://api.stripe.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey()}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "line_items[0][price]": price.id,
        "line_items[0][quantity]": "1",
        "metadata[estimate_id]": estimate.id.toString(),
        "metadata[customer_email]": estimate.customerEmail,
        "after_completion[type]": "hosted_confirmation",
        "after_completion[hosted_confirmation][custom_message]": "Thank you for your payment! We'll be in touch shortly to schedule your service.",
      }),
    });

    if (!linkResponse.ok) {
      const error = await linkResponse.text();
      throw new Error(`Failed to create Stripe payment link: ${error}`);
    }

    const link = await linkResponse.json() as { id: string; url: string };

    await db.exec`
      UPDATE estimates 
      SET stripe_payment_link_id = ${link.id}
      WHERE id = ${req.estimateId}
    `;

    return {
      paymentUrl: link.url,
      paymentLinkId: link.id,
    };
  }
);
