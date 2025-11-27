
export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface ProductOptions {
  colors?: { name: string; hex: string }[];
  sizes?: string[]; // e.g. "6cm", "8cm", "11cm"
  coilStrengths?: string[]; // e.g. "Strength 1", "Strength 2"
  capacities?: string[]; // NEW: e.g. "230mAh", "300mAh" for batteries
}

export interface Product {
  id: string;
  name: string;
  description: string; // Short technical desc
  salesHook?: string; // The persuasive 2-sentence pitch
  longDescription?: string; // Full detailed text
  features?: string[]; // Bullet points
  specs?: Record<string, string>; // Technical specs key-value
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  reviewsList?: Review[];
  image: string;
  category: string;
  badge?: string; // e.g., "Best Seller", "New", "Bulk Save"
  compatibility: string[]; // e.g., ["N7", "Kanso 2", "Marvel"]
  isHsaEligible?: boolean;
  isBulk?: boolean;
  unitPrice?: string; // e.g. "$0.66 / battery"
  options?: ProductOptions; // Variations
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedCapacity?: string;
}

export interface Category {
  id: string;
  name: string;
  subTitle: string;
  icon: any; // We will pass Lucide icon components dynamically or handle in UI
  color: string;
}

export interface DeviceModel {
    id: string;
    brand: 'Cochlear' | 'Advanced Bionics' | 'Med-El';
    name: string; // Display name
    series: string; // Internal matching tag
    image: string;
    description?: string; // Short tagline for the card
}

export enum Page {
  HOME = 'HOME',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  SEARCH = 'SEARCH',
  BLOG = 'BLOG',
  BLOG_DETAIL = 'BLOG_DETAIL',
  BRANDS = 'BRANDS',
  SUPPORT = 'SUPPORT'
}
