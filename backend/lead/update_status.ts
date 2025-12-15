import { api } from "encore.dev/api";
import db from "../db";
import * as crm from "../crm/sync_to_hubspot";

export interface UpdateLeadStatusRequest {
  id: number;
  status: string;
  notes?: string;
  followUpDate?: Date;
}

// Updates lead status and notes.
export const updateStatus = api<UpdateLeadStatusRequest, void>(
  { expose: true, method: "PATCH", path: "/leads/:id/status" },
  async (req) => {
    await db.exec`
      UPDATE leads
      SET 
        status = ${req.status},
        notes = COALESCE(${req.notes || null}, notes),
        follow_up_date = ${req.followUpDate || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${req.id}
    `;
    
    try {
      await crm.updateHubspot({ leadId: req.id });
    } catch (err) {
      console.error('Failed to sync lead to HubSpot:', err);
    }
  }
);
