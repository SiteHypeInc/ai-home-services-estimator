import { api, APIError } from "encore.dev/api";
import db from "../db";

export interface GetTradeRequest {
  id: number;
}

export interface TradeField {
  id: number;
  fieldName: string;
  fieldLabel: string;
  fieldType: string;
  fieldOptions?: string[];
  required: boolean;
  displayOrder: number;
}

export interface TradeWithFields {
  id: number;
  name: string;
  description?: string;
  fields: TradeField[];
}

// Retrieves trade details including dynamic form fields.
export const get = api<GetTradeRequest, TradeWithFields>(
  { expose: true, method: "GET", path: "/trades/:id" },
  async (req) => {
    const trade = await db.queryRow<{ id: number; name: string; description?: string }>`
      SELECT id, name, description
      FROM trades
      WHERE id = ${req.id} AND active = TRUE
    `;
    
    if (!trade) {
      throw APIError.notFound("trade not found");
    }
    
    const fields: TradeField[] = [];
    const fieldRows = db.query<TradeField>`
      SELECT 
        id, 
        field_name as "fieldName", 
        field_label as "fieldLabel",
        field_type as "fieldType",
        field_options as "fieldOptions",
        required,
        display_order as "displayOrder"
      FROM trade_fields
      WHERE trade_id = ${req.id}
      ORDER BY display_order
    `;
    
    for await (const row of fieldRows) {
      fields.push(row);
    }
    
    return {
      ...trade,
      fields,
    };
  }
);
