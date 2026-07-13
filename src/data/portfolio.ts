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
  link?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  toolCategories: ToolCategory[];
  services: Service[];
  servicesQuote: string;
  experiences: Experience[];
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
      company: "Self-Employed",
      role: "Freelance Full-Stack Developer",
      duration: "March 2026",
      location: "Remote",
      description: "Developed client websites and delivered full project cycles from requirements gathering to deployment.",
      highlights: [
        "Delivered an icon library platform with customizable icons for a client.",
        "Built an architectural thesis portfolio featuring interactive floor plans and construction timelines.",
        "Collaborated directly with clients to gather requirements, iterate on feedback, and meet deadlines.",
      ],
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PHP"],
    },
    {
      company: "University of St. La Salle – Guidance Office",
      role: "University Intern",
      duration: "January 2026 – May 2026",
      location: "Bacolod City, Philippines",
      description: "Supported daily operations of the Guidance Office through data management and technical maintenance.",
      highlights: [
        "Encoded and managed enrollment records for incoming students, including intake interview data and university profile information.",
        "Monitored and maintained counselors' workstations, performing PC debugging and troubleshooting to ensure uninterrupted daily operations.",
      ],
      tags: ["Technical Support", "Data Management", "PC Troubleshooting"],
    },
    {
      company: "Self-Employed",
      role: "Freelance Network Technician",
      duration: "2021 – Present",
      location: "Bacolod City, Philippines",
      description: "Installed and configured network infrastructure for residential clients across Bacolod.",
      highlights: [
        "Installed fiber optic internet connections across residential areas, running and terminating cables from ISP drop points to individual homes.",
        "Configured and deployed point-to-point wireless links using Ubiquiti Gen2 and Gen3 antennas to extend network connectivity between locations.",
      ],
      tags: ["Fiber Optic", "Ubiquiti", "Networking", "P2P Wireless"],
    },
  ],
  projects: [],
  contact: {
    email: "geralppongos.sgp@gmail.com",
    phone: "+63 9310603505",
    address: "Bacolod City, Philippines",
    messagePlaceholder: "Tell me about your store, target timeline, or just say hello...",
  },
};
