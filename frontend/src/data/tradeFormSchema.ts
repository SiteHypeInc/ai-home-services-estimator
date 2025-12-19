export const TRADE_FORM_SCHEMA = {
  roofing: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'roofType', label: 'Roof Type', type: 'select', options: ['Asphalt Shingle', 'Metal', 'Tile', 'Flat'], required: true },
    { name: 'stories', label: 'Number of Stories', type: 'number', required: true }
  ],
  hvac: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'systemType', label: 'System Type', type: 'select', options: ['Central AC', 'Heat Pump', 'Furnace', 'Ductless Mini-Split'], required: true },
    { name: 'units', label: 'Number of Units', type: 'number', required: true }
  ],
  electrical: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Panel Upgrade', 'Rewiring', 'New Outlets', 'Lighting'], required: true }
  ],
  plumbing: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Repiping', 'Drain Cleaning', 'Water Heater', 'Fixture Installation'], required: true },
    { name: 'bathrooms', label: 'Number of Bathrooms', type: 'number', required: true }
  ],
  flooring: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'floorType', label: 'Floor Type', type: 'select', options: ['Hardwood', 'Laminate', 'Tile', 'Carpet', 'Vinyl'], required: true },
    { name: 'rooms', label: 'Number of Rooms', type: 'number', required: true }
  ],
  painting: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'paintType', label: 'Paint Type', type: 'select', options: ['Interior', 'Exterior', 'Both'], required: true },
    { name: 'rooms', label: 'Number of Rooms', type: 'number', required: true }
  ],
  general_contracting: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'projectType', label: 'Project Type', type: 'select', options: ['Remodel', 'Addition', 'New Construction', 'Renovation'], required: true },
    { name: 'projectDetails', label: 'Project Details', type: 'textarea', required: true }
  ]
};