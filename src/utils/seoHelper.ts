import { SiteData, PageSeoConfig } from '../types/siteData';

/**
 * Calculates effective/default SEO metadata for any page key
 */
export function getEffectivePageSeo(pageKey: string, siteData: SiteData): PageSeoConfig {
  const existing = siteData.seo?.pages?.[pageKey];
  if (existing) {
    return {
      title: existing.title || '',
      description: existing.description || '',
      primaryKeywords: existing.primaryKeywords || [],
      secondaryKeywords: existing.secondaryKeywords || [],
      regionLongTailKeywords: existing.regionLongTailKeywords || [],
      author: existing.author || siteData.company.name,
    };
  }

  // Generate smart default based on pageKey
  if (pageKey === 'home') {
    return {
      title: `${siteData.hero.title} | ${siteData.company.name}`,
      description: `${siteData.hero.subtitle} 서울·경기·인천 출장 실측 무료견적: ${siteData.company.phone}`,
      primaryKeywords: [
        '유리창청소',
        '아파트외창청소',
        '외벽청소',
        '상가유리창청소',
        '빌딩외벽청소',
        '고층유리창청소',
        '서울유리창청소',
        siteData.company.name,
      ],
      secondaryKeywords: [
        '창틀청소',
        '유리발수코팅',
        '어닝청소',
        '유리창청소비용',
        '외창청소업체',
      ],
      regionLongTailKeywords: [
        '강남구 아파트 외창청소',
        '서초구 유리창물때제거',
        '송파구 고층창문청소',
        '분당구 상가유리세척',
      ],
      author: siteData.company.name,
    };
  }

  if (pageKey.startsWith('region:')) {
    const rName = pageKey.replace('region:', '');
    return {
      title: `[${rName}] 유리창청소·아파트 외창청소 전문 | ${siteData.company.name}`,
      description: `${rName} 관내 아파트 및 상가 유리창 전문 출장. 고층 외창 물때 제거, 샷시 레일 스팀 케어, 배상책임보험 가입 업체.`,
      primaryKeywords: [
        `${rName} 유리창청소`,
        `${rName} 아파트외창청소`,
        `${rName} 외창청소업체`,
        `${rName} 유리청소견적`,
        `${rName} 상가유리청소`,
        siteData.company.name,
      ],
      secondaryKeywords: [
        `${rName} 베란다창문청소`,
        `${rName} 창틀청소`,
        `${rName} 유리물때제거`,
        `${rName} 유리코팅`,
      ],
      regionLongTailKeywords: [
        `${rName} 아파트 외창 물때 제거 비용`,
        `${rName} 고층 유리창 청소 추천 업체`,
        `${rName} 샷시 레일 흑먼지 세척`,
        `${rName} 상가 통유리 정기 관리`,
      ],
      author: siteData.company.name,
    };
  }

  if (pageKey.startsWith('service:')) {
    const sId = pageKey.replace('service:', '');
    const srv = siteData.services.items.find((s) => s.id === sId);
    const title = srv ? srv.title : '유리창 청소';
    return {
      title: `[${siteData.company.region}] ${title} 전문 클리닝 | ${siteData.company.name}`,
      description: `${title} - ${srv?.description || ''} 무스크래치 전문 스퀴지 공법, 무료 견적 상담: ${siteData.company.phone}`,
      primaryKeywords: [
        title,
        `${title} 비용`,
        `${title} 견적`,
        '유리창청소',
        siteData.company.name,
      ],
      secondaryKeywords: [
        '외창 물때 제거',
        '창틀 레일 세척',
        '유리 표면 발수코팅',
        '아파트 고층 청소',
      ],
      regionLongTailKeywords: [
        `서울 경기 ${title} 전문 출장`,
        `아파트 베란다 ${title} 후기`,
      ],
      author: siteData.company.name,
    };
  }

  if (pageKey.startsWith('matrix:')) {
    const [, rName, sId] = pageKey.split(':');
    const srv = siteData.services.items.find((s) => s.id === sId);
    const sTitle = srv ? srv.title : '유리창 청소';
    return {
      title: `[${rName}] ${sTitle} 전문 시공 및 견적 | ${siteData.company.name}`,
      description: `${rName} ${sTitle} 맞춤 시공. 아파트 고층 외창 및 상가 유리 전문, 24시간 이내 신속 방문 실측.`,
      primaryKeywords: [
        `${rName} ${sTitle}`,
        `${rName} 유리창청소`,
        `${rName} 외창청소비용`,
        siteData.company.name,
      ],
      secondaryKeywords: [
        `${rName} 청소업체추천`,
        `${rName} 유리코팅`,
      ],
      regionLongTailKeywords: [
        `${rName} ${sTitle} 방문 견적 신청`,
        `${rName} 아파트 단지 공동구매 할인`,
      ],
      author: siteData.company.name,
    };
  }

  if (pageKey === 'gallery_list') {
    return {
      title: `시공 갤러리 & 작업 현장 일지 | ${siteData.company.name}`,
      description: `클리어웍스가 직접 시공한 서울·경기·인천 아파트 및 상가 유리창 청소 전후 현장 사례와 작업 스토리입니다.`,
      primaryKeywords: ['유리창청소시공사례', '외창청소후기', '유리청소전후사진', '현장일지', siteData.company.name],
      secondaryKeywords: ['아파트외창청소후기', '유리창청소만족도'],
      regionLongTailKeywords: ['서울 경기 지역별 시공 갤러리', '아파트 외창 전후 비교 사진'],
      author: siteData.company.name,
    };
  }

  return {
    title: `${siteData.company.name} - 전문 유리창 청소`,
    description: siteData.hero.subtitle,
    primaryKeywords: ['유리창청소', siteData.company.name],
    secondaryKeywords: [],
    regionLongTailKeywords: [],
    author: siteData.company.name,
  };
}

/**
 * Generates smart keyword recommendations for a page key
 */
export function getKeywordSuggestions(pageKey: string, siteData: SiteData): string[] {
  if (pageKey === 'home') {
    return [
      '아파트 외창 청소 견적',
      '고층 유리창 물때 제거',
      '상가 유리 정기 관리',
      '유리창 청소 업체 추천',
      '빌딩 외벽 고압세척',
      '베란다 창문 찌든때',
      '배상책임보험 청소업체',
    ];
  }
  if (pageKey.startsWith('region:')) {
    const r = pageKey.replace('region:', '');
    return [
      `${r} 아파트 외창 청소비용`,
      `${r} 고층 베란다 창문청소`,
      `${r} 상가 유리창 관리업체`,
      `${r} 당일 출장 무료견적`,
      `${r} 샷시 레일 흑먼지 청소`,
      `${r} 유리창 발수코팅 시공`,
    ];
  }
  if (pageKey.startsWith('service:')) {
    const sId = pageKey.replace('service:', '');
    const srv = siteData.services.items.find((s) => s.id === sId);
    const title = srv?.title || '유리창 청소';
    return [
      `${title} 평당 가격`,
      `${title} 작업 후기`,
      `${title} 전문 장비`,
      `${title} 당일 예약`,
      '자성 와이퍼 안전 시공',
      '독일 수입 스퀴지 마감',
    ];
  }
  if (pageKey.startsWith('matrix:')) {
    const [, r, sId] = pageKey.split(':');
    const srv = siteData.services.items.find((s) => s.id === sId);
    const title = srv?.title || '유리창 청소';
    return [
      `${r} ${title} 견적`,
      `${r} 아파트 공동구매 할인`,
      `${r} 창문 청소 예약`,
      '비산 방지 오염수 집진',
    ];
  }
  return [
    '서울 유리창 청소',
    '경기 유리창 청소',
    '인천 유리창 청소',
    '외창 물때 스티커 제거',
  ];
}
