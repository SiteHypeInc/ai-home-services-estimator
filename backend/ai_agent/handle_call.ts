import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

const vapiApiKey = secret("VapiApiKey");

export interface HandleCallRequest {
  phoneNumber: string;
  customerName?: string;
}

export interface HandleCallResponse {
  callId: string;
  status: string;
}

export const initiateCall = api(
  { method: "POST", path: "/ai-agent/initiate-call", expose: true },
  async (req: HandleCallRequest): Promise<HandleCallResponse> => {
    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${vapiApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: req.phoneNumber,
        assistant: {
          model: {
            provider: "openai",
            model: "gpt-4",
            temperature: 0.7,
          },
          voice: {
            provider: "11labs",
            voiceId: "21m00Tcm4TlvDq8ikWAM",
          },
          name: "Contractor Support Assistant",
          firstMessage: `Hello${req.customerName ? ` ${req.customerName}` : ''}! I'm calling from your local contractor service. How can I help you today?`,
          context: `You are a helpful AI assistant for a contractor estimation service. You can:
- Answer questions about our services (plumbing, electrical, HVAC, roofing, flooring, painting, landscaping)
- Explain our pricing process
- Help customers understand what information they need for an estimate
- Schedule follow-up calls or requests for estimates
- Answer common FAQs about our services

Be professional, friendly, and helpful. If asked about specific pricing, explain that pricing depends on project details, location, and specific requirements. Encourage customers to submit a request through our website for an accurate estimate.`,
          recordingEnabled: true,
          endCallMessage: "Thank you for calling! We look forward to working with you.",
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to initiate call: ${error}`);
    }

    const data = await response.json() as { id: string; status: string };

    return {
      callId: data.id,
      status: data.status,
    };
  }
);

export interface IncomingCallWebhookRequest {
  event: string;
  call: {
    id: string;
    phoneNumber: string;
    status: string;
    transcript?: string;
    summary?: string;
  };
}

export interface IncomingCallWebhookResponse {
  received: boolean;
}

export const webhook = api(
  { 
    method: "POST", 
    path: "/ai-agent/webhook", 
    expose: true,
  },
  async (req: IncomingCallWebhookRequest): Promise<IncomingCallWebhookResponse> => {
    console.log("Received Vapi webhook:", req);
    
    if (req.event === "call-ended" && req.call.transcript) {
      console.log(`Call ${req.call.id} transcript:`, req.call.transcript);
      console.log(`Call ${req.call.id} summary:`, req.call.summary);
    }
    
    return { received: true };
  }
);
