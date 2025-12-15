import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Contractor } from "./create";

export interface GetContractorRequest {
  id: number;
}

// Retrieves contractor details.
export const get = api<GetContractorRequest, Contractor>(
  { expose: true, method: "GET", path: "/contractors/:id" },
  async (req) => {
    const row = await db.queryRow<Contractor>`
      SELECT id, name, email, company_name as "companyName", phone, created_at as "createdAt"
      FROM contractors
      WHERE id = ${req.id}
    `;
    
    if (!row) {
      throw APIError.notFound("contractor not found");
    }
    
    return row;
  }
);
