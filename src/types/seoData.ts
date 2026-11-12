export interface SeoPageMeta {
  url: string;
  title: string;
  h1: string;
  h2List: string[];
  description: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  canonical: string;
  ogType: string;
  schemaType: 'LocalBusiness' | 'Service' | 'FAQPage' | 'WebPage';
}

export interface RegionServiceMatrixItem {
  regionId: string;
  regionName: string;
  serviceId: string;
  serviceTitle: string;
  slug: string; // e.g. "gangnam-apartment"
  url: string; // e.g. "/region/gangnam/service/apartment"
  h1: string;
  h2List: string[];
  targetKeywords: string[];
  sampleCaseTitle: string;
  leadTime: string;
  priceEstimate: string;
}

export interface NaverSeoRequirement {
  id: string;
  category: string;
  title: string;
  status: 'passed' | 'warning' | 'info';
  description: string;
  codeSnippet?: string;
}
