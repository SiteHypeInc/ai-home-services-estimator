-- Add more trades to reach 14 total
INSERT INTO trades (name, description) VALUES
  ('carpentry', 'Custom carpentry, framing, and finish work'),
  ('drywall', 'Drywall installation, taping, and finishing'),
  ('concrete', 'Concrete pouring, stamping, and finishing'),
  ('fencing', 'Fence installation and repair'),
  ('gutters', 'Gutter installation and cleaning'),
  ('masonry', 'Brick, stone, and block work'),
  ('siding', 'Exterior siding installation and repair');

-- Carpentry fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (8, 'service_type', 'Service Type', 'select', TRUE, 1),
  (8, 'project_scope', 'Project Scope', 'text', TRUE, 2),
  (8, 'linear_feet', 'Approximate Linear Feet', 'number', FALSE, 3),
  (8, 'material_preference', 'Material Preference', 'select', FALSE, 4);

UPDATE trade_fields SET field_options = ARRAY['new_construction', 'remodel', 'repair', 'custom_built_in']
WHERE trade_id = 8 AND field_name = 'service_type';

UPDATE trade_fields SET field_options = ARRAY['hardwood', 'pine', 'oak', 'maple', 'composite']
WHERE trade_id = 8 AND field_name = 'material_preference';

-- Drywall fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (9, 'service_type', 'Service Type', 'select', TRUE, 1),
  (9, 'square_footage', 'Square Footage', 'number', TRUE, 2),
  (9, 'ceiling_height', 'Ceiling Height', 'select', FALSE, 3),
  (9, 'finish_level', 'Finish Level', 'select', TRUE, 4);

UPDATE trade_fields SET field_options = ARRAY['new_installation', 'repair', 'replacement', 'texturing']
WHERE trade_id = 9 AND field_name = 'service_type';

UPDATE trade_fields SET field_options = ARRAY['8_ft', '9_ft', '10_ft', '12_ft_plus']
WHERE trade_id = 9 AND field_name = 'ceiling_height';

UPDATE trade_fields SET field_options = ARRAY['level_1', 'level_2', 'level_3', 'level_4', 'level_5']
WHERE trade_id = 9 AND field_name = 'finish_level';

-- Concrete fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (10, 'project_type', 'Project Type', 'select', TRUE, 1),
  (10, 'square_footage', 'Square Footage', 'number', TRUE, 2),
  (10, 'thickness', 'Thickness (inches)', 'select', TRUE, 3),
  (10, 'finish_type', 'Finish Type', 'select', FALSE, 4);

UPDATE trade_fields SET field_options = ARRAY['driveway', 'patio', 'walkway', 'foundation', 'slab']
WHERE trade_id = 10 AND field_name = 'project_type';

UPDATE trade_fields SET field_options = ARRAY['4_inch', '6_inch', '8_inch', '10_inch']
WHERE trade_id = 10 AND field_name = 'thickness';

UPDATE trade_fields SET field_options = ARRAY['broom', 'smooth', 'stamped', 'exposed_aggregate', 'polished']
WHERE trade_id = 10 AND field_name = 'finish_type';

-- Fencing fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (11, 'fence_type', 'Fence Type', 'select', TRUE, 1),
  (11, 'linear_feet', 'Linear Feet', 'number', TRUE, 2),
  (11, 'height', 'Height', 'select', TRUE, 3),
  (11, 'gate_needed', 'Gate Needed', 'select', FALSE, 4);

UPDATE trade_fields SET field_options = ARRAY['wood', 'vinyl', 'chain_link', 'wrought_iron', 'composite']
WHERE trade_id = 11 AND field_name = 'fence_type';

UPDATE trade_fields SET field_options = ARRAY['4_ft', '6_ft', '8_ft', 'custom']
WHERE trade_id = 11 AND field_name = 'height';

UPDATE trade_fields SET field_options = ARRAY['no', 'single_gate', 'double_gate']
WHERE trade_id = 11 AND field_name = 'gate_needed';

-- Gutters fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (12, 'service_type', 'Service Type', 'select', TRUE, 1),
  (12, 'linear_feet', 'Linear Feet', 'number', TRUE, 2),
  (12, 'gutter_type', 'Gutter Type', 'select', FALSE, 3),
  (12, 'downspouts_needed', 'Number of Downspouts', 'number', FALSE, 4);

UPDATE trade_fields SET field_options = ARRAY['new_installation', 'replacement', 'cleaning', 'repair']
WHERE trade_id = 12 AND field_name = 'service_type';

UPDATE trade_fields SET field_options = ARRAY['aluminum', 'copper', 'vinyl', 'steel']
WHERE trade_id = 12 AND field_name = 'gutter_type';

-- Masonry fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (13, 'project_type', 'Project Type', 'select', TRUE, 1),
  (13, 'square_footage', 'Square Footage or Linear Feet', 'number', TRUE, 2),
  (13, 'material_type', 'Material Type', 'select', TRUE, 3),
  (13, 'project_description', 'Project Description', 'text', TRUE, 4);

UPDATE trade_fields SET field_options = ARRAY['wall', 'fireplace', 'patio', 'steps', 'chimney', 'retaining_wall']
WHERE trade_id = 13 AND field_name = 'project_type';

UPDATE trade_fields SET field_options = ARRAY['brick', 'stone', 'block', 'cultured_stone']
WHERE trade_id = 13 AND field_name = 'material_type';

-- Siding fields
INSERT INTO trade_fields (trade_id, field_name, field_label, field_type, required, display_order) VALUES
  (14, 'service_type', 'Service Type', 'select', TRUE, 1),
  (14, 'square_footage', 'Square Footage', 'number', TRUE, 2),
  (14, 'siding_type', 'Siding Type', 'select', TRUE, 3),
  (14, 'stories', 'Number of Stories', 'select', FALSE, 4);

UPDATE trade_fields SET field_options = ARRAY['new_installation', 'replacement', 'repair']
WHERE trade_id = 14 AND field_name = 'service_type';

UPDATE trade_fields SET field_options = ARRAY['vinyl', 'wood', 'fiber_cement', 'metal', 'brick_veneer']
WHERE trade_id = 14 AND field_name = 'siding_type';

UPDATE trade_fields SET field_options = ARRAY['1', '2', '3_plus']
WHERE trade_id = 14 AND field_name = 'stories';

-- Add base pricing for new trades

-- Carpentry
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (8, 'CARP_FRAMING', 'Framing Labor', 65.00, 8.00, 'sqft'),
  (8, 'CARP_TRIM', 'Trim Installation', 55.00, 12.00, 'linear_ft'),
  (8, 'CARP_CABINET', 'Cabinet Installation', 85.00, 450.00, 'each'),
  (8, 'CARP_CUSTOM', 'Custom Carpentry', 75.00, 25.00, 'hour');

-- Drywall
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (9, 'DRY_HANG', 'Drywall Hanging', 1.50, 0.80, 'sqft'),
  (9, 'DRY_FINISH', 'Drywall Finishing', 2.00, 0.40, 'sqft'),
  (9, 'DRY_TEXTURE', 'Texture Application', 0.75, 0.25, 'sqft'),
  (9, 'DRY_REPAIR', 'Drywall Repair', 65.00, 15.00, 'hour');

-- Concrete
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (10, 'CONC_SLAB', 'Concrete Slab (4")', 4.50, 3.50, 'sqft'),
  (10, 'CONC_STAMP', 'Stamped Concrete', 7.00, 5.00, 'sqft'),
  (10, 'CONC_DRIVE', 'Driveway (6")', 6.00, 4.50, 'sqft'),
  (10, 'CONC_FINISH', 'Special Finish', 3.00, 1.50, 'sqft');

-- Fencing
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (11, 'FENCE_WOOD_6', '6ft Wood Fence', 18.00, 22.00, 'linear_ft'),
  (11, 'FENCE_VINYL_6', '6ft Vinyl Fence', 22.00, 28.00, 'linear_ft'),
  (11, 'FENCE_CHAIN', 'Chain Link Fence', 12.00, 10.00, 'linear_ft'),
  (11, 'FENCE_GATE', 'Gate Installation', 150.00, 250.00, 'each');

-- Gutters
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (12, 'GUTT_ALUM', 'Aluminum Gutter', 5.00, 6.00, 'linear_ft'),
  (12, 'GUTT_COPPER', 'Copper Gutter', 12.00, 18.00, 'linear_ft'),
  (12, 'GUTT_DOWN', 'Downspout', 8.00, 10.00, 'each'),
  (12, 'GUTT_CLEAN', 'Gutter Cleaning', 85.00, 0.00, 'hour');

-- Masonry
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (13, 'MASON_BRICK', 'Brick Installation', 12.00, 8.00, 'sqft'),
  (13, 'MASON_STONE', 'Stone Installation', 15.00, 18.00, 'sqft'),
  (13, 'MASON_BLOCK', 'Block Work', 8.00, 5.00, 'sqft'),
  (13, 'MASON_FIRE', 'Fireplace Construction', 2500.00, 1800.00, 'each');

-- Siding
INSERT INTO base_prices (trade_id, item_code, item_name, base_labor_rate, base_material_cost, unit) VALUES
  (14, 'SIDING_VINYL', 'Vinyl Siding', 3.50, 4.50, 'sqft'),
  (14, 'SIDING_FIBER', 'Fiber Cement Siding', 5.00, 6.50, 'sqft'),
  (14, 'SIDING_WOOD', 'Wood Siding', 6.00, 8.00, 'sqft'),
  (14, 'SIDING_METAL', 'Metal Siding', 4.50, 7.00, 'sqft');
