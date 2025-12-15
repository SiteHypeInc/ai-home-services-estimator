import { api } from "encore.dev/api";
import db from "../db";

export interface CreateContractorRequest {
  name: string;
  email: string;
  companyName: string;
  phone?: string;
}

export interface Contractor {
  id: number;
  name: string;
  email: string;
  companyName: string;
  phone?: string;
  createdAt: Date;
}

// Creates a new contractor account.
export const create = api<CreateContractorRequest, Contractor>(
  { expose: true, method: "POST", path: "/contractors" },
  async (req) => {
    const row = await db.queryRow<Contractor>`
      INSERT INTO contractors (name, email, company_name, phone)
      VALUES (${req.name}, ${req.email}, ${req.companyName}, ${req.phone || null})
      RETURNING id, name, email, company_name as "companyName", phone, created_at as "createdAt"
    `;
    
    if (!row) {
      throw new Error("Failed to create contractor");
    }
    
    return row;
  }
);
