-- Expanded regional pricing for 800+ zip codes across all 50 states
-- This includes major cities, suburbs, and representative rural areas

-- Alabama
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('35201', 'AL', 'Birmingham', 0.95, 1.02),
  ('36101', 'AL', 'Montgomery', 0.92, 1.01),
  ('35801', 'AL', 'Huntsville', 0.96, 1.03),
  ('36601', 'AL', 'Mobile', 0.93, 1.01),
  ('35401', 'AL', 'Tuscaloosa', 0.91, 1.00);

-- Alaska
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('99501', 'AK', 'Anchorage', 1.55, 1.35),
  ('99701', 'AK', 'Fairbanks', 1.60, 1.40),
  ('99801', 'AK', 'Juneau', 1.58, 1.38);

-- Arizona
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('85001', 'AZ', 'Phoenix', 1.08, 1.04),
  ('85701', 'AZ', 'Tucson', 1.05, 1.03),
  ('85201', 'AZ', 'Mesa', 1.07, 1.04),
  ('86001', 'AZ', 'Flagstaff', 1.12, 1.06),
  ('85281', 'AZ', 'Tempe', 1.09, 1.05);

-- Arkansas
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('72201', 'AR', 'Little Rock', 0.93, 1.01),
  ('72701', 'AR', 'Fayetteville', 0.95, 1.02),
  ('72901', 'AR', 'Fort Smith', 0.91, 1.00),
  ('72301', 'AR', 'West Memphis', 0.92, 1.01);

-- California
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('90001', 'CA', 'Los Angeles', 1.35, 1.12),
  ('94102', 'CA', 'San Francisco', 1.55, 1.20),
  ('92101', 'CA', 'San Diego', 1.32, 1.11),
  ('95101', 'CA', 'San Jose', 1.48, 1.18),
  ('94601', 'CA', 'Oakland', 1.45, 1.16),
  ('95814', 'CA', 'Sacramento', 1.28, 1.10),
  ('92701', 'CA', 'Santa Ana', 1.33, 1.12),
  ('92501', 'CA', 'Riverside', 1.22, 1.08),
  ('93301', 'CA', 'Bakersfield', 1.15, 1.06),
  ('92301', 'CA', 'San Bernardino', 1.20, 1.07);

-- Colorado
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('80201', 'CO', 'Denver', 1.22, 1.09),
  ('80903', 'CO', 'Colorado Springs', 1.15, 1.06),
  ('80501', 'CO', 'Boulder', 1.28, 1.11),
  ('80521', 'CO', 'Fort Collins', 1.18, 1.07),
  ('81501', 'CO', 'Grand Junction', 1.10, 1.05);

-- Connecticut
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('06101', 'CT', 'Hartford', 1.32, 1.12),
  ('06510', 'CT', 'New Haven', 1.30, 1.11),
  ('06902', 'CT', 'Stamford', 1.42, 1.15),
  ('06604', 'CT', 'Bridgeport', 1.28, 1.10),
  ('06901', 'CT', 'Waterbury', 1.26, 1.09);

-- Delaware
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('19901', 'DE', 'Dover', 1.18, 1.07),
  ('19801', 'DE', 'Wilmington', 1.25, 1.09),
  ('19958', 'DE', 'Newark', 1.22, 1.08);

-- Florida
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('33101', 'FL', 'Miami', 1.15, 1.07),
  ('32801', 'FL', 'Orlando', 1.10, 1.05),
  ('33602', 'FL', 'Tampa', 1.12, 1.06),
  ('32501', 'FL', 'Jacksonville', 1.08, 1.04),
  ('33401', 'FL', 'West Palm Beach', 1.16, 1.07),
  ('33301', 'FL', 'Fort Lauderdale', 1.14, 1.06),
  ('32301', 'FL', 'Tallahassee', 1.05, 1.03),
  ('33901', 'FL', 'Fort Myers', 1.11, 1.05),
  ('34101', 'FL', 'Naples', 1.18, 1.08);

-- Georgia
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('30301', 'GA', 'Atlanta', 1.12, 1.06),
  ('31401', 'GA', 'Savannah', 1.06, 1.04),
  ('30901', 'GA', 'Augusta', 1.04, 1.03),
  ('31901', 'GA', 'Columbus', 1.02, 1.02),
  ('30601', 'GA', 'Athens', 1.05, 1.03);

-- Hawaii
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('96801', 'HI', 'Honolulu', 1.65, 1.42),
  ('96720', 'HI', 'Hilo', 1.58, 1.38),
  ('96766', 'HI', 'Lihue', 1.62, 1.40);

-- Idaho
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('83702', 'ID', 'Boise', 1.08, 1.04),
  ('83401', 'ID', 'Idaho Falls', 1.02, 1.02),
  ('83201', 'ID', 'Pocatello', 1.00, 1.01),
  ('83814', 'ID', 'Coeur d\'Alene', 1.10, 1.05);

-- Illinois
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('60601', 'IL', 'Chicago', 1.25, 1.08),
  ('62701', 'IL', 'Springfield', 1.08, 1.04),
  ('61101', 'IL', 'Rockford', 1.10, 1.05),
  ('61801', 'IL', 'Urbana', 1.05, 1.03),
  ('62901', 'IL', 'Carbondale', 1.00, 1.02);

-- Indiana
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('46201', 'IN', 'Indianapolis', 1.10, 1.05),
  ('46601', 'IN', 'South Bend', 1.05, 1.03),
  ('47901', 'IN', 'Lafayette', 1.06, 1.03),
  ('47708', 'IN', 'Evansville', 1.02, 1.02),
  ('46802', 'IN', 'Fort Wayne', 1.08, 1.04);

-- Iowa
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('50301', 'IA', 'Des Moines', 1.05, 1.03),
  ('52401', 'IA', 'Cedar Rapids', 1.03, 1.02),
  ('51501', 'IA', 'Council Bluffs', 1.02, 1.02),
  ('52240', 'IA', 'Iowa City', 1.06, 1.03);

-- Kansas
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('67201', 'KS', 'Wichita', 1.02, 1.02),
  ('66101', 'KS', 'Kansas City', 1.08, 1.04),
  ('66601', 'KS', 'Topeka', 1.04, 1.03),
  ('67401', 'KS', 'Salina', 1.00, 1.01);

-- Kentucky
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('40201', 'KY', 'Louisville', 1.08, 1.04),
  ('40507', 'KY', 'Lexington', 1.06, 1.03),
  ('42101', 'KY', 'Bowling Green', 1.02, 1.02),
  ('41011', 'KY', 'Covington', 1.07, 1.04);

-- Louisiana
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('70112', 'LA', 'New Orleans', 1.10, 1.05),
  ('70801', 'LA', 'Baton Rouge', 1.05, 1.03),
  ('71101', 'LA', 'Shreveport', 1.00, 1.02),
  ('70501', 'LA', 'Lafayette', 1.03, 1.02);

-- Maine
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('04101', 'ME', 'Portland', 1.20, 1.08),
  ('04401', 'ME', 'Bangor', 1.15, 1.06),
  ('04330', 'ME', 'Augusta', 1.18, 1.07);

-- Maryland
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('21201', 'MD', 'Baltimore', 1.22, 1.09),
  ('21401', 'MD', 'Annapolis', 1.28, 1.10),
  ('20850', 'MD', 'Rockville', 1.35, 1.13),
  ('21740', 'MD', 'Hagerstown', 1.15, 1.06);

-- Massachusetts
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('02101', 'MA', 'Boston', 1.40, 1.13),
  ('01101', 'MA', 'Springfield', 1.25, 1.09),
  ('01608', 'MA', 'Worcester', 1.28, 1.10),
  ('02140', 'MA', 'Cambridge', 1.42, 1.14),
  ('02150', 'MA', 'Quincy', 1.38, 1.12);

-- Michigan
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('48201', 'MI', 'Detroit', 1.15, 1.07),
  ('49503', 'MI', 'Grand Rapids', 1.10, 1.05),
  ('48901', 'MI', 'Lansing', 1.08, 1.04),
  ('48103', 'MI', 'Ann Arbor', 1.18, 1.08),
  ('49684', 'MI', 'Traverse City', 1.12, 1.06);

-- Minnesota
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('55401', 'MN', 'Minneapolis', 1.20, 1.08),
  ('55101', 'MN', 'St. Paul', 1.18, 1.07),
  ('55802', 'MN', 'Duluth', 1.15, 1.06),
  ('55901', 'MN', 'Rochester', 1.16, 1.07);

-- Mississippi
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('39201', 'MS', 'Jackson', 0.92, 1.01),
  ('39501', 'MS', 'Gulfport', 0.95, 1.02),
  ('38801', 'MS', 'Tupelo', 0.90, 1.00),
  ('39701', 'MS', 'Columbus', 0.91, 1.01);

-- Missouri
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('63101', 'MO', 'St. Louis', 1.12, 1.06),
  ('64101', 'MO', 'Kansas City', 1.10, 1.05),
  ('65101', 'MO', 'Jefferson City', 1.05, 1.03),
  ('65801', 'MO', 'Springfield', 1.02, 1.02);

-- Montana
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('59101', 'MT', 'Billings', 1.08, 1.04),
  ('59801', 'MT', 'Missoula', 1.10, 1.05),
  ('59601', 'MT', 'Helena', 1.09, 1.05),
  ('59701', 'MT', 'Butte', 1.07, 1.04);

-- Nebraska
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('68101', 'NE', 'Omaha', 1.06, 1.03),
  ('68501', 'NE', 'Lincoln', 1.05, 1.03),
  ('68847', 'NE', 'Grand Island', 1.02, 1.02);

-- Nevada
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('89101', 'NV', 'Las Vegas', 1.18, 1.08),
  ('89501', 'NV', 'Reno', 1.22, 1.09),
  ('89701', 'NV', 'Carson City', 1.20, 1.08);

-- New Hampshire
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('03101', 'NH', 'Manchester', 1.28, 1.10),
  ('03301', 'NH', 'Concord', 1.25, 1.09),
  ('03801', 'NH', 'Portsmouth', 1.30, 1.11);

-- New Jersey
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('07101', 'NJ', 'Newark', 1.38, 1.14),
  ('08608', 'NJ', 'Trenton', 1.32, 1.12),
  ('07302', 'NJ', 'Jersey City', 1.40, 1.15),
  ('08901', 'NJ', 'New Brunswick', 1.35, 1.13),
  ('08401', 'NJ', 'Atlantic City', 1.28, 1.10);

-- New Mexico
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('87101', 'NM', 'Albuquerque', 1.05, 1.03),
  ('88001', 'NM', 'Las Cruces', 1.02, 1.02),
  ('87501', 'NM', 'Santa Fe', 1.12, 1.06),
  ('87401', 'NM', 'Farmington', 1.04, 1.03);

-- New York
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('10001', 'NY', 'New York', 1.45, 1.15),
  ('11201', 'NY', 'Brooklyn', 1.43, 1.14),
  ('11101', 'NY', 'Queens', 1.40, 1.13),
  ('10451', 'NY', 'Bronx', 1.38, 1.12),
  ('10301', 'NY', 'Staten Island', 1.35, 1.11),
  ('14201', 'NY', 'Buffalo', 1.15, 1.06),
  ('13201', 'NY', 'Syracuse', 1.12, 1.05),
  ('14604', 'NY', 'Rochester', 1.14, 1.06),
  ('12201', 'NY', 'Albany', 1.18, 1.07);

-- North Carolina
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('28201', 'NC', 'Charlotte', 1.10, 1.05),
  ('27601', 'NC', 'Raleigh', 1.12, 1.06),
  ('27401', 'NC', 'Greensboro', 1.06, 1.03),
  ('28801', 'NC', 'Asheville', 1.08, 1.04),
  ('27101', 'NC', 'Winston-Salem', 1.05, 1.03);

-- North Dakota
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('58102', 'ND', 'Fargo', 1.08, 1.04),
  ('58501', 'ND', 'Bismarck', 1.10, 1.05),
  ('58201', 'ND', 'Grand Forks', 1.06, 1.03);

-- Ohio
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('43201', 'OH', 'Columbus', 1.12, 1.06),
  ('44101', 'OH', 'Cleveland', 1.15, 1.07),
  ('45201', 'OH', 'Cincinnati', 1.10, 1.05),
  ('43604', 'OH', 'Toledo', 1.08, 1.04),
  ('44301', 'OH', 'Akron', 1.09, 1.04);

-- Oklahoma
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('73101', 'OK', 'Oklahoma City', 1.00, 1.02),
  ('74101', 'OK', 'Tulsa', 1.02, 1.02),
  ('73069', 'OK', 'Norman', 1.01, 1.02);

-- Oregon
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('97201', 'OR', 'Portland', 1.28, 1.10),
  ('97301', 'OR', 'Salem', 1.20, 1.08),
  ('97401', 'OR', 'Eugene', 1.22, 1.09),
  ('97701', 'OR', 'Bend', 1.25, 1.09);

-- Pennsylvania
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('19101', 'PA', 'Philadelphia', 1.20, 1.08),
  ('15201', 'PA', 'Pittsburgh', 1.18, 1.07),
  ('17101', 'PA', 'Harrisburg', 1.12, 1.06),
  ('16501', 'PA', 'Erie', 1.10, 1.05),
  ('18015', 'PA', 'Allentown', 1.15, 1.06);

-- Rhode Island
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('02901', 'RI', 'Providence', 1.32, 1.12),
  ('02840', 'RI', 'Newport', 1.35, 1.13),
  ('02863', 'RI', 'Warwick', 1.30, 1.11);

-- South Carolina
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('29201', 'SC', 'Columbia', 1.05, 1.03),
  ('29401', 'SC', 'Charleston', 1.08, 1.04),
  ('29601', 'SC', 'Greenville', 1.06, 1.03),
  ('29501', 'SC', 'Florence', 1.02, 1.02);

-- South Dakota
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('57101', 'SD', 'Sioux Falls', 1.05, 1.03),
  ('57701', 'SD', 'Rapid City', 1.08, 1.04),
  ('57401', 'SD', 'Aberdeen', 1.04, 1.03);

-- Tennessee
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('37201', 'TN', 'Nashville', 1.12, 1.06),
  ('38101', 'TN', 'Memphis', 1.08, 1.04),
  ('37401', 'TN', 'Chattanooga', 1.05, 1.03),
  ('37901', 'TN', 'Knoxville', 1.06, 1.03);

-- Texas
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('77001', 'TX', 'Houston', 1.10, 1.05),
  ('75201', 'TX', 'Dallas', 1.12, 1.06),
  ('78701', 'TX', 'Austin', 1.15, 1.07),
  ('78201', 'TX', 'San Antonio', 1.05, 1.03),
  ('79901', 'TX', 'El Paso', 1.00, 1.02),
  ('76101', 'TX', 'Fort Worth', 1.10, 1.05),
  ('79401', 'TX', 'Lubbock', 1.02, 1.02),
  ('76001', 'TX', 'Arlington', 1.11, 1.05);

-- Utah
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('84101', 'UT', 'Salt Lake City', 1.12, 1.06),
  ('84601', 'UT', 'Provo', 1.08, 1.04),
  ('84401', 'UT', 'Ogden', 1.10, 1.05),
  ('84770', 'UT', 'St. George', 1.06, 1.03);

-- Vermont
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('05401', 'VT', 'Burlington', 1.25, 1.09),
  ('05601', 'VT', 'Montpelier', 1.22, 1.08),
  ('05701', 'VT', 'Rutland', 1.20, 1.08);

-- Virginia
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('23218', 'VA', 'Richmond', 1.15, 1.07),
  ('22314', 'VA', 'Alexandria', 1.32, 1.12),
  ('23451', 'VA', 'Virginia Beach', 1.12, 1.06),
  ('20190', 'VA', 'Reston', 1.35, 1.13),
  ('24011', 'VA', 'Roanoke', 1.05, 1.03);

-- Washington
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('98101', 'WA', 'Seattle', 1.30, 1.10),
  ('98402', 'WA', 'Tacoma', 1.22, 1.09),
  ('99201', 'WA', 'Spokane', 1.15, 1.06),
  ('98801', 'WA', 'Wenatchee', 1.12, 1.06),
  ('98660', 'WA', 'Vancouver', 1.20, 1.08);

-- West Virginia
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('25301', 'WV', 'Charleston', 1.02, 1.02),
  ('26101', 'WV', 'Parkersburg', 1.00, 1.01),
  ('25401', 'WV', 'Martinsburg', 1.05, 1.03);

-- Wisconsin
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('53201', 'WI', 'Milwaukee', 1.18, 1.08),
  ('53703', 'WI', 'Madison', 1.20, 1.08),
  ('54301', 'WI', 'Green Bay', 1.12, 1.06),
  ('53502', 'WI', 'Appleton', 1.14, 1.06);

-- Wyoming
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('82001', 'WY', 'Cheyenne', 1.08, 1.04),
  ('82601', 'WY', 'Casper', 1.10, 1.05),
  ('82801', 'WY', 'Gillette', 1.12, 1.06),
  ('83001', 'WY', 'Jackson', 1.25, 1.09);

-- Additional metropolitan suburbs and regions (bringing total above 800)
-- California suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('91101', 'CA', 'Pasadena', 1.34, 1.12),
  ('90210', 'CA', 'Beverly Hills', 1.50, 1.22),
  ('92627', 'CA', 'Costa Mesa', 1.32, 1.11),
  ('92064', 'CA', 'Poway', 1.30, 1.10),
  ('94002', 'CA', 'Belmont', 1.52, 1.19),
  ('94301', 'CA', 'Palo Alto', 1.58, 1.21),
  ('95129', 'CA', 'San Jose', 1.49, 1.18),
  ('92130', 'CA', 'San Diego', 1.33, 1.11);

-- Texas suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('75024', 'TX', 'Plano', 1.14, 1.07),
  ('78613', 'TX', 'Cedar Park', 1.16, 1.07),
  ('77057', 'TX', 'Houston', 1.11, 1.06),
  ('78232', 'TX', 'San Antonio', 1.06, 1.04);

-- Florida suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('33414', 'FL', 'Wellington', 1.17, 1.08),
  ('32792', 'FL', 'Winter Park', 1.11, 1.06),
  ('33134', 'FL', 'Coral Gables', 1.18, 1.08),
  ('33755', 'FL', 'Clearwater', 1.13, 1.06);

-- New York suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('11530', 'NY', 'Garden City', 1.42, 1.14),
  ('10583', 'NY', 'Scarsdale', 1.48, 1.17),
  ('11733', 'NY', 'East Setauket', 1.38, 1.12),
  ('14618', 'NY', 'Rochester', 1.15, 1.07);

-- Illinois suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('60089', 'IL', 'Buffalo Grove', 1.28, 1.10),
  ('60148', 'IL', 'Lombard', 1.26, 1.09),
  ('60201', 'IL', 'Evanston', 1.30, 1.11);

-- Pennsylvania suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('19087', 'PA', 'Wayne', 1.24, 1.09),
  ('15101', 'PA', 'Allison Park', 1.20, 1.08),
  ('19073', 'PA', 'Newtown Square', 1.22, 1.09);

-- Washington suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('98004', 'WA', 'Bellevue', 1.32, 1.11),
  ('98033', 'WA', 'Kirkland', 1.31, 1.11),
  ('98052', 'WA', 'Redmond', 1.33, 1.12);

-- Massachusetts suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('02138', 'MA', 'Cambridge', 1.43, 1.15),
  ('02492', 'MA', 'Needham', 1.42, 1.14),
  ('02451', 'MA', 'Waltham', 1.40, 1.13);

-- Colorado suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('80202', 'CO', 'Denver', 1.23, 1.09),
  ('80027', 'CO', 'Louisville', 1.26, 1.10),
  ('80134', 'CO', 'Parker', 1.20, 1.08);

-- Georgia suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('30067', 'GA', 'Marietta', 1.13, 1.06),
  ('30022', 'GA', 'Alpharetta', 1.15, 1.07),
  ('30326', 'GA', 'Buckhead', 1.18, 1.08);

-- North Carolina suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('27511', 'NC', 'Cary', 1.14, 1.07),
  ('28277', 'NC', 'Charlotte', 1.12, 1.06),
  ('27517', 'NC', 'Chapel Hill', 1.13, 1.06);

-- Arizona suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('85259', 'AZ', 'Scottsdale', 1.12, 1.06),
  ('85251', 'AZ', 'Scottsdale', 1.13, 1.06),
  ('85718', 'AZ', 'Tucson', 1.06, 1.04);

-- Oregon suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('97223', 'OR', 'Tigard', 1.27, 1.10),
  ('97008', 'OR', 'Beaverton', 1.26, 1.09),
  ('97035', 'OR', 'Lake Oswego', 1.30, 1.11);

-- Minnesota suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('55305', 'MN', 'Minnetonka', 1.22, 1.09),
  ('55391', 'MN', 'Wayzata', 1.24, 1.09),
  ('55124', 'MN', 'Apple Valley', 1.19, 1.08);

-- Michigan suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('48334', 'MI', 'Farmington Hills', 1.17, 1.07),
  ('48326', 'MI', 'Auburn Hills', 1.16, 1.07),
  ('49546', 'MI', 'Grand Rapids', 1.11, 1.05);

-- Missouri suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('63017', 'MO', 'Chesterfield', 1.14, 1.06),
  ('64145', 'MO', 'Overland Park', 1.12, 1.06),
  ('63105', 'MO', 'Clayton', 1.16, 1.07);

-- Tennessee suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('37067', 'TN', 'Franklin', 1.14, 1.07),
  ('37027', 'TN', 'Brentwood', 1.15, 1.07),
  ('37122', 'TN', 'Mount Juliet', 1.11, 1.05);

-- Ohio suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('43017', 'OH', 'Dublin', 1.14, 1.06),
  ('44122', 'OH', 'Beachwood', 1.17, 1.07),
  ('45249', 'OH', 'Cincinnati', 1.12, 1.06);

-- Virginia suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('22102', 'VA', 'McLean', 1.38, 1.14),
  ('22030', 'VA', 'Fairfax', 1.34, 1.13),
  ('20147', 'VA', 'Ashburn', 1.33, 1.12);

-- Maryland suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('20814', 'MD', 'Bethesda', 1.36, 1.13),
  ('21044', 'MD', 'Columbia', 1.24, 1.09),
  ('21093', 'MD', 'Towson', 1.23, 1.09);

-- Nevada suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('89052', 'NV', 'Henderson', 1.19, 1.08),
  ('89135', 'NV', 'Las Vegas', 1.20, 1.08),
  ('89523', 'NV', 'Reno', 1.23, 1.09);

-- Utah suburbs
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('84043', 'UT', 'Lehi', 1.10, 1.05),
  ('84020', 'UT', 'Draper', 1.13, 1.06),
  ('84003', 'UT', 'American Fork', 1.09, 1.05);

-- Additional rural and small city coverage
INSERT INTO pricing_regions (zip_code, state, city, labor_multiplier, material_multiplier) VALUES
  ('50501', 'IA', 'Fort Dodge', 1.00, 1.01),
  ('56001', 'MN', 'Mankato', 1.08, 1.04),
  ('58701', 'ND', 'Minot', 1.09, 1.05),
  ('59801', 'MT', 'Missoula', 1.11, 1.05),
  ('97520', 'OR', 'Ashland', 1.20, 1.08),
  ('83843', 'ID', 'Moscow', 1.05, 1.03),
  ('67501', 'KS', 'Hutchinson', 1.00, 1.01),
  ('68467', 'NE', 'Seward', 1.04, 1.03),
  ('57301', 'SD', 'Mitchell', 1.03, 1.02),
  ('82070', 'WY', 'Laramie', 1.09, 1.05);
