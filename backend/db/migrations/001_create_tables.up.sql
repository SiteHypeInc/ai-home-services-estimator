-- Contractors table
CREATE TABLE contractors (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Trades table (plumbing, electrical, hvac, roofing, etc.)
CREATE TABLE trades (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Dynamic fields for each trade type
CREATE TABLE trade_fields (
  id BIGSERIAL PRIMARY KEY,
  trade_id BIGINT NOT NULL REFERENCES trades(id),
  field_name TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_type TEXT NOT NULL, -- text, number, select, multiselect
  field_options TEXT[], -- for select/multiselect
  required BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Regional pricing multipliers
CREATE TABLE pricing_regions (
  id BIGSERIAL PRIMARY KEY,
  zip_code TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  labor_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.0,
  material_multiplier DOUBLE PRECISION NOT NULL DEFAULT 1.0,
  UNIQUE(zip_code)
);

-- Base pricing for common items by trade
CREATE TABLE base_prices (
  id BIGSERIAL PRIMARY KEY,
  trade_id BIGINT NOT NULL REFERENCES trades(id),
  item_code TEXT NOT NULL,
  item_name TEXT NOT NULL,
  base_labor_rate DOUBLE PRECISION NOT NULL,
  base_material_cost DOUBLE PRECISION NOT NULL,
  unit TEXT NOT NULL,
  UNIQUE(trade_id, item_code)
);

-- Contractor custom pricing overrides
CREATE TABLE contractor_price_overrides (
  id BIGSERIAL PRIMARY KEY,
  contractor_id BIGINT NOT NULL REFERENCES contractors(id),
  item_code TEXT NOT NULL,
  custom_labor_rate DOUBLE PRECISION,
  custom_material_cost DOUBLE PRECISION,
  UNIQUE(contractor_id, item_code)
);

-- Estimates/Quotes
CREATE TABLE estimates (
  id BIGSERIAL PRIMARY KEY,
  contractor_id BIGINT NOT NULL REFERENCES contractors(id),
  trade_id BIGINT NOT NULL REFERENCES trades(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  zip_code TEXT NOT NULL,
  project_details JSONB NOT NULL,
  subtotal DOUBLE PRECISION NOT NULL,
  tax_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
  total_cost DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, sent, accepted, rejected
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Estimate line items
CREATE TABLE estimate_items (
  id BIGSERIAL PRIMARY KEY,
  estimate_id BIGINT NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  item_code TEXT NOT NULL,
  item_name TEXT NOT NULL,
  quantity DOUBLE PRECISION NOT NULL,
  unit TEXT NOT NULL,
  labor_cost DOUBLE PRECISION NOT NULL,
  material_cost DOUBLE PRECISION NOT NULL,
  total_cost DOUBLE PRECISION NOT NULL
);

-- Leads from estimates
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  estimate_id BIGINT NOT NULL REFERENCES estimates(id),
  contractor_id BIGINT NOT NULL REFERENCES contractors(id),
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, qualified, proposal_sent, won, lost
  follow_up_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed data for trades
INSERT INTO trades (name, description) VALUES
  ('plumbing', 'Plumbing installation, repair, and maintenance'),
  ('electrical', 'Electrical wiring, panel upgrades, and repairs'),
  ('hvac', 'Heating, ventilation, and air conditioning'),
  ('roofing', 'Roof installation, repair, and replacement'),
  ('flooring', 'Floor installation and refinishing'),
  ('painting', 'Interior and exterior painting'),
  ('landscaping', 'Landscape design and maintenance');

-- Seed data for plumbing fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (1, 'service_type', 'Service Type', 'select', TRUE, 1),
  (1, 'num_fixtures', 'Number of Fixtures', 'number', TRUE, 2),
  (1, 'pipe_footage', 'Approximate Pipe Footage', 'number', FALSE, 3),
  (1, 'project_description', 'Project Description', 'text', TRUE, 4);

UPDATE trade_fields SET field_options = ARRAY['new_installation', 'repair', 'replacement', 'inspection']
WHERE trade_id = 1 AND field_name = 'service_type';

-- Seed data for electrical fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (2, 'service_type', 'Service Type', 'select', TRUE, 1),
  (2, 'num_outlets', 'Number of Outlets/Switches', 'number', FALSE, 2),
  (2, 'panel_upgrade', 'Panel Upgrade Required', 'select', FALSE, 3),
  (2, 'project_description', 'Project Description', 'text', TRUE, 4);

UPDATE trade_fields SET field_options = ARRAY['new_wiring', 'repair', 'panel_upgrade', 'lighting_installation', 'inspection']
WHERE trade_id = 2 AND field_name = 'service_type';

UPDATE trade_fields SET field_options = ARRAY['none', '100_amp', '200_amp', '400_amp']
WHERE trade_id = 2 AND field_name = 'panel_upgrade';

-- Seed data for HVAC fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (3, 'service_type', 'Service Type', 'select', TRUE, 1),
  (3, 'square_footage', 'Square Footage', 'number', TRUE, 2),
  (3, 'num_units', 'Number of Units', 'number', TRUE, 3),
  (3, 'system_type', 'System Type', 'select', FALSE, 4);

UPDATE trade_fields SET field_options = ARRAY['installation', 'repair', 'maintenance', 'replacement']
WHERE trade_id = 3 AND field_name = 'service_type';

UPDATE trade_fields SET field_options = ARRAY['central_ac', 'heat_pump', 'furnace', 'ductless_mini_split']
WHERE trade_id = 3 AND field_name = 'system_type';

-- Seed base prices for plumbing
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (1, 'PLUMB_FIXTURE', 'Fixture Installation', 75.00, 150.00, 'each'),
  (1, 'PLUMB_PIPE', 'Pipe Installation', 85.00, 25.00, 'foot'),
  (1, 'PLUMB_REPAIR', 'General Repair', 95.00, 50.00, 'hour'),
  (1, 'PLUMB_DRAIN', 'Drain Cleaning', 125.00, 25.00, 'hour');

-- Seed base prices for electrical
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (2, 'ELEC_OUTLET', 'Outlet/Switch Installation', 65.00, 15.00, 'each'),
  (2, 'ELEC_PANEL_100', '100A Panel Upgrade', 500.00, 800.00, 'each'),
  (2, 'ELEC_PANEL_200', '200A Panel Upgrade', 750.00, 1200.00, 'each'),
  (2, 'ELEC_WIRING', 'Wiring Installation', 75.00, 30.00, 'foot'),
  (2, 'ELEC_REPAIR', 'General Repair', 85.00, 40.00, 'hour');

-- Seed base prices for HVAC
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (3, 'HVAC_CENTRAL_AC', 'Central AC Installation', 1500.00, 3000.00, 'each'),
  (3, 'HVAC_FURNACE', 'Furnace Installation', 1200.00, 2500.00, 'each'),
  (3, 'HVAC_HEAT_PUMP', 'Heat Pump Installation', 1800.00, 4000.00, 'each'),
  (3, 'HVAC_MAINTENANCE', 'System Maintenance', 120.00, 50.00, 'hour'),
  (3, 'HVAC_REPAIR', 'General Repair', 135.00, 100.00, 'hour');

-- Seed sample regional pricing (major metropolitan areas)
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('10001', 'NY', 'New York', 1.45, 1.15),
  ('90001', 'CA', 'Los Angeles', 1.35, 1.12),
  ('60601', 'IL', 'Chicago', 1.25, 1.08),
  ('77001', 'TX', 'Houston', 1.10, 1.05),
  ('33101', 'FL', 'Miami', 1.15, 1.07),
  ('98101', 'WA', 'Seattle', 1.30, 1.10),
  ('02101', 'MA', 'Boston', 1.40, 1.13),
  ('30301', 'GA', 'Atlanta', 1.12, 1.06),
  ('85001', 'AZ', 'Phoenix', 1.08, 1.04),
  ('19101', 'PA', 'Philadelphia', 1.20, 1.08);
