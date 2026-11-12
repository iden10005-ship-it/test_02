import { RegionServiceMatrixItem, NaverSeoRequirement, SeoPageMeta } from '../types/seoData';

// 2. 서울/수도권 구단위 지역 URL 정의 (서울시 25개 구 전체 순차 배치 + 수도권 주요지역)
export const REGION_URL_MAP: { [key: string]: { id: string; name: string; slug: string; enName: string; landmark: string } } = {
  // 서울 동남권 (강남4구)
  강남구: { id: 'gangnam', name: '강남구', slug: 'gangnam', enName: 'Gangnam-gu', landmark: '테헤란로·개포·대치·압구정' },
  서초구: { id: 'seocho', name: '서초구', slug: 'seocho', enName: 'Seocho-gu', landmark: '반포·잠원·방배·양재' },
  송파구: { id: 'songpa', name: '송파구', slug: 'songpa', enName: 'Songpa-gu', landmark: '잠실·가락·문정·위례' },
  강동구: { id: 'gangdong', name: '강동구', slug: 'gangdong', enName: 'Gangdong-gu', landmark: '고덕·둔촌·명일·암사' },

  // 서울 서남권
  영등포구: { id: 'yeongdeungpo', name: '영등포구', slug: 'yeongdeungpo', enName: 'Yeongdeungpo-gu', landmark: '여의도·문래·당산·신길' },
  양천구: { id: 'yangcheon', name: '양천구', slug: 'yangcheon', enName: 'Yangcheon-gu', landmark: '목동·신정·신월' },
  동작구: { id: 'dongjak', name: '동작구', slug: 'dongjak', enName: 'Dongjak-gu', landmark: '흑석·노량진·사당·상도' },
  관악구: { id: 'gwanak', name: '관악구', slug: 'gwanak', enName: 'Gwanak-gu', landmark: '서울대입구·봉천·신림' },
  강서구: { id: 'gangseo', name: '강서구', slug: 'gangseo', enName: 'Gangseo-gu', landmark: '마곡·화곡·가양·염창' },
  구로구: { id: 'guro', name: '구로구', slug: 'guro', enName: 'Guro-gu', landmark: '신도림·구로디지털·개봉' },
  금천구: { id: 'geumcheon', name: '금천구', slug: 'geumcheon', enName: 'Geumcheon-gu', landmark: '가산디지털·독산·시흥' },

  // 서울 도심 및 서북권
  마포구: { id: 'mapo', name: '마포구', slug: 'mapo', enName: 'Mapo-gu', landmark: '상암·홍대·공덕·아현' },
  용산구: { id: 'yongsan', name: '용산구', slug: 'yongsan', enName: 'Yongsan-gu', landmark: '한남·이촌·이태원·한강로' },
  성동구: { id: 'seongdong', name: '성동구', slug: 'seongdong', enName: 'Seongdong-gu', landmark: '성수·옥수·왕십리·금호' },
  광진구: { id: 'gwangjin', name: '광진구', slug: 'gwangjin', enName: 'Gwangjin-gu', landmark: '자양·구의·광장·화양' },
  중구: { id: 'junggu', name: '중구', slug: 'junggu', enName: 'Jung-gu', landmark: '명동·을지로·동대문·회현' },
  종로구: { id: 'jongno', name: '종로구', slug: 'jongno', enName: 'Jongno-gu', landmark: '광화문·혜화·평창·교남' },
  서대문구: { id: 'seodaemun', name: '서대문구', slug: 'seodaemun', enName: 'Seodaemun-gu', landmark: '신촌·북가좌·남가좌·홍제' },
  은평구: { id: 'eunpyeong', name: '은평구', slug: 'eunpyeong', enName: 'Eunpyeong-gu', landmark: '진관(은평뉴타운)·불광·응암' },

  // 서울 동북권
  동대문구: { id: 'dongdaemun', name: '동대문구', slug: 'dongdaemun', enName: 'Dongdaemun-gu', landmark: '청량리·이문·답십리·장안' },
  성북구: { id: 'seongbuk', name: '성북구', slug: 'seongbuk', enName: 'Seongbuk-gu', landmark: '길음·정릉·성북동·석관' },
  중랑구: { id: 'jungnang', name: '중랑구', slug: 'jungnang', enName: 'Jungnang-gu', landmark: '면목·상봉·중화·신내' },
  노원구: { id: 'nowon', name: '노원구', slug: 'nowon', enName: 'Nowon-gu', landmark: '중계·상계·하계·공릉' },
  도봉구: { id: 'dobong', name: '도봉구', slug: 'dobong', enName: 'Dobong-gu', landmark: '창동·쌍문·방학·도봉' },
  강북구: { id: 'gangbuk', name: '강북구', slug: 'gangbuk', enName: 'Gangbuk-gu', landmark: '미아·수유·번동·우이' },

  // 경기 수도권 구/시 단위 전역
  '수원 영통구': { id: 'suwon-yeongtong', name: '수원 영통구', slug: 'suwon-yeongtong', enName: 'Yeongtong-gu', landmark: '광교·매탄·영통·원천' },
  '수원 권선구': { id: 'suwon-gwonseon', name: '수원 권선구', slug: 'suwon-gwonseon', enName: 'Gwonseon-gu', landmark: '호매실·세류·권선·곡반정' },
  '수원 장안구': { id: 'suwon-jangan', name: '수원 장안구', slug: 'suwon-jangan', enName: 'Jangan-gu', landmark: '정자·조원·율전·천천' },
  '수원 팔달구': { id: 'suwon-paldal', name: '수원 팔달구', slug: 'suwon-paldal', enName: 'Paldal-gu', landmark: '인계·우만·화서·행궁' },

  '성남 분당구': { id: 'seongnam-bundang', name: '성남 분당구', slug: 'seongnam-bundang', enName: 'Bundang-gu', landmark: '판교·정자·서현·백현' },
  '성남 수정구': { id: 'seongnam-sujeong', name: '성남 수정구', slug: 'seongnam-sujeong', enName: 'Sujeong-gu', landmark: '위례·신흥·태평·창곡' },
  '성남 중원구': { id: 'seongnam-jungwon', name: '성남 중원구', slug: 'seongnam-jungwon', enName: 'Jungwon-gu', landmark: '상대원·성남·여수·도촌' },

  '용인 수지구': { id: 'yongin-suji', name: '용인 수지구', slug: 'yongin-suji', enName: 'Suji-gu', landmark: '성복·신봉·죽전·동천' },
  '용인 기흥구': { id: 'yongin-giheung', name: '용인 기흥구', slug: 'yongin-giheung', enName: 'Giheung-gu', landmark: '동백·보정·구갈·영덕' },
  '용인 처인구': { id: 'yongin-cheoin', name: '용인 처인구', slug: 'yongin-cheoin', enName: 'Cheoin-gu', landmark: '역북·삼가·포곡·모현' },

  '고양 일산동구': { id: 'goyang-ilsandong', name: '고양 일산동구', slug: 'goyang-ilsandong', enName: 'Ilsandong-gu', landmark: '백석·마두·정발산·장항' },
  '고양 일산서구': { id: 'goyang-ilsanseo', name: '고양 일산서구', slug: 'goyang-ilsanseo', enName: 'Ilsanseo-gu', landmark: '킨텍스·주엽·탄현·대화' },
  '고양 덕양구': { id: 'goyang-deokyang', name: '고양 덕양구', slug: 'goyang-deokyang', enName: 'Deokyang-gu', landmark: '삼송·원흥·지축·향동' },

  '부천 원미구': { id: 'bucheon-wonmi', name: '부천 원미구', slug: 'bucheon-wonmi', enName: 'Wonmi-gu', landmark: '중동·상동·원미·심곡' },
  '부천 소사구': { id: 'bucheon-sosa', name: '부천 소사구', slug: 'bucheon-sosa', enName: 'Sosa-gu', landmark: '범박·괴안·소사·옥길' },
  '부천 오정구': { id: 'bucheon-ojeong', name: '부천 오정구', slug: 'bucheon-ojeong', enName: 'Ojeong-gu', landmark: '오정·원종·고강·삼정' },

  '안양 동안구': { id: 'anyang-dongan', name: '안양 동안구', slug: 'anyang-dongan', enName: 'Dongan-gu', landmark: '평촌·비산·관양·호계' },
  '안양 만안구': { id: 'anyang-manan', name: '안양 만안구', slug: 'anyang-manan', enName: 'Manan-gu', landmark: '안양동·석수·박달' },

  '안산 단원구': { id: 'ansan-danwon', name: '안산 단원구', slug: 'ansan-danwon', enName: 'Danwon-gu', landmark: '고잔·초지·선부·대부도' },
  '안산 상록구': { id: 'ansan-sangrok', name: '안산 상록구', slug: 'ansan-sangrok', enName: 'Sangrok-gu', landmark: '사동·본오·부곡·월피' },

  화성시: { id: 'hwaseong', name: '화성시', slug: 'hwaseong', enName: 'Hwaseong-si', landmark: '동탄1·2신도시·향남·새솔' },
  평택시: { id: 'pyeongtaek', name: '평택시', slug: 'pyeongtaek', enName: 'Pyeongtaek-si', landmark: '고덕국제신도시·비전·지제' },
  시흥시: { id: 'siheung', name: '시흥시', slug: 'siheung', enName: 'Siheung-si', landmark: '배곧신도시·목감·은계·정왕' },
  김포시: { id: 'gimpo', name: '김포시', slug: 'gimpo', enName: 'Gimpo-si', landmark: '한강신도시·운양·장기·구래' },
  광명시: { id: 'gwangmyeong', name: '광명시', slug: 'gwangmyeong', enName: 'Gwangmyeong-si', landmark: '철산·하안·일직(광명역)·소하' },
  하남시: { id: 'hanam', name: '하남시', slug: 'hanam', enName: 'Hanam-si', landmark: '미사강변·위례·감일·풍산' },
  파주시: { id: 'paju', name: '파주시', slug: 'paju', enName: 'Paju-si', landmark: '운정신도시·야당·동패·금촌' },
  군포시: { id: 'gunpo', name: '군포시', slug: 'gunpo', enName: 'Gunpo-si', landmark: '산본신도시·당동·송정' },
  의왕시: { id: 'uiwang', name: '의왕시', slug: 'uiwang', enName: 'Uiwang-si', landmark: '포일·백운밸리·내손·삼동' },
  과천시: { id: 'gwacheon', name: '과천시', slug: 'gwacheon', enName: 'Gwacheon-si', landmark: '원문·별양·중앙·지식정보타운' },
  구리시: { id: 'guri', name: '구리시', slug: 'guri', enName: 'Guri-si', landmark: '갈매신도시·인창·수택·토평' },
  남양주시: { id: 'namyangju', name: '남양주시', slug: 'namyangju', enName: 'Namyangju-si', landmark: '다산신도시·별내·진접·화도' },
  광주시: { id: 'gwangju-gyeo', name: '광주시', slug: 'gwangju-gyeo', enName: 'Gwangju-si', landmark: '태전·태전지구·경안·오포' },
  오산시: { id: 'osan', name: '오산시', slug: 'osan', enName: 'Osan-si', landmark: '세교신도시·원동·오산동' },
  이천시: { id: 'icheon', name: '이천시', slug: 'icheon', enName: 'Icheon-si', landmark: '창전·증포·부발·마장' },
  양주시: { id: 'yangju', name: '양주시', slug: 'yangju', enName: 'Yangju-si', landmark: '옥정신도시·회천·고읍' },
  포천시: { id: 'pocheon', name: '포천시', slug: 'pocheon', enName: 'Pocheon-si', landmark: '소흘·송우·신북·포천' },
  여주시: { id: 'yeoju', name: '여주시', slug: 'yeoju', enName: 'Yeoju-si', landmark: '가남·점동·흥천·여주' },

  // 인천광역시 주요 구
  '인천 연수구': { id: 'incheon-yeonsu', name: '인천 연수구', slug: 'incheon-yeonsu', enName: 'Yeonsu-gu', landmark: '송도국제도시·동춘·옥련' },
  '인천 서구': { id: 'incheon-seogu', name: '인천 서구', slug: 'incheon-seogu', enName: 'Seo-gu', landmark: '청라국제도시·검단신도시·루원시티' },
  '인천 부평구': { id: 'incheon-bupyeong', name: '인천 부평구', slug: 'incheon-bupyeong', enName: 'Bupyeong-gu', landmark: '부평동·삼산·산곡·부개' },
};

// 3. 서비스 URL 정의
export const SERVICE_URL_MAP: { [key: string]: { id: string; title: string; slug: string; shortDesc: string } } = {
  'srv-1': { id: 'srv-1', title: '아파트 외창·베란다 유리', slug: 'apartment', shortDesc: '아파트 베란다 및 거실 창틀 레일 물때 제거' },
  'srv-2': { id: 'srv-2', title: '상가·사무실 유리', slug: 'commercial', shortDesc: '로드샵 매장 쇼윈도 및 오피스 통유리 관리' },
  'srv-3': { id: 'srv-3', title: '빌딩 외벽·고층 작업', slug: 'building', shortDesc: '로프 및 고소작업차 투입 외벽 커튼월 세척' },
  'srv-4': { id: 'srv-4', title: '입주·이사청소 유리', slug: 'move-in', shortDesc: '인테리어 분진, 백시멘트, 도배풀 정밀 박리' },
  'srv-5': { id: 'srv-5', title: '썬팅·스티커 제거', slug: 'tint-removal', shortDesc: '노후 썬팅 필름, 시트지, 접착제 무흠집 박리' },
  'srv-6': { id: 'srv-6', title: '유리 발수 코팅', slug: 'glass-coating', shortDesc: '나노 불소 발수 코팅으로 빗물 자가 세정력 극대화' },
};

// 4. 지역 × 서비스 확장 구조 (Matrix) 생성기
export const generateRegionServiceMatrix = (regions: string[], services: { id: string; title: string }[]): RegionServiceMatrixItem[] => {
  const matrix: RegionServiceMatrixItem[] = [];

  regions.forEach((regionName) => {
    const rInfo = REGION_URL_MAP[regionName] || {
      id: regionName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: regionName,
      slug: regionName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      landmark: `${regionName} 전지역`,
    };

    services.forEach((service) => {
      const sInfo = SERVICE_URL_MAP[service.id] || {
        id: service.id,
        title: service.title,
        slug: service.id,
        shortDesc: service.title,
      };

      const slug = `${rInfo.slug}-${sInfo.slug}`;
      const url = `/region/${rInfo.slug}/service/${sInfo.slug}`;

      // 5. 각 페이지 H1 공식: [{지역}] {서비스명} 전문 - 얼룩 없는 프리미엄 클리닝
      const h1 = `[${regionName}] ${sInfo.title} 전문 | 클리어웍스`;

      // 6. H2 표준 구조 (검색엔진 가독성 최적화)
      const h2List = [
        `1. ${regionName} ${sInfo.title} 시공 특장점 및 공법`,
        `2. ${regionName} 관내 실제 시공 전후(Before & After) 비교`,
        `3. 작업 범위 및 안심 보양 체크리스트`,
        `4. ${regionName} 고객님 실제 작업 후기 및 평점`,
        `5. ${sInfo.title} 투명 가격 안내 및 견적 기준`,
        `6. ${regionName} 출장 가능 동 및 방문 일정`,
        `7. 자주 묻는 질문(FAQ) 및 무료 견적 신청`,
      ];

      // 7. 핵심 검색어 (로컬 검색 의도 반영)
      const targetKeywords = [
        `${regionName} ${sInfo.title}`,
        `${regionName} 유리창청소`,
        `${regionName} 외창청소 업체`,
        `${regionName} ${sInfo.title} 비용`,
        `${regionName} ${sInfo.title} 견적`,
        `${rInfo.landmark} 유리청소`,
      ];

      matrix.push({
        regionId: rInfo.id,
        regionName: rInfo.name,
        serviceId: sInfo.id,
        serviceTitle: sInfo.title,
        slug,
        url,
        h1,
        h2List,
        targetKeywords,
        sampleCaseTitle: `${regionName} 랜드마크 단지 ${sInfo.title} 완벽 복원 사례`,
        leadTime: '당일 접수 후 24시간 내 무료 방문 실측',
        priceEstimate: sInfo.id === 'srv-1' ? '280,000원~' : sInfo.id === 'srv-2' ? '㎡당 3,500원~' : '맞춤 견적',
      });
    });
  });

  return matrix;
};

// 10. 네이버 SEO 기술요건 체크리스트
export const NAVER_SEO_CHECKLIST: NaverSeoRequirement[] = [
  {
    id: 'naver-1',
    category: '웹 표준 및 메타',
    title: '고유 Title 및 Description 태그 매핑',
    status: 'passed',
    description: '모든 페이지마다 고유한 `<title>`(30~50자)과 `<meta name="description">`(80~120자)이 지역명 및 서비스명과 결합되어 동적 생성됩니다.',
    codeSnippet: `<title>[강남구] 아파트 외창·베란다 유리 청소 전문 | 클리어웍스</title>\n<meta name="description" content="강남구 아파트 외창 찌든 물때, 창틀 레일 흑먼지 완벽 제거. 배상책임보험 1억원 가입. 당일 무료 방문 견적." />`,
  },
  {
    id: 'naver-2',
    category: '소셜 메타데이터',
    title: 'OpenGraph (OG) 및 Twitter Card 최적화',
    status: 'passed',
    description: '카카오톡, 네이버 블로그/카페 공유 시 섬네일 이미지와 요약 설명이 누락 없이 자동 출력되도록 og:title, og:description, og:image, og:url을 세팅했습니다.',
    codeSnippet: `<meta property="og:type" content="website" />\n<meta property="og:title" content="클리어웍스 | 프리미엄 유리창 청소 전문" />\n<meta property="og:image" content="https://.../hero.jpg" />`,
  },
  {
    id: 'naver-3',
    category: '구조화 데이터',
    title: 'Schema.org JSON-LD 구조화 데이터 적용',
    status: 'passed',
    description: '네이버 서치어드바이저 및 구글 검색엔진이 업체 정보(LocalBusiness, HomeAndConstructionBusiness, Service, FAQPage)를 즉시 파악할 수 있도록 JSON-LD 스크립트를 주입합니다.',
    codeSnippet: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "HomeAndConstructionBusiness",\n  "name": "클리어웍스",\n  "telephone": "010-8254-1004",\n  "areaServed": "서울특별시, 경기도"\n}\n</script>`,
  },
  {
    id: 'naver-4',
    category: '크롤링 허용',
    title: 'Robots.txt Yeti 및 검색 봇 허용',
    status: 'passed',
    description: '네이버 봇(Yeti), 구글 봇(Googlebot), 다음 봇(Daumoa)의 사이트 수집을 허용하고 sitemap.xml 위치를 명시합니다.',
    codeSnippet: `User-agent: *\nAllow: /\n\nUser-agent: Yeti\nAllow: /\n\nSitemap: https://ais-dev-.../sitemap.xml`,
  },
  {
    id: 'naver-5',
    category: '사이트맵',
    title: 'XML Sitemap (sitemap.xml) 자동 생성',
    status: 'passed',
    description: '메인, 6개 서비스 페이지, 10개 구단위 지역 페이지, 60개 지역×서비스 매트릭스 URL을 표준 XML 규격으로 생성 및 다운로드 제공합니다.',
  },
  {
    id: 'naver-6',
    category: '모바일 친화성',
    title: '모바일 반응형 Viewport 및 고화질 WebP 이미지',
    status: 'passed',
    description: '모바일 친화적 뷰포트(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`) 및 터치 최적화 플로팅 액션 바를 완비했습니다.',
  },
  {
    id: 'naver-7',
    category: '내부 링크',
    title: '빵부스러기(Breadcrumb) 및 연관 페이지 상호 링크',
    status: 'passed',
    description: '지역 페이지에서 해당 지역의 서비스로, 서비스 페이지에서 타 지역으로 자연스럽게 크롤러가 이동할 수 있는 내부 연결망(Internal Mesh)을 구축했습니다.',
  },
];

// XML Sitemap Generator string function
export const generateXmlSitemap = (domain: string, regions: string[], services: { id: string; title: string }[]): string => {
  const baseUrl = domain.replace(/\/$/, '');
  const now = new Date().toISOString().split('T')[0];

  const urls: { loc: string; priority: string; changefreq: string }[] = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
  ];

  // Services
  services.forEach((s) => {
    const sInfo = SERVICE_URL_MAP[s.id];
    const slug = sInfo ? sInfo.slug : s.id;
    urls.push({
      loc: `${baseUrl}/service/${slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    });
  });

  // Regions
  regions.forEach((r) => {
    const rInfo = REGION_URL_MAP[r];
    const slug = rInfo ? rInfo.slug : r;
    urls.push({
      loc: `${baseUrl}/region/${slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    });
  });

  // Region x Service Matrix
  regions.forEach((r) => {
    const rInfo = REGION_URL_MAP[r];
    const rSlug = rInfo ? rInfo.slug : r;
    services.forEach((s) => {
      const sInfo = SERVICE_URL_MAP[s.id];
      const sSlug = sInfo ? sInfo.slug : s.id;
      urls.push({
        loc: `${baseUrl}/region/${rSlug}/service/${sSlug}`,
        priority: '0.7',
        changefreq: 'monthly',
      });
    });
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((u) => {
    xml += `  <url>\n`;
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

// Robots.txt Generator
export const generateRobotsTxt = (domain: string): string => {
  const baseUrl = domain.replace(/\/$/, '');
  return `# Robots.txt for ClearWorks Window Cleaning Service
User-agent: *
Allow: /

# Naver Yeti Bot
User-agent: Yeti
Allow: /

# Googlebot
User-agent: Googlebot
Allow: /

# Daum Daumoa
User-agent: Daumoa
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;
};
