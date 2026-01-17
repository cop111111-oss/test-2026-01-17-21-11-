
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface SiteContent {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutVision: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  kakaoLink: string;
  instagramLink: string;
  blogLink: string;
  services: Service[];
  portfolio: PortfolioItem[];
}

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'contact' | 'admin';
