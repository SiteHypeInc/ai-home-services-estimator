import { api } from "encore.dev/api";
import db from "../db";

export interface Trade {
  id: number;
  name: string;
  description?: string;
  active: boolean;
}

export interface ListTradesResponse {
  trades: Trade[];
}

// Retrieves all active trades.
export const list = api<void, ListTradesResponse>(
  { expose: true, method: "GET", path: "/trades" },
  async () => {
    const trades: Trade[] = [];
    const rows = db.query<Trade>`
      SELECT id, name, description, active
      FROM trades
      WHERE active = TRUE
      ORDER BY name
    `;
    
    for await (const row of rows) {
      trades.push(row);
    }
    
    return { trades };
  }
);
