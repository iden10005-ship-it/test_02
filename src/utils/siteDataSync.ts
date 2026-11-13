import { CompanyInfo, SiteData } from '../types/siteData';

const DEFAULT_REGION = '서울·경기·인천';

function replaceExactToken(text: string, oldToken: string, newToken: string): string {
  if (!text || !oldToken || oldToken === newToken) return text;
  return text.split(oldToken).join(newToken);
}

/**
 * Cleans up any legacy bracket template placeholders (e.g. [지역], [이름], [000]건)
 * from previously saved localStorage snapshots while preserving all user-customized data.
 */
export function sanitizeLoadedSiteData(parsed: SiteData): SiteData {
  const effectiveRegion =
    parsed.company?.region && parsed.company.region !== '[지역]'
      ? parsed.company.region
      : DEFAULT_REGION;

  const replaceRegionBrackets = (val: string) =>
    typeof val === 'string' ? val.replace(/\[지역\]/g, effectiveRegion) : val;

  return {
    ...parsed,
    company: {
      ...parsed.company,
      region:
        parsed.company?.region === '[지역]' || !parsed.company?.region
          ? effectiveRegion
          : parsed.company.region,
      representative:
        parsed.company?.representative === '[이름]'
          ? '김도현'
          : parsed.company?.representative || '',
      address:
        parsed.company?.address === '[사업장 주소]'
          ? '서울특별시 강남구 테헤란로 152'
          : parsed.company?.address || '',
    },
    hero: {
      ...parsed.hero,
      title: replaceRegionBrackets(parsed.hero?.title || ''),
      stats: (parsed.hero?.stats || []).map((stat) => {
        if (stat.value === '[000]건') return { ...stat, value: '3,500+건' };
        if (stat.value === '[00]년') return { ...stat, value: '10년' };
        if (stat.value === '[0.0]점') return { ...stat, value: '4.9점' };
        return stat;
      }),
    },
    services: {
      ...parsed.services,
      sectionTitle: replaceRegionBrackets(parsed.services?.sectionTitle || ''),
    },
    pricing: {
      ...parsed.pricing,
      rows: (parsed.pricing?.rows || []).map((row) => ({
        ...row,
        standard:
          row.standard === '[00]평형 (24평~34평 기준)' ? '24평~34평 기준' : row.standard,
        price:
          row.price === '[00,000]원~'
            ? '240,000원~'
            : row.price === '[0,000]원~'
            ? '8,000원~'
            : row.price,
      })),
    },
    reviews: {
      ...parsed.reviews,
      items: (parsed.reviews?.items || []).map((rev) => ({
        ...rev,
        author: rev.author === '[지역] 고객님' ? `${effectiveRegion} 고객님` : replaceRegionBrackets(rev.author),
      })),
    },
  };
}

/**
 * Updates a company field and propagates name/region changes into matching
 * headline/section titles so edits in Settings immediately stay in sync across the site.
 */
export function applyCompanyFieldChange(
  prev: SiteData,
  field: keyof CompanyInfo,
  value: string,
  prevAnchor?: string
): SiteData {
  const next: SiteData = {
    ...prev,
    company: {
      ...prev.company,
      [field]: value,
    },
  };

  const trimmed = value.trim();
  if (!trimmed) {
    return next;
  }

  if (field === 'name') {
    const targetOld = (prevAnchor ?? prev.company.name).trim();
    if (targetOld && targetOld !== value) {
      next.hero = {
        ...prev.hero,
        title: replaceExactToken(prev.hero.title, targetOld, value),
      };
      if (prev.gallery) {
        next.gallery = {
          ...prev.gallery,
          sectionSubtitle: replaceExactToken(prev.gallery.sectionSubtitle, targetOld, value),
        };
      }
      next.reviews = {
        ...prev.reviews,
        sectionSubtitle: replaceExactToken(prev.reviews.sectionSubtitle, targetOld, value),
      };
    }
  }

  if (field === 'region') {
    const targetOld = (prevAnchor ?? prev.company.region).trim();
    const updateRegionText = (text: string) => {
      let updated = text.replace(/\[지역\]/g, value);
      if (targetOld && targetOld !== '[지역]' && targetOld !== value) {
        updated = replaceExactToken(updated, targetOld, value);
      }
      return updated;
    };

    next.hero = {
      ...prev.hero,
      title: updateRegionText(prev.hero.title),
    };
    next.services = {
      ...prev.services,
      sectionTitle: updateRegionText(prev.services.sectionTitle),
    };
  }

  return next;
}
