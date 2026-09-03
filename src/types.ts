export type CropCategory =
  | 'vegetables'
  | 'fruits'
  | 'greens'
  | 'staples'
  | 'rice'
  | 'pulses'
  | 'grains'
  | 'millets'
  | 'oilseeds'
  | 'spices'
  | 'cotton'
  | 'cash-crops'
  | 'box';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: CropCategory;
  price: number;
  unit: string;
  mandiPrice: number;
  retailPrice: number;
  farmLocation: string;
  farmerName: string;
  distanceKm: number;
  harvestWindow: string;
  image: string;
  description: string;
  nutrients: string[];
  organic: boolean;
  minOrder: number;
  maxOrder?: number;
  harvestCountdown?: string;
}

export interface CropRequest {
  id: string;
  cropName: string;
  hindiName?: string;
  category: string;
  variety?: string;
  quantity: string;
  unit: string;
  targetPricePerUnit?: number;
  userName: string;
  userPhone: string;
  societyName: string;
  specialRequirements?: string;
  organicOnly: boolean;
  status: 'Received' | 'Finding Local Farmers' | 'Matched with FPO' | 'Harvest Scheduled';
  createdAt: string;
  matchedFarmer?: {
    name: string;
    location: string;
    quotedPrice: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Society {
  id: string;
  name: string;
  area: string;
  city: string;
  activeMembers: number;
  deliverySlot: string;
  leadCoordinator: string;
  isPopular?: boolean;
}

export interface FreshBox {
  id: string;
  title: string;
  name?: string;
  subtitle: string;
  description?: string;
  price: number;
  retailValue?: number;
  weight: string;
  servings: string;
  items: string[];
  badge?: string;
  popular?: boolean;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  initials: string;
}

export interface MandiRate {
  crop: string;
  mandiRate: number;
  retailRate: number;
  kisanDirectRate: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}
