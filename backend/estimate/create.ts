import { api } from "encore.dev/api";
import db from "../db";
import * as email from "../email/send_estimate";
import * as payment from "../payment/create_payment_link";
import * as pdf from "../pdf/generate_estimate";

export interface CreateEstimateRequest {
  contractorId: number;
  tradeId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  zipCode: string;
  projectDetails: Record<string, any>;
}

export interface EstimateItem {
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  laborCost: number;
  materialCost: number;
  totalCost: number;
}

export interface Estimate {
  id: number;
  contractorId: number;
  tradeId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  zipCode: string;
  projectDetails: Record<string, any>;
  items: EstimateItem[];
  subtotal: number;
  taxAmount: number;
  totalCost: number;
  status: string;
  createdAt: Date;
}

// Creates a new estimate with automated pricing calculation.
export const create = api<CreateEstimateRequest, Estimate>(
  { expose: true, method: "POST", path: "/estimates" },
  async (req) => {
    // Get regional multipliers
    const region = await db.queryRow<{ laborMultiplier: number; materialMultiplier: number }>`
      SELECT labor_multiplier as "laborMultiplier", material_multiplier as "materialMultiplier"
      FROM pricing_regions
      WHERE zip_code = ${req.zipCode}
    `;
    
    const laborMult = region?.laborMultiplier || 1.0;
    const materialMult = region?.materialMultiplier || 1.0;
    
    // Calculate estimate items based on project details
    const items: EstimateItem[] = [];
    let subtotal = 0;
    
    // Simple estimation logic based on trade type
    if (req.tradeId === 1) { // Plumbing
      const numFixtures = req.projectDetails.num_fixtures || 1;
      const pipeFt = req.projectDetails.pipe_footage || 0;
      
      const fixturePrice = await db.queryRow<{ baseLaborRate: number; baseMaterialCost: number }>`
        SELECT base_labor_rate as "baseLaborRate", base_material_cost as "baseMaterialCost"
        FROM base_prices WHERE trade_id = 1 AND item_code = 'PLUMB_FIXTURE'
      `;
      
      if (fixturePrice && numFixtures > 0) {
        const laborCost = fixturePrice.baseLaborRate * laborMult * numFixtures;
        const materialCost = fixturePrice.baseMaterialCost * materialMult * numFixtures;
        const total = laborCost + materialCost;
        
        items.push({
          itemCode: 'PLUMB_FIXTURE',
          itemName: 'Fixture Installation',
          quantity: numFixtures,
          unit: 'each',
          laborCost,
          materialCost,
          totalCost: total,
        });
        subtotal += total;
      }
      
      if (pipeFt > 0) {
        const pipePrice = await db.queryRow<{ baseLaborRate: number; baseMaterialCost: number }>`
          SELECT base_labor_rate as "baseLaborRate", base_material_cost as "baseMaterialCost"
          FROM base_prices WHERE trade_id = 1 AND item_code = 'PLUMB_PIPE'
        `;
        
        if (pipePrice) {
          const laborCost = pipePrice.baseLaborRate * laborMult * pipeFt;
          const materialCost = pipePrice.baseMaterialCost * materialMult * pipeFt;
          const total = laborCost + materialCost;
          
          items.push({
            itemCode: 'PLUMB_PIPE',
            itemName: 'Pipe Installation',
            quantity: pipeFt,
            unit: 'foot',
            laborCost,
            materialCost,
            totalCost: total,
          });
          subtotal += total;
        }
      }
    } else if (req.tradeId === 2) { // Electrical
      const numOutlets = req.projectDetails.num_outlets || 0;
      const panelUpgrade = req.projectDetails.panel_upgrade;
      
      if (numOutlets > 0) {
        const outletPrice = await db.queryRow<{ baseLaborRate: number; baseMaterialCost: number }>`
          SELECT base_labor_rate as "baseLaborRate", base_material_cost as "baseMaterialCost"
          FROM base_prices WHERE trade_id = 2 AND item_code = 'ELEC_OUTLET'
        `;
        
        if (outletPrice) {
          const laborCost = outletPrice.baseLaborRate * laborMult * numOutlets;
          const materialCost = outletPrice.baseMaterialCost * materialMult * numOutlets;
          const total = laborCost + materialCost;
          
          items.push({
            itemCode: 'ELEC_OUTLET',
            itemName: 'Outlet/Switch Installation',
            quantity: numOutlets,
            unit: 'each',
            laborCost,
            materialCost,
            totalCost: total,
          });
          subtotal += total;
        }
      }
      
      if (panelUpgrade === '200_amp') {
        const panelPrice = await db.queryRow<{ baseLaborRate: number; baseMaterialCost: number }>`
          SELECT base_labor_rate as "baseLaborRate", base_material_cost as "baseMaterialCost"
          FROM base_prices WHERE trade_id = 2 AND item_code = 'ELEC_PANEL_200'
        `;
        
        if (panelPrice) {
          const laborCost = panelPrice.baseLaborRate * laborMult;
          const materialCost = panelPrice.baseMaterialCost * materialMult;
          const total = laborCost + materialCost;
          
          items.push({
            itemCode: 'ELEC_PANEL_200',
            itemName: '200A Panel Upgrade',
            quantity: 1,
            unit: 'each',
            laborCost,
            materialCost,
            totalCost: total,
          });
          subtotal += total;
        }
      }
    } else if (req.tradeId === 3) { // HVAC
      const numUnits = req.projectDetails.num_units || 1;
      const systemType = req.projectDetails.system_type;
      
      let itemCode = 'HVAC_CENTRAL_AC';
      if (systemType === 'heat_pump') itemCode = 'HVAC_HEAT_PUMP';
      else if (systemType === 'furnace') itemCode = 'HVAC_FURNACE';
      
      const systemPrice = await db.queryRow<{ baseLaborRate: number; baseMaterialCost: number }>`
        SELECT base_labor_rate as "baseLaborRate", base_material_cost as "baseMaterialCost"
        FROM base_prices WHERE trade_id = 3 AND item_code = ${itemCode}
      `;
      
      if (systemPrice) {
        const laborCost = systemPrice.baseLaborRate * laborMult * numUnits;
        const materialCost = systemPrice.baseMaterialCost * materialMult * numUnits;
        const total = laborCost + materialCost;
        
        items.push({
          itemCode,
          itemName: systemType === 'heat_pump' ? 'Heat Pump Installation' : 
                    systemType === 'furnace' ? 'Furnace Installation' : 'Central AC Installation',
          quantity: numUnits,
          unit: 'each',
          laborCost,
          materialCost,
          totalCost: total,
        });
        subtotal += total;
      }
    }
    
    const taxAmount = subtotal * 0.08; // 8% tax
    const totalCost = subtotal + taxAmount;
    
    // Create estimate record
    const estimate = await db.queryRow<{ id: number; createdAt: Date }>`
      INSERT INTO estimates (
        contractor_id, trade_id, customer_name, customer_email, customer_phone,
        customer_address, zip_code, project_details, subtotal, tax_amount, total_cost
      ) VALUES (
        ${req.contractorId}, ${req.tradeId}, ${req.customerName}, ${req.customerEmail}, 
        ${req.customerPhone || null}, ${req.customerAddress || null}, ${req.zipCode},
        ${JSON.stringify(req.projectDetails)}, ${subtotal}, ${taxAmount}, ${totalCost}
      )
      RETURNING id, created_at as "createdAt"
    `;
    
    if (!estimate) {
      throw new Error("Failed to create estimate");
    }
    
    // Insert estimate items
    for (const item of items) {
      await db.exec`
        INSERT INTO estimate_items (
          estimate_id, item_code, item_name, quantity, unit, 
          labor_cost, material_cost, total_cost
        ) VALUES (
          ${estimate.id}, ${item.itemCode}, ${item.itemName}, ${item.quantity}, 
          ${item.unit}, ${item.laborCost}, ${item.materialCost}, ${item.totalCost}
        )
      `;
    }
    
    // Create lead
    await db.exec`
      INSERT INTO leads (estimate_id, contractor_id, status)
      VALUES (${estimate.id}, ${req.contractorId}, 'new')
    `;
    
    const trade = await db.queryRow<{ name: string }>`
      SELECT name FROM trades WHERE id = ${req.tradeId}
    `;
    
    let pdfUrl: string | undefined;
    let paymentUrl: string | undefined;
    
    try {
      const pdfResult = await pdf.generateEstimate({ estimateId: estimate.id });
      pdfUrl = pdfResult.pdfUrl;
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
    
    try {
      const paymentResult = await payment.createPaymentLink({ estimateId: estimate.id });
      paymentUrl = paymentResult.paymentUrl;
    } catch (err) {
      console.error('Failed to create payment link:', err);
    }
    
    try {
      await email.sendEstimate({
        to: req.customerEmail,
        customerName: req.customerName,
        estimateId: estimate.id,
        totalCost,
        tradeName: trade?.name || 'Service',
        pdfUrl,
        paymentUrl,
      });
    } catch (err) {
      console.error('Failed to send estimate email:', err);
    }
    
    return {
      id: estimate.id,
      contractorId: req.contractorId,
      tradeId: req.tradeId,
      customerName: req.customerName,
      customerEmail: req.customerEmail,
      customerPhone: req.customerPhone,
      customerAddress: req.customerAddress,
      zipCode: req.zipCode,
      projectDetails: req.projectDetails,
      items,
      subtotal,
      taxAmount,
      totalCost,
      status: 'pending',
      createdAt: estimate.createdAt,
    };
  }
);
