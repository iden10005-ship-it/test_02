export interface CompanyInfo {
  name: string;
  region: string;
  phone: string;
  kakaoLink: string;
  representative: string;
  bizNumber: string;
  address: string;
  operatingHours: string;
  asPeriod: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface HeroData {
  badgeText: string;
  title: string;
  subtitle: string;
  callButtonText: string;
  kakaoButtonText: string;
  beforeAfterNotice: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  stats: StatItem[];
}

export interface ServiceDetailInfo {
  tagline: string;
  targetAudience: string;
  scopeList: string[];
  equipment: string[];
  duration: string;
  priceGuide: string;
  beforeImage?: string;
  afterImage?: string;
  faqList?: { q: string; a: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  detail?: ServiceDetailInfo;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface CaseItem {
  id: string;
  title: string;
  specs: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

export interface PriceRow {
  id: string;
  category: string;
  standard: string;
  price: string;
  highlight?: boolean;
}

export interface ReviewItem {
  id: string;
  content: string;
  author: string;
  rating: number;
  tag?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  region: string;
  buildingType: string;
  content: string;
  createdAt: string;
  status: '대기중' | '연락완료' | '견적발송' | '취소';
}

export interface ApartmentComplexItem {
  id: string;
  name: string;
  dong: string;
  windowType: string;
  householdCount?: string;
  keyCleaningPoint: string;
  recommendedService: string;
  satisfactionRate?: string;
  caseCount?: number;
}

export interface RegionKnowHowItem {
  id: string;
  title: string;
  category: '안전·공법' | '약품·유막제거' | '오염차단·보양' | '발수코팅·사후관리';
  subtitle: string;
  problem: string;
  solution: string;
  equipment: string;
  benefit: string;
}

export interface RegionDetailItem {
  name: string;
  subDistricts: string[];
  description: string;
  leadTime: string;
  popularComplexes?: string[];
  notice?: string;
  apartments?: ApartmentComplexItem[];
  knowHows?: RegionKnowHowItem[];
  environmentalFactors?: string[];
}

export interface GalleryPost {
  id: string;
  title: string;
  category: '아파트' | '상가' | '빌딩' | '간판,어닝청소' | '시트지제거' | string;
  region: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage: string;
  beforeImage?: string;
  afterImage?: string;
  tags: string[];
  content: string;
  equipmentUsed?: string[];
  keyPoints?: string[];
}

export type ThemeColor = 'blue' | 'ocean' | 'emerald' | 'slate';

export interface SiteData {
  theme: ThemeColor;
  company: CompanyInfo;
  hero: HeroData;
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ServiceItem[];
  };
  process: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: ProcessStep[];
  };
  cases: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CaseItem[];
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    posts: GalleryPost[];
  };
  pricing: {
    sectionTitle: string;
    sectionSubtitle: string;
    footerNote: string;
    rows: PriceRow[];
  };
  reviews: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ReviewItem[];
  };
  faq: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: FaqItem[];
  };
  regions: {
    sectionTitle: string;
    sectionSubtitle: string;
    list: string[];
    details?: { [regionName: string]: RegionDetailItem };
  };
  contactForm: {
    sectionTitle: string;
    sectionSubtitle: string;
    successMessage: string;
  };
  inquiries: InquiryItem[];
}

export type PageView =
  | { type: 'home' }
  | { type: 'service'; serviceId: string }
  | { type: 'region'; regionName: string }
  | { type: 'matrix'; regionName: string; serviceId: string }
  | { type: 'gallery_list' }
  | { type: 'gallery_detail'; postId: string };

