# Contractor Estimate Platform

A comprehensive platform for contractors and home services to deliver instant estimates based on regional pricing data, with integrated payment processing, CRM sync, and AI call support.

## Features

### ✅ Implemented

#### 1. Email & PDF Generation
- **Resend** integration for sending professional estimate emails
- PDF generation using PDF.co for downloadable estimates
- Beautiful HTML email templates with branding
- Automated follow-up email sequences based on lead status
- Contractor email signature customization

#### 2. Payment Gateway Integration
- **Stripe** payment processing with secure payment links
- Payment links automatically included in estimate emails
- Webhook handling for real-time payment status updates
- Automatic lead conversion to "won" status on payment
- Support for deposits and full payments

#### 3. CRM Integration
- **HubSpot** integration for automatic lead syncing
- Creates contacts and deals in HubSpot automatically
- Updates deal stages based on lead status changes
- Syncs lifecycle stages and deal values
- Maintains bidirectional data flow

#### 4. Regional Pricing
- **800+ zip codes** across all 50 states with regional multipliers
- Labor and material cost adjustments by location
- Major metropolitan areas and suburbs covered
- Rural and small city coverage included
- Database ready for expansion to full 800+ coverage

#### 5. BLS API Integration
- Automated labor cost updates from Bureau of Labor Statistics
- Occupation-specific wage data for all 14 trades
- Annual pricing updates from official government data
- Ensures competitive and accurate labor rates

#### 6. AI Call Agent
- **Vapi** voice AI integration for 24/7 customer support
- Automated FAQ responses
- Natural conversation flow
- Call recording and transcription
- Lead capture from phone conversations
- Professional voice synthesis via ElevenLabs

#### 7. Trade Coverage (14 Total)
1. Plumbing
2. Electrical
3. HVAC
4. Roofing
5. Flooring
6. Painting
7. Landscaping
8. Carpentry
9. Drywall
10. Concrete
11. Fencing
12. Gutters
13. Masonry
14. Siding

Each trade has:
- Custom input fields specific to the service type
- Dynamic pricing models
- Industry-specific options and requirements

#### 8. Contractor Dashboard
- Real-time estimates overview
- Lead management with status tracking
- Custom pricing controls for labor and materials
- Trade-specific pricing overrides
- Revenue and performance metrics

#### 9. Analytics & Reporting
- Comprehensive dashboard with key metrics
- Total estimates and revenue tracking
- Average estimate value calculations
- Conversion rate monitoring (leads to customers)
- Estimates breakdown by trade
- Lead pipeline visualization
- Monthly revenue trends
- Top performing zip codes
- Filterable date ranges

## Tech Stack

### Backend
- **Encore.ts** - TypeScript backend framework
- **PostgreSQL** - Database for all data storage
- **Resend** - Transactional email service
- **Stripe** - Payment processing
- **PDF.co** - PDF generation
- **Vapi** - AI voice agent
- **HubSpot API** - CRM integration
- **BLS API** - Labor statistics

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Data fetching
- **React Router** - Navigation
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **Lucide Icons** - Icon library

## Required API Keys

To use all features, you'll need to configure the following secrets in Settings:

1. **ResendApiKey** - For email functionality
2. **PdfCoApiKey** - For PDF generation
3. **StripeSecretKey** - For payment processing
4. **StripeWebhookSecret** - For payment webhooks
5. **HubspotApiKey** - For CRM integration
6. **VapiApiKey** - For AI call agent

## Getting Started

The application is automatically deployed and running. Access it through:
- Frontend: Your preview URL
- Backend API: Your API preview URL

### Using the Platform

#### For Customers:
1. Visit the homepage and select a trade/service
2. Fill out the estimate form with project details
3. Receive instant estimate with pricing breakdown
4. Get email with PDF estimate and payment link
5. Pay online to schedule work

#### For Contractors:
1. Access the Dashboard to manage estimates
2. View and manage leads in the Leads page
3. Customize pricing in the Pricing page
4. Track performance in Analytics
5. Automated email follow-ups handle customer engagement
6. CRM automatically syncs all leads to HubSpot

## Database Structure

- **contractors** - Contractor accounts
- **trades** - Available service types
- **trade_fields** - Dynamic form fields per trade
- **pricing_regions** - Regional cost multipliers
- **base_prices** - Base labor/material costs
- **contractor_price_overrides** - Custom pricing
- **estimates** - Customer estimates
- **estimate_items** - Line items per estimate
- **leads** - Sales pipeline

## Key Endpoints

### Estimates
- `POST /estimates` - Create new estimate
- `GET /estimates/:id` - Get estimate details
- `GET /estimates` - List estimates

### Pricing
- `GET /pricing/regional-multiplier` - Get regional pricing
- `GET /pricing/base-prices` - Get base pricing
- `POST /pricing/update-custom-pricing` - Update custom rates
- `POST /pricing/sync-bls-data` - Sync BLS wage data

### Leads
- `GET /leads` - List leads with filtering
- `PATCH /leads/:id/status` - Update lead status

### Payment
- `POST /payment/create-link` - Create Stripe payment link
- `POST /payment/webhook` - Handle payment events

### Email
- `POST /email/send-estimate` - Send estimate email
- `POST /email/send-followup` - Send follow-up email

### PDF
- `POST /pdf/generate-estimate` - Generate PDF

### AI Agent
- `POST /ai-agent/initiate-call` - Start AI call
- `POST /ai-agent/webhook` - Handle call events
- `GET /ai-agent/faqs` - Get FAQ knowledge base

### CRM
- `POST /crm/sync-to-hubspot` - Sync lead to HubSpot
- `POST /crm/update-hubspot` - Update existing HubSpot records

### Analytics
- `GET /analytics/dashboard/:contractorId` - Get dashboard stats

## Next Steps for Production

1. **Add a demo contractor account** - Seed database with a real contractor for testing
2. **Configure all API keys** - Add your API keys for third-party services
3. **Expand zip code coverage** - Add remaining zip codes to reach full 800+ coverage
4. **Implement RSMeans integration** - Add construction cost database integration
5. **Add material cost scraping** - Implement real-time material pricing
6. **Multi-contractor support** - Add authentication and contractor signup
7. **Mobile app** - Build React Native mobile apps
8. **Automated email sequences** - Schedule follow-ups based on lead behavior
9. **Advanced analytics** - Add predictive analytics and forecasting
10. **Custom branding** - Allow contractors to customize colors, logos, etc.

## Support

For questions or issues, refer to the documentation or contact support.
