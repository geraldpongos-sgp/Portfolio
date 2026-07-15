export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bioShort: string;
  bioFull: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    telegram?: string;
    discord?: string;
    email?: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ToolCategory {
  categoryName: string;
  tools: {
    name: string;
    icon: string;
  }[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Service {
  title: string;
  icon: string;
  items: string[];
}

export interface ContactInfo {
  heading: string;
  blurb: string;
  email: string;
  phone?: string;
  address?: string;
  messagePlaceholder?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

export interface WhyChooseUsItem {
  title: string;
  navLabel?: string;
  subtitle?: string;
  sideText?: string;
  description: string;
  thumbnailUrl?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  toolCategories: ToolCategory[];
  services: Service[];
  servicesQuote: string;
  experiences: Experience[];
  whyChooseUsSubtitle: string;
  whyChooseUs: WhyChooseUsItem[];
  projects: Project[];
  contact: ContactInfo;
}

export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Gerald Pongos",
    role: "eCommerce Virtual Assistant",
    tagline: "Helping online stores grow through product research, listing optimization, and reliable marketplace operations.",
    bioShort: "Dedicated eCommerce Virtual Assistant experienced in Shopify, eBay, and Amazon store operations.",
    bioFull: "A dedicated and detail-oriented eCommerce Virtual Assistant with experience in Shopify, eBay, Amazon, etc. Identifies winning products through market, competitor, and trend analysis, product management, product pricing, marketplace operations, and data entry. Skilled in maintaining accurate product catalogs, updating pricing, managing inventory, and supporting online store operations. Quick to learn new eCommerce tools and committed to helping businesses grow through efficiency, organization, and outstanding customer service.",
    avatarUrl: "/images/gerald_portrait.png",
    resumeUrl: "/PONGOS_RESUME.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/geraldpongos29777",
      facebook: "https://www.facebook.com/geraldpongos.sgp",
      instagram: "https://www.instagram.com/qeraldponqos_/",
      email: "geralppongos.sgp@gmail.com",
    },
    stats: [
      { label: "Experience Level", value: "Entry" },
      { label: "Completed Projects", value: "10+" },
      { label: "Happy Clients", value: "2+" },
    ],
  },
  toolCategories: [
    {
      categoryName: "eCommerce Platforms",
      tools: [
        { name: "Shopify", icon: "Store" },
        { name: "eBay", icon: "ShoppingBag" },
        { name: "Amazon", icon: "Package" },
        { name: "Walmart", icon: "ShoppingCart" },
        { name: "Shopee", icon: "ShoppingBag" },
        { name: "AliExpress", icon: "Truck" },
        { name: "Alibaba", icon: "Boxes" },
        { name: "DSers", icon: "Repeat" },
      ],
    },
    {
      categoryName: "Productivity & Creative Tools",
      tools: [
        { name: "Microsoft Office", icon: "Briefcase" },
        { name: "Gmail", icon: "Mail" },
        { name: "Google Calendar", icon: "Calendar" },
        { name: "Google Drive", icon: "HardDrive" },
        { name: "Google Meet", icon: "Video" },
        { name: "Canva", icon: "Palette" },
        { name: "ChatGPT", icon: "Bot" },
        { name: "CapCut", icon: "Scissors" },
        { name: "Adobe Premiere Pro", icon: "Clapperboard" },
        { name: "TikTok", icon: "Music2" },
        { name: "AutoDS", icon: "Bot" },
        { name: "Easync", icon: "Repeat" },
        { name: "ZikAnalytics", icon: "TrendingUp" },
      ],
    },
  ],
  services: [
    {
      title: "eCommerce Management",
      icon: "ShoppingBag",
      items: ["Dropshipping", "Order Processing", "Order Fulfillment", "Pricing Strategy", "Inventory Management"],
    },
    {
      title: "Product Management",
      icon: "Package",
      items: ["Product Research", "Product Listing", "Cross-Posting", "Data Entry"],
    },
    {
      title: "SEO & Content Optimization",
      icon: "Search",
      items: ["SEO Title Building", "Product Description Writing"],
    },
  ],
  servicesQuote: "I believe that a well-managed online store is built on consistency, accuracy, and attention to detail. Whether it's researching products, optimizing listings, maintaining inventory, or processing orders, I'm committed to delivering organized, reliable support that helps businesses operate more efficiently and create a better shopping experience for their customers.",
  experiences: [
    {
      company: "VA eCommerce Platform",
      role: "E-Commerce Specialist",
      duration: "October 2024 – June 2026",
      location: "Remote — US, AU Clients",
      description: "Managed end-to-end eCommerce operations for international clients, from product research to order fulfillment.",
      highlights: [
        "Researches high-demand & profitable products, analyzes market trends, and sources reliable suppliers.",
        "Creates clear, compelling product descriptions that highlight features, benefits, and value to inform customers and drive sales.",
        "Accurately enters, updates, and maintains data while ensuring quality and efficiency.",
        "Manages order processing, fulfillment, and shipment while ensuring accuracy and efficiency.",
      ],
      tags: ["Product Research", "Order Fulfillment", "Data Entry", "Market Analysis"],
    },
    {
      company: "McDonald's Philippines",
      role: "Department Manager",
      duration: "February 2013 – April 2024",
      location: "Bacolod City, Philippines",
      description: "Oversaw daily store operations, inventory, and staff training to maintain consistent service quality and operational efficiency.",
      highlights: [
        "Managed daily store operations, ensuring high-quality service, food safety compliance, and efficient team performance.",
        "Oversaw inventory, product ordering, and stock monitoring (frozen, dry, and fast-moving items) to maintain operational efficiency.",
        "Trained and supervised staff on SOPs and quality standards to ensure consistency and excellent customer service.",
      ],
      tags: ["Team Leadership", "Inventory Management", "Operations", "Training & SOPs"],
    },
    {
      company: "Teletech Customer Care Inc.",
      role: "Technical Support Representative",
      duration: "July 2011 – January 2013",
      location: "Philippines",
      description: "Delivered remote technical support and documented customer issues to maintain high satisfaction.",
      highlights: [
        "Provided technical support using remote tools (LogMeIn).",
        "Resolved software and hardware issues efficiently.",
        "Documented customer issues, solutions, and service records.",
        "Maintained high customer satisfaction through timely support.",
      ],
      tags: ["Technical Support", "Remote Tools", "Customer Service", "Documentation"],
    },
  ],
  whyChooseUsSubtitle: "Select a Project",
  whyChooseUs: [
    {
      title: "Why Choose Me?",
      description: "I bring consistency, accuracy, and attention to detail to every task — from product research to order fulfillment — so store owners can focus on growth instead of day-to-day operations.",
    },
    {
      title: "My Commitment",
      description: "I show up on time, communicate clearly, and follow through on every task. Reliability isn't a bonus — it's the baseline I hold myself to.",
    },
    {
      title: "My Story",
      description: "After years in retail management and technical support, I moved into eCommerce virtual assistance to combine my operations background with a growing passion for online business.",
    },
    {
      title: "My Vision",
      description: "To become a trusted long-term partner for eCommerce brands — helping them scale smoothly by handling the operational details with care and precision.",
    },
  ],
  projects: [],
  contact: {
    heading: "Need help running your online store?",
    blurb:
      "I'm currently accepting new eCommerce VA engagements, freelance contracts, and long-term store management roles. Drop a line, and let's get your store running smoothly.",
    email: "geralppongos.sgp@gmail.com",
    phone: "+63 9310603505",
    address: "Bacolod City, Philippines",
    messagePlaceholder: "Tell me about your store, target timeline, or just say hello...",
  },
};
