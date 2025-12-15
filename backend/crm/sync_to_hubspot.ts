import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import db from "../db";

const hubspotApiKey = secret("HubspotApiKey");

export interface SyncLeadToHubSpotRequest {
  leadId: number;
}

export interface SyncLeadToHubSpotResponse {
  hubspotContactId: string;
  hubspotDealId: string;
  success: boolean;
}

export const syncToHubspot = api(
  { method: "POST", path: "/crm/sync-to-hubspot", expose: true },
  async (req: SyncLeadToHubSpotRequest): Promise<SyncLeadToHubSpotResponse> => {
    const lead = await db.queryRow<{
      id: number;
      estimateId: number;
      contractorId: number;
      status: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string | null;
      customerAddress: string | null;
      zipCode: string;
      totalCost: number;
      tradeName: string;
    }>`
      SELECT 
        l.id, l.estimate_id as "estimateId", l.contractor_id as "contractorId",
        l.status, e.customer_name as "customerName", e.customer_email as "customerEmail",
        e.customer_phone as "customerPhone", e.customer_address as "customerAddress",
        e.zip_code as "zipCode", e.total_cost as "totalCost", t.name as "tradeName"
      FROM leads l
      JOIN estimates e ON l.estimate_id = e.id
      JOIN trades t ON e.trade_id = t.id
      WHERE l.id = ${req.leadId}
    `;

    if (!lead) {
      throw new Error("Lead not found");
    }

    const contactResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hubspotApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          email: lead.customerEmail,
          firstname: lead.customerName.split(' ')[0],
          lastname: lead.customerName.split(' ').slice(1).join(' ') || '',
          phone: lead.customerPhone || '',
          address: lead.customerAddress || '',
          zip: lead.zipCode,
          lifecyclestage: getHubspotLifecycleStage(lead.status),
        },
      }),
    });

    if (!contactResponse.ok) {
      const error = await contactResponse.text();
      throw new Error(`Failed to create HubSpot contact: ${error}`);
    }

    const contact = await contactResponse.json() as { id: string };

    const dealResponse = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hubspotApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          dealname: `${lead.tradeName} - ${lead.customerName}`,
          amount: lead.totalCost,
          dealstage: getHubspotDealStage(lead.status),
          pipeline: "default",
          closedate: lead.status === 'won' ? new Date().toISOString() : undefined,
        },
        associations: [
          {
            to: { id: contact.id },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 3,
              },
            ],
          },
        ],
      }),
    });

    if (!dealResponse.ok) {
      const error = await dealResponse.text();
      throw new Error(`Failed to create HubSpot deal: ${error}`);
    }

    const deal = await dealResponse.json() as { id: string };

    await db.exec`
      UPDATE leads
      SET 
        hubspot_contact_id = ${contact.id},
        hubspot_deal_id = ${deal.id}
      WHERE id = ${req.leadId}
    `;

    return {
      hubspotContactId: contact.id,
      hubspotDealId: deal.id,
      success: true,
    };
  }
);

function getHubspotLifecycleStage(status: string): string {
  const stageMap: Record<string, string> = {
    'new': 'lead',
    'contacted': 'lead',
    'qualified': 'marketingqualifiedlead',
    'proposal_sent': 'opportun ity',
    'won': 'customer',
    'lost': 'other',
  };
  return stageMap[status] || 'lead';
}

function getHubspotDealStage(status: string): string {
  const stageMap: Record<string, string> = {
    'new': 'appointmentscheduled',
    'contacted': 'qualifiedtobuy',
    'qualified': 'presentationscheduled',
    'proposal_sent': 'decisionmakerboughtin',
    'won': 'closedwon',
    'lost': 'closedlost',
  };
  return stageMap[status] || 'appointmentscheduled';
}

export interface UpdateHubSpotLeadRequest {
  leadId: number;
}

export interface UpdateHubSpotLeadResponse {
  success: boolean;
}

export const updateHubspot = api(
  { method: "POST", path: "/crm/update-hubspot", expose: true },
  async (req: UpdateHubSpotLeadRequest): Promise<UpdateHubSpotLeadResponse> => {
    const lead = await db.queryRow<{
      id: number;
      status: string;
      hubspotContactId: string | null;
      hubspotDealId: string | null;
    }>`
      SELECT id, status, hubspot_contact_id as "hubspotContactId", hubspot_deal_id as "hubspotDealId"
      FROM leads
      WHERE id = ${req.leadId}
    `;

    if (!lead) {
      throw new Error("Lead not found");
    }

    if (!lead.hubspotContactId || !lead.hubspotDealId) {
      return await syncToHubspot({ leadId: req.leadId });
    }

    const dealResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/deals/${lead.hubspotDealId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${hubspotApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          dealstage: getHubspotDealStage(lead.status),
          closedate: lead.status === 'won' ? new Date().toISOString() : undefined,
        },
      }),
    });

    if (!dealResponse.ok) {
      const error = await dealResponse.text();
      throw new Error(`Failed to update HubSpot deal: ${error}`);
    }

    const contactResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${lead.hubspotContactId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${hubspotApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          lifecyclestage: getHubspotLifecycleStage(lead.status),
        },
      }),
    });

    if (!contactResponse.ok) {
      const error = await contactResponse.text();
      throw new Error(`Failed to update HubSpot contact: ${error}`);
    }

    return { success: true };
  }
);
