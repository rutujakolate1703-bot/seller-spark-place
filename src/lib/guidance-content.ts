export const GUIDANCE_DISCLAIMER =
  "Requirements may vary depending on your business, product, location and other circumstances. Verify current requirements through the relevant official government authority.";

export interface GuidanceItem {
  id: string;
  title: string;
  what: string;
  who: string;
  why: string;
  documents: string[];
  process: string[];
  resourceLabel: string;
  resourceUrl: string;
  appliesTo?: string[];
}

export const GUIDANCE_ITEMS: GuidanceItem[] = [
  {
    id: "basic",
    title: "Basic business information",
    what: "A written record of your business name, owner details, address and what you sell.",
    who: "Every seller, including very small home-based businesses.",
    why: "Buyers, banks and any authority you deal with will ask for consistent basic details.",
    documents: ["Identity proof", "Address proof", "Bank account details", "Business/shop name"],
    process: [
      "Write down your business name, address and contact details.",
      "Keep the same details everywhere — store, invoices, bank.",
      "Save copies of your identity and address proof in one folder.",
    ],
    resourceLabel: "India.gov.in — business & self-employment",
    resourceUrl: "https://www.india.gov.in/topics/industries",
  },
  {
    id: "udyam",
    title: "Small business (MSME/Udyam) registration information",
    what: "Udyam is the government's free online registration for micro, small and medium enterprises.",
    who: "Small and home-based businesses that want a recognised business identity may consider it.",
    why: "It is often asked for when applying for business loans, schemes or government tenders.",
    documents: ["Aadhaar number of the owner", "PAN", "Business address", "Bank details"],
    process: [
      "Visit the official Udyam registration portal.",
      "Register using the owner's Aadhaar details.",
      "Save the registration number and certificate safely.",
    ],
    resourceLabel: "Udyam Registration (official portal)",
    resourceUrl: "https://udyamregistration.gov.in/",
  },
  {
    id: "gst",
    title: "Tax / GST information",
    what: "GST is India's goods and services tax. Registration depends on turnover, the goods you sell and where you sell.",
    who: "Sellers may need it above certain turnover limits or for some inter-state and online sales.",
    why: "It affects your invoices, pricing and what you file. Limits and exemptions change over time.",
    documents: ["PAN", "Aadhaar", "Proof of business address", "Bank account proof", "Photograph"],
    process: [
      "Check current turnover limits and exemptions on the GST portal.",
      "If applicable, apply for registration online.",
      "Keep sales records so filing stays simple.",
    ],
    resourceLabel: "GST Portal (official)",
    resourceUrl: "https://www.gst.gov.in/",
  },
  {
    id: "fssai",
    title: "Food business requirements (FSSAI)",
    what: "FSSAI is the food safety authority. Food businesses generally need a registration or licence depending on scale.",
    who: "Anyone preparing, packing or selling food — including home kitchens and bakers.",
    why: "Food safety rules cover hygiene, labelling and packaging, and buyers often look for it.",
    documents: ["Identity proof", "Address proof of kitchen/premises", "Photograph", "Food product list"],
    process: [
      "Check on the FSSAI portal which category matches your scale.",
      "Apply for the matching registration or licence.",
      "Follow labelling and hygiene guidance for packed food.",
    ],
    resourceLabel: "FSSAI — Food Licensing (official)",
    resourceUrl: "https://foscos.fssai.gov.in/",
    appliesTo: ["Food"],
  },
  {
    id: "handicraft",
    title: "Handmade & handicraft product information",
    what: "Schemes, artisan cards and export support exist for handmade and handicraft makers.",
    who: "Crafters, handmade product makers, jewellery and home decor artisans may benefit.",
    why: "It can open access to craft schemes, exhibitions and marketing support.",
    documents: ["Identity proof", "Photos of your work", "Business details"],
    process: [
      "Read the schemes listed by the handicrafts office.",
      "Check whether artisan identification applies to your craft.",
      "Keep photos and product details ready for applications.",
    ],
    resourceLabel: "Office of the Development Commissioner (Handicrafts)",
    resourceUrl: "https://handicrafts.gov.in/",
    appliesTo: ["Handmade products", "Jewellery", "Home decor"],
  },
  {
    id: "cosmetics",
    title: "Beauty & cosmetic product information",
    what: "Cosmetics are regulated products with rules on manufacturing and labelling.",
    who: "Sellers making or packing soaps, creams, oils or other beauty products.",
    why: "Manufacturing and labelling rules exist for anything applied to the body.",
    documents: ["Product list and ingredients", "Premises details", "Label drafts"],
    process: [
      "Read the cosmetics rules on the CDSCO site.",
      "Check whether manufacturing approval applies to your scale.",
      "Review your labels against the labelling requirements.",
    ],
    resourceLabel: "CDSCO — Cosmetics (official)",
    resourceUrl: "https://cdsco.gov.in/opencms/opencms/en/Cosmetics/cosmetics/",
    appliesTo: ["Beauty products"],
  },
  {
    id: "local",
    title: "Local permissions",
    what: "Municipal or panchayat permissions such as trade licences can apply to local businesses.",
    who: "Sellers working from home or a local shop, depending on the area and activity.",
    why: "Local bodies set their own rules, so two sellers in different cities may differ.",
    documents: ["Address proof", "Property or rent papers", "Identity proof"],
    process: [
      "Find your municipal corporation or panchayat website.",
      "Search for trade licence or shop registration guidance.",
      "Ask at the local office if the rules are unclear.",
    ],
    resourceLabel: "MyGov — state & local government links",
    resourceUrl: "https://www.mygov.in/",
  },
  {
    id: "other",
    title: "Other applicable requirements",
    what: "Packaging, weights and measures, trademark and shipping rules can apply as you grow.",
    who: "Sellers packing products, shipping across states or building a brand name.",
    why: "These become relevant once you sell more widely or want to protect your name.",
    documents: ["Packaging and label details", "Brand name and logo", "Courier documents"],
    process: [
      "Check legal metrology rules for packaged goods.",
      "Consider a trademark search before printing brand packaging.",
      "Confirm courier rules for the products you ship.",
    ],
    resourceLabel: "Department of Consumer Affairs — Legal Metrology",
    resourceUrl: "https://consumeraffairs.nic.in/organisation-and-units/division/legal-metrology",
  },
];

export function guidanceFor(productType: string): GuidanceItem[] {
  return GUIDANCE_ITEMS.filter(
    (item) => !item.appliesTo || item.appliesTo.includes(productType),
  );
}

export const CATEGORIES = [
  "Food",
  "Clothing",
  "Handmade products",
  "Jewellery",
  "Beauty products",
  "Home decor",
  "Plants",
  "Other",
];
