import { api } from "encore.dev/api";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface ListFAQsResponse {
  faqs: FAQ[];
}

export const listFAQs = api(
  { method: "GET", path: "/ai-agent/faqs", expose: true },
  async (): Promise<ListFAQsResponse> => {
    const faqs: FAQ[] = [
      {
        id: 1,
        question: "What services do you offer?",
        answer: "We offer professional contractor services across 7+ trades including plumbing, electrical work, HVAC installation and repair, roofing, flooring, painting, and landscaping. Each service is performed by licensed and insured professionals.",
        category: "General",
      },
      {
        id: 2,
        question: "How quickly can I get an estimate?",
        answer: "You can get an instant estimate by filling out our online form! Our system calculates pricing based on your project details, location, and current market rates. You'll receive a detailed PDF estimate via email immediately after submission.",
        category: "Estimates",
      },
      {
        id: 3,
        question: "Is the estimate free?",
        answer: "Yes! All estimates are completely free with no obligation. We want you to have accurate pricing information to make the best decision for your project.",
        category: "Estimates",
      },
      {
        id: 4,
        question: "How is pricing calculated?",
        answer: "Our pricing is based on several factors: base labor rates from Bureau of Labor Statistics data, current material costs, regional pricing multipliers for your zip code, and the specific requirements of your project. This ensures you get fair, competitive pricing that reflects real market conditions.",
        category: "Pricing",
      },
      {
        id: 5,
        question: "Do prices vary by location?",
        answer: "Yes, pricing varies by location to reflect regional differences in labor costs and material availability. We have pricing data for over 800 zip codes across all 50 states, ensuring accurate estimates for your area.",
        category: "Pricing",
      },
      {
        id: 6,
        question: "How do I pay for services?",
        answer: "We accept payment via credit card, debit card, and ACH transfer through our secure Stripe payment gateway. A payment link is included in your estimate email for your convenience.",
        category: "Payment",
      },
      {
        id: 7,
        question: "Do I need to pay a deposit?",
        answer: "Yes, we typically require a 50% deposit to schedule work. The remaining balance is due upon completion of the project.",
        category: "Payment",
      },
      {
        id: 8,
        question: "How long is the estimate valid?",
        answer: "Estimates are valid for 30 days from the date of issue. After 30 days, material and labor costs may change, and we may need to provide an updated estimate.",
        category: "Estimates",
      },
      {
        id: 9,
        question: "Are your contractors licensed and insured?",
        answer: "Yes! All of our contractors are fully licensed, bonded, and insured. We conduct thorough background checks and verify credentials before any contractor joins our network.",
        category: "General",
      },
      {
        id: 10,
        question: "What if I need to change my project details?",
        answer: "No problem! If your project scope changes, simply request a new estimate with the updated details. We can provide revised pricing quickly through our online system.",
        category: "Estimates",
      },
      {
        id: 11,
        question: "Do you offer warranties on your work?",
        answer: "Yes! All work comes with a 1-year workmanship warranty. Additionally, materials and equipment often come with manufacturer warranties that we'll help you understand and utilize if needed.",
        category: "General",
      },
      {
        id: 12,
        question: "Can I schedule work for a specific date?",
        answer: "Once you accept an estimate and provide the deposit, we'll work with you to schedule at a time that's convenient. Availability varies by trade and season, but we do our best to accommodate your preferred timeline.",
        category: "Scheduling",
      },
      {
        id: 13,
        question: "What information do I need to provide for an estimate?",
        answer: "The information needed varies by service type, but generally includes: your location (zip code), project description, approximate size or scope, and any specific requirements. Our online forms guide you through exactly what we need for each type of service.",
        category: "Estimates",
      },
      {
        id: 14,
        question: "Do you handle permits?",
        answer: "Yes! When permits are required, we handle the permit application process as part of our service. Permit costs are included in your estimate when applicable.",
        category: "General",
      },
      {
        id: 15,
        question: "What if I'm not satisfied with the work?",
        answer: "Your satisfaction is our top priority. If you're not completely satisfied with any aspect of our work, please contact us immediately. We'll work with you to address any concerns and make it right.",
        category: "General",
      },
      {
        id: 16,
        question: "Can I get multiple estimates for different options?",
        answer: "Absolutely! You can submit as many estimate requests as you'd like to compare different approaches, materials, or scopes of work. This helps you make the most informed decision.",
        category: "Estimates",
      },
      {
        id: 17,
        question: "Do you offer emergency services?",
        answer: "Yes, we offer emergency services for urgent plumbing, electrical, and HVAC issues. Emergency service rates may apply. Call us directly for immediate assistance.",
        category: "General",
      },
      {
        id: 18,
        question: "How can I track my project status?",
        answer: "Once your project is scheduled, you'll receive updates via email and can contact your assigned contractor directly with any questions. We maintain open communication throughout the entire process.",
        category: "Scheduling",
      },
      {
        id: 19,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and ACH bank transfers through our secure payment system.",
        category: "Payment",
      },
      {
        id: 20,
        question: "Can I speak with a contractor before accepting an estimate?",
        answer: "Yes! Once you receive your estimate, you can request a consultation call with a contractor to discuss your project in detail, ask questions, and make any adjustments before moving forward.",
        category: "General",
      },
    ];

    return { faqs };
  }
);
