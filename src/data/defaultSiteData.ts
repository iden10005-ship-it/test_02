import { SiteData, RegionDetailItem } from '../types/siteData';

// High quality photography for window cleaning Before & After
export const PRESET_IMAGES = {
  beforeHero: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
  afterHero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',

  aptBefore: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
  aptAfter: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',

  storeBefore: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
  storeAfter: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',

  buildingBefore: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  buildingAfter: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',

  cleaningProcess1: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  cleaningProcess2: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
};

// Initial template matching the user's markdown
export const initialTemplateData: SiteData = {
  theme: 'blue',
  company: {
    name: '클리어웍스',
    region: '[지역]',
    phone: '010-0000-0000',
    kakaoLink: 'https://open.kakao.com',
    representative: '[이름]',
    bizNumber: '000-00-00000',
    address: '[사업장 주소]',
    operatingHours: '평일 08:00~19:00',
    asPeriod: '7',
  },
  hero: {
    badgeText: '프리미엄 윈도우 케어',
    title: '[지역] 유리창청소 전문 클리어웍스',
    subtitle: '아파트 외창부터 상가·빌딩 외벽까지, 얼룩 없이 깔끔하게. 견적은 무료입니다.',
    callButtonText: '전화 상담하기',
    kakaoButtonText: '카톡으로 문의하기',
    beforeAfterNotice: '좌우로 밀어 청소 전후를 비교해보세요. 실제 시공 사진으로 교체할 수 있습니다.',
    beforeImage: PRESET_IMAGES.beforeHero,
    afterImage: PRESET_IMAGES.afterHero,
    beforeLabel: '청소 전 (물때·먼지)',
    afterLabel: '청소 후 (클리어뷰)',
    stats: [
      { id: 'stat-1', value: '[000]건', label: '누적 시공' },
      { id: 'stat-2', value: '[00]년', label: '현장 경력' },
      { id: 'stat-3', value: '보험 가입', label: '배상책임보험' },
      { id: 'stat-4', value: '[0.0]점', label: '고객 만족도' },
    ],
  },
  services: {
    sectionTitle: '[지역] 유리창청소 서비스',
    sectionSubtitle: '건물 종류와 오염 상태에 맞는 방식으로 작업합니다.',
    items: [
      {
        id: 'srv-1',
        title: '아파트 외창·베란다 유리',
        description: '안팎 유리와 창틀, 샷시 레일까지 물때 없이 마무리합니다.',
        iconName: 'Home',
        badge: '가장 많이 찾는 서비스',
        detail: {
          tagline: '탁 트인 조망과 풍부한 채광을 되찾아드리는 아파트 전용 프리미엄 외창 케어',
          targetAudience: '구축/신축 아파트, 주상복합, 빌라 거실 및 베란다 창',
          scopeList: [
            '거실 및 안방/작은방 외창 외부 물때, 흑먼지 완벽 박리',
            '실내 내창 손자국 및 미세먼지 투명 광택 세척',
            '창틀 샷시 하단 레일 찌든 먼지 및 물구멍 흡입 세척',
            '난간대 스테인리스 오염물 및 방충망 외부 먼지 털기',
          ],
          equipment: [
            '독일 웅거(Unger) 프로페셔널 스퀴지 및 극세사 슬리브',
            '외창 전용 안전 마그네틱 자성 윈도우 와이퍼',
            '실내 바닥 보호용 전면 흡수 보양 매트 시공',
            '유리 표면 손상 없는 생분해성 친환경 폼 세정제',
          ],
          duration: '30평형대 기준 약 2시간 30분 ~ 3시간 30분 소요',
          priceGuide: '20평형대 240,000원~ / 30평형대 280,000원~ (창문 수량별 상이)',
          beforeImage: PRESET_IMAGES.aptBefore,
          afterImage: PRESET_IMAGES.aptAfter,
          faqList: [
            {
              q: '작업 중에 아래층으로 오염수가 떨어지거나 민원이 생기지 않나요?',
              a: '클리어웍스는 물을 고압으로 뿌리지 않고, 유리 전용 고밀도 거품 도포 후 스퀴지로 즉시 흡수·회수하는 특수 공법을 사용하여 아래층 세대에 물 떨어짐 피해가 전혀 없습니다.',
            },
            {
              q: '비확장형 아파트나 이중창도 모두 작업 가능한가요?',
              a: '네, 이중창 사이 공간 및 난간대 틈새까지 전용 특수툴을 사용하여 안팎 유리를 모두 말끔하게 케어해 드립니다.',
            },
          ],
        },
      },
      {
        id: 'srv-2',
        title: '상가·사무실 유리',
        description: '영업 시간을 피해 일정을 잡고, 출입문과 통유리까지 함께 청소합니다.',
        iconName: 'Store',
        badge: '정기관리 추천',
        detail: {
          tagline: '매장과 회사의 첫인상을 밝고 쾌적하게 바꾸는 상업공간 윈도우 케어',
          targetAudience: '카페, 음식점, 의류 매장, 1층 로드샵, 오피스 빌딩 사무실',
          scopeList: [
            '매장 전면 대형 통유리 안팎 투명 복원 세척',
            '출입문 강화유리 손자국, 테이프 자국 및 유분막 제거',
            '쇼윈도 상단 프레임 및 거미줄, 먼지 제거',
            '정기 관리(월 1~2회) 시 추가 할인 혜택 제공',
          ],
          equipment: [
            '롱 카본 연장 폴대 시스템 (최대 6m 사다리 없이 안전 작업)',
            '기름때 및 유분막 분해 전용 알칼리 세정 시스템',
            '고무 패킹 및 스테인리스 프레임 전용 중성 광택제',
          ],
          duration: '1층 15평 매장 기준 약 1시간 ~ 1시간 30분',
          priceGuide: '유리 면적 1㎡당 기준 산출 (정기 방문 계약 시 20~30% 할인)',
          beforeImage: PRESET_IMAGES.storeBefore,
          afterImage: PRESET_IMAGES.storeAfter,
          faqList: [
            {
              q: '영업 시간 전이나 마감 후 이른 아침/야간 작업이 가능한가요?',
              a: '고객 방문에 방해되지 않도록 오픈 전 이른 아침이나 마감 후 심야 시간대 맞춤 일정 조율이 가능합니다.',
            },
          ],
        },
      },
      {
        id: 'srv-3',
        title: '빌딩 외벽·고층 작업',
        description: '안전 장비와 보험을 갖춘 인력이 건물 구조에 맞춰 작업합니다.',
        iconName: 'Building2',
        badge: '로프/스카이 전문',
        detail: {
          tagline: '건물 가치를 높이는 고층 빌딩 및 외벽 유리창 전문 특수 시공',
          targetAudience: '중대형 빌딩, 사옥, 호텔, 병원, 관공서, 외벽 유리 건물',
          scopeList: [
            '로프 작업(자일) 및 고소작업차(스카이차) 투입 시공',
            '외벽 판넬, 커튼월 유리 및 알루미늄 복합판넬 물때 제거',
            '외벽 석회질 및 빗물 자국 특수 화학 세척',
            '작업 전 안전 펜스 및 신호수 배치 안전 통제',
          ],
          equipment: [
            '산업안전보건공단 인증 하네스 및 이중 안전 로프',
            '친환경 중성 외벽 약품 및 고압 온수 세척기',
            '1억원 영업배상책임보험 가입 인력 투입',
          ],
          duration: '빌딩 규모에 따라 1일 ~ 3일 소요 (사전 실측 진행)',
          priceGuide: '현장 무료 방문 실측 후 건물 층수 및 구조별 맞춤 견적서 발송',
          beforeImage: PRESET_IMAGES.buildingBefore,
          afterImage: PRESET_IMAGES.buildingAfter,
          faqList: [
            {
              q: '작업 중 발생할 수 있는 사고에 대비한 보험이 가입되어 있나요?',
              a: '클리어웍스의 모든 고소 작업 인원은 배상책임보험 및 산재보험에 100% 가입되어 있어 건물 관리자분께서 안심하고 맡기실 수 있습니다.',
            },
          ],
        },
      },
      {
        id: 'srv-4',
        title: '입주·이사청소 유리',
        description: '입주 전 찌든 때와 공사 후 오염을 제거해 새집처럼 맑게 만듭니다.',
        iconName: 'Sparkles',
        detail: {
          tagline: '인테리어 공사 후 분진과 시멘트 자국을 말끔히 없애는 입주 전 필수 케어',
          targetAudience: '신규 아파트 입주 예정자, 인테리어 리모델링 완료 세대, 이사 전 세대',
          scopeList: [
            '공사 후 유리창에 튄 도배풀, 페인트 방울, 백시멘트 정밀 스크래핑',
            '창틀 및 실리콘 틈새 미세 인테리어 석고 분진 집진',
            '보호 필름 잔여물 및 접착제 흔적 무흠집 제거',
          ],
          equipment: [
            '스테인리스 정밀 유리 스크레이퍼 (유리 스크래치 방지 칼날)',
            '초미세 분진 제거용 헤파필터 청소기',
          ],
          duration: '30평형 아파트 기준 2~3시간 소요',
          priceGuide: '아파트 평형별 기준 단가 적용 (입주청소 전/후 병행 가능)',
          beforeImage: PRESET_IMAGES.aptBefore,
          afterImage: PRESET_IMAGES.aptAfter,
        },
      },
      {
        id: 'srv-5',
        title: '썬팅·스티커 제거',
        description: '접착 자국이 남지 않도록 유리 손상 없이 제거합니다.',
        iconName: 'Layers',
        detail: {
          tagline: '오래된 썬팅 필름, 시트지, 홍보 스티커를 유리 손상 없이 원상복구',
          targetAudience: '상가 임대 만료 원상복구, 노후 썬팅 필름 들뜸 세대, 시트지 교체 매장',
          scopeList: [
            '자외선에 삭아 바스러지는 노후 썬팅 필름 고열 스팀 박리',
            '끈적이는 아크릴 본드 및 잔여물 화학 반응 분해',
            '유리 표면 스크래치 없는 최종 폴리싱 광택 마무리',
          ],
          equipment: [
            '산업용 초고온 스팀 해체기',
            '친환경 비독성 스티커 본드 리무버',
          ],
          duration: '유리 면적 10㎡ 기준 약 1~2시간',
          priceGuide: '제거 면적(㎡) 및 본드 경화 상태에 따른 차등 산출',
          beforeImage: PRESET_IMAGES.storeBefore,
          afterImage: PRESET_IMAGES.storeAfter,
        },
      },
      {
        id: 'srv-6',
        title: '유리 발수 코팅',
        description: '빗물과 먼지가 덜 달라붙어 청소 주기를 늘려줍니다.',
        iconName: 'ShieldCheck',
        badge: '지속력 극대화',
        detail: {
          tagline: '오염물 침투를 막고 맑은 투명도를 2배 이상 지속시키는 나노 보호막 코팅',
          targetAudience: '외창 청소 후 깨끗함을 오래 유지하고 싶은 고객, 고속도로/대로변 분진 세대',
          scopeList: [
            '유리 표면 나노 유막 제거 및 탈지 전처리',
            '초발수 나노 코팅제 2회 레이어드 도포 및 버핑',
            '빗물 자가 세정(Self-Cleaning) 효과 형성',
          ],
          equipment: [
            '독일 수입 불소 나노 글래스 코팅제',
            '전용 마이크로 버핑 패드',
          ],
          duration: '외창 청소 후 추가 작업 약 40분 ~ 1시간 소요',
          priceGuide: '외창 청소 서비스와 함께 신청 시 패키지 특가 할인 제공',
          beforeImage: PRESET_IMAGES.aptBefore,
          afterImage: PRESET_IMAGES.aptAfter,
        },
      },
    ],
  },
  process: {
    sectionTitle: '상담부터 마무리까지 4단계',
    sectionSubtitle: '처음 문의하신 날부터 시공 후 점검까지 같은 담당자가 챙깁니다.',
    steps: [
      {
        step: 1,
        title: '전화·카톡 상담',
        description: '건물 종류, 창문 수, 희망 일정을 알려주세요.',
      },
      {
        step: 2,
        title: '무료 견적',
        description: '사진 또는 방문으로 확인 후 금액을 안내합니다.',
      },
      {
        step: 3,
        title: '현장 시공',
        description: '보양 후 작업하고 바닥과 주변도 정리합니다.',
      },
      {
        step: 4,
        title: '점검·A/S',
        description: '고객과 함께 확인하고 아쉬운 부분은 재작업합니다.',
      },
    ],
  },
  cases: {
    sectionTitle: '시공 사례',
    sectionSubtitle: '건물 유형별 실제 청소 전후 결과를 비교해보세요.',
    items: [
      {
        id: 'case-1',
        title: '[지역] 아파트 베란다 확장형 외창 케어',
        specs: '34평형 · 이중창 찌든 오염 스세척',
        category: '아파트',
        beforeImage: PRESET_IMAGES.aptBefore,
        afterImage: PRESET_IMAGES.aptAfter,
        description: '5년 이상 방치된 외창 찌든 때와 창틀 흑먼지 완벽 세척',
      },
      {
        id: 'case-2',
        title: '[지역] 고층 아파트 거실 외창 광택 복원',
        specs: '42평형 · 난간대 오염 및 자성 스퀴지 케어',
        category: '아파트',
        beforeImage: PRESET_IMAGES.aptBefore,
        afterImage: PRESET_IMAGES.aptAfter,
        description: '실내 전용 마그네틱 장비로 아래층 물 떨어짐 없이 투명 복원',
      },
      {
        id: 'case-3',
        title: '[지역] 1층 카페 상가 통유리 정기 세척',
        specs: '1층 25평 매장 · 전면 쇼윈도 유분막 제거',
        category: '상가',
        beforeImage: PRESET_IMAGES.storeBefore,
        afterImage: PRESET_IMAGES.storeAfter,
        description: '오픈 전 손자국 및 테이프 자국 제거 후 나노 발수코팅',
      },
      {
        id: 'case-4',
        title: '[지역] 프랜차이즈 매장 전면 통유리 케어',
        specs: '월 2회 정기 방문 · 출입문 및 유리창 전면',
        category: '상가',
        beforeImage: PRESET_IMAGES.storeBefore,
        afterImage: PRESET_IMAGES.storeAfter,
        description: '매장 첫인상을 맑게 바꾸는 쇼윈도 먼지 및 유분막 분해 세척',
      },
      {
        id: 'case-5',
        title: '[지역] 5층 중소형 빌딩 외창 복원 청소',
        specs: '5층 건물 전면 · 고소 외창 세척',
        category: '빌딩',
        beforeImage: PRESET_IMAGES.buildingBefore,
        afterImage: PRESET_IMAGES.buildingAfter,
        description: '고소 로프 및 카본 연장 폴대 작업으로 외부 유리창 전체 복원 세척',
      },
      {
        id: 'case-6',
        title: '[지역] 오피스 타워 전면 커튼월 케어',
        specs: '10층 빌딩 · 외벽 유리창 불소 코팅',
        category: '빌딩',
        beforeImage: PRESET_IMAGES.buildingBefore,
        afterImage: PRESET_IMAGES.buildingAfter,
        description: '특수 케미컬 분해 및 불소 발수 코팅으로 장기 자가 세정 유지',
      },
    ],
  },
  gallery: {
    sectionTitle: '작업 갤러리 & 현장 일지',
    sectionSubtitle: '클리어웍스가 직접 다녀온 생생한 현장 스토리와 청소 노하우를 확인하세요.',
    posts: [
      {
        id: 'post-1',
        title: '대치동 아파트 45평 거실 외창 찌든 물때 박리 & 발수 코팅 시공',
        category: '아파트',
        region: '서울 강남구',
        date: '2026.03.10',
        author: '클리어웍스 대표 마스터',
        excerpt: '입주 후 6년간 한 번도 청소하지 않아 뿌옇게 바랜 베란다 확장형 거실 외창을 자성 스퀴지 공법으로 신축 아파트 유리처럼 맑게 복원했습니다.',
        coverImage: PRESET_IMAGES.aptAfter,
        beforeImage: PRESET_IMAGES.aptBefore,
        afterImage: PRESET_IMAGES.aptAfter,
        tags: ['아파트외창', '대치동유리창청소', '강남구외창', '발수코팅', '자성와이퍼'],
        equipmentUsed: ['독일 Unger 윈도우 스퀴지', '실내 전용 마그네틱 와이퍼', '친환경 불소 발수코팅제'],
        keyPoints: [
          '아랫집 물 떨어짐 민원 방지를 위한 3중 보양 및 흡수 매트 설치',
          '유리 표면 석회질 물때 전용 친환경 폼 세정제 도포',
          '난간대 스테인리스 오염물 정밀 마감',
        ],
        content: `안녕하세요, 프리미엄 유리창 케어 전문 클리어웍스입니다!

오늘 소개해드릴 현장은 서울 강남구 대치동에 위치한 45평형 아파트입니다. 
고객님께서는 "거실 창밖으로 바깥 풍경이 마치 안개 낀 것처럼 뿌옇게 보여서 답답하다"며 무료 견적 상담을 요청해 주셨습니다.

■ 현장 오염 상태 진단
현장에 도착해보니 약 6년 이상 외부 비바람과 산성비, 미세먼지가 누적되어 시멘트 물때와 석회질 오염막이 강하게 고착된 상태였습니다. 특히 베란다 확장형 구조라 외부 손길이 닿기 어려운 고층 위험 구역이었습니다.

■ 클리어웍스만의 안전 및 정밀 시공 과정
1. **아랫집 물 피해 100% 방지 보양**: 하단 창틀과 거실 마루 바닥에 특수 고밀도 흡수 매트를 시공하여 유기 오염수 낙수를 완전히 차단했습니다.
2. **독일제 친환경 약품 반응**: 유리 표면에 스크래치를 내지 않는 생분해성 폼 약품을 도포하여 오염막을 부드럽게 녹여냈습니다.
3. **자성 스퀴지 & 2차 나노 발수코팅**: 실내 안전 구역에서 이중 자석 스퀴지로 외창 안팎을 꼼꼼하게 왕복 세척한 후, 빗물이 바로 흘러내리는 나노 글래스 코팅을 입혔습니다.

■ 시공 후 고객 만족도
작업 후 창문을 모두 닫은 상태에서도 마치 창문이 없는 것처럼 투명한 조망권이 확보되었습니다! 고객님께서도 "이렇게 맑아질 줄 알았으면 진작 청소할 걸 그랬다"며 매우 기뻐하셨습니다.`,
      },
      {
        id: 'post-2',
        title: '광교 카페거리 전면 통유리 매장 손자국 & 기름때 분해 정기 케어',
        category: '상가',
        region: '경기 수원 영통구',
        date: '2026.03.05',
        author: '클리어웍스 현장팀',
        excerpt: '매장 오픈 전 이른 아침 시간을 활용해 출입문 통유리와 쇼윈도 프레임 찌든 기름때를 투명 광택 복원했습니다.',
        coverImage: PRESET_IMAGES.storeAfter,
        beforeImage: PRESET_IMAGES.storeBefore,
        afterImage: PRESET_IMAGES.storeAfter,
        tags: ['상가통유리', '광교카페거리', '매장유리창', '수원유리창청소', '정기관리'],
        equipmentUsed: ['카본 롱 폴대 시스템', '상업용 유분막 분해 세정제', '프레임 광택 클리너'],
        keyPoints: [
          '영업 시간에 지장을 주지 않는 이른 아침 맞춤 시공',
          '출입문 강화유리 테이프 자국 및 유분막 완전 분해',
          '쇼윈도 상단 프레임 거미줄 및 먼지 제거',
        ],
        content: `안녕하세요! 매장의 첫인상을 밝혀드리는 클리어웍스입니다.

이번 현장은 경기 수원시 영통구 광교 카페거리에 위치한 디저트 카페입니다.
카페 전면 통유리에 손자국과 로드숍 특유의 자동차 매연/유분 오염이 쌓여 매장 내부가 다소 어둡게 보이던 상태였습니다.

■ 상가 통유리 특화 작업 노하우
상가 유리는 손님들의 손자국과 스티커 잔여물, 매연 기름때가 복합적으로 얽혀 있습니다. 일반 물걸레로 닦으면 오히려 기름 띠가 번질 수 있기 때문에 유분 분해 전용 중성 세정과 고무 스퀴지 공법이 필수입니다.

■ 작업 결과
약 1시간 30분 만에 1층 쇼윈도 전면과 출입문이 맑고 투명하게 정돈되었습니다. 카페 사장님과 월 2회 정기관리 계약까지 체결하며 보람차게 마무리했습니다!`,
      },
      {
        id: 'post-3',
        title: '정자동 7층 빌딩 고소 로프 작업 & 커튼월 외부 유리창 세척',
        category: '빌딩',
        region: '경기 성남 분당구',
        date: '2026.02.24',
        author: '클리어웍스 고소케어팀',
        excerpt: '전문 안전 자격을 갖춘 로프 시공팀이 투입되어 7층 상가 빌딩 전면 커튼월 유리창을 완벽 복원 세척했습니다.',
        coverImage: PRESET_IMAGES.buildingAfter,
        beforeImage: PRESET_IMAGES.buildingBefore,
        afterImage: PRESET_IMAGES.buildingAfter,
        tags: ['빌딩외벽청소', '분당유리창청소', '고소로프작업', '커튼월청소', '배상책임보험'],
        equipmentUsed: ['고소 로프 안전 장구', '특수 세정 약품', '중성 유막 제거제'],
        keyPoints: [
          '안전요원 배치 및 보행자 통제선 설치',
          '현대해상 1억원 배상책임보험 가입 안전 시공',
          '알루미늄 실리콘 코킹 부위 손상 없는 정밀 워싱',
        ],
        content: `안녕하십니까, 고소 작업 전문 클리어웍스입니다.

경기 성남시 분당구 정자동의 7층 빌딩 입주자 대표님께서 건물 외관 개선을 위해 전면 유리창 세척을 의뢰해 주셨습니다.

■ 고소 로프 시공 안전 수칙
1. 작업 시작 전 구역 내 보행자 통제 라인 설치 및 하부 안전요원 상주
2. 로프 및 카라비너 double-check 점검
3. 외벽 실리콘 패킹 오염물 정밀 도포 후 스퀴지 회수

빌딩 외부 유리가 맑아지자 건물 전체의 가치가 상승한 듯 깔끔한 외관을 되찾았습니다.`,
      },
      {
        id: 'post-4',
        title: '상암동 상가 전면 간판 & 천막 어닝 묵은 때 세척 & 통유리 케어',
        category: '간판,어닝청소',
        region: '서울 마포구',
        date: '2026.02.15',
        author: '클리어웍스 마스터',
        excerpt: '매장 외관의 핵심인 1층 전면 간판 이물질과 천막 어닝 묵은 때를 전용 약품과 고압 폼 세척으로 투명 복원했습니다.',
        coverImage: PRESET_IMAGES.storeAfter,
        beforeImage: PRESET_IMAGES.storeBefore,
        afterImage: PRESET_IMAGES.storeAfter,
        tags: ['간판청소', '어닝청소', '마포구유리창청소', '상암동상가', '매장외관케어'],
        equipmentUsed: ['고압 폼 세척 시스템', '어닝 전용 중성 세정제', '카본 롱 폴대'],
        keyPoints: [
          '간판 전기 배선 우수 방수 세척',
          '천막 어닝 원단 손상 없는 폼 도포 불림 세척',
          '하단 쇼윈도 통유리 2차 스퀴지 마감',
        ],
        content: `안녕하세요, 매장 외관 간판 및 어닝 세척 전문 클리어웍스입니다.

서울 마포구 상암동 1층 매장에서 찌든 먼지가 누적된 플렉스 간판과 천막 어닝 세척을 문의해 주셨습니다.

■ 간판 & 어닝 세척 공법
간판 내부 전기 배선에 침수가 없도록 안전 조치 후, 어닝 원단을 손상시키지 않는 전용 중성 폼을 분사해 찌든 때를 녹여내고 깔끔하게 헹궈냈습니다!`,
      },
      {
        id: 'post-5',
        title: '신봉동 아파트 34평 베란다 창틀 레일 찌든 때 & 외창 투명 복원',
        category: '아파트',
        region: '경기 용인 수지구',
        date: '2026.02.08',
        author: '클리어웍스 마스터',
        excerpt: '창틀 하단 레일에 굳어버린 검은 먼지와 베란다 외창 물때를 전용 수해 장비와 스퀴지로 말끔히 세척했습니다.',
        coverImage: PRESET_IMAGES.aptAfter,
        beforeImage: PRESET_IMAGES.aptBefore,
        afterImage: PRESET_IMAGES.aptAfter,
        tags: ['아파트외창', '용인유리창청소', '수지구외창', '창틀청소', '베란다유리'],
        equipmentUsed: ['창틀 틈새 석소 흡입기', '자성 와이퍼 스퀴지', '친환경 유막 분해제'],
        keyPoints: [
          '창틀 하단 샷시 레일 찌든 먼지 100% 흡입 세척',
          '실내 안전 자성 와이퍼로 고층 외창 케어',
          '작업 완료 후 주변 마루 및 베란다 청결 정리',
        ],
        content: `안녕하세요! 용인 수지구 유리창 청소 전문 클리어웍스입니다.

경기 용인시 수지구 신봉동의 34평형 아파트 현장입니다. 고객님께서는 창문 유리뿐만 아니라 창틀 아래 묵은 흑먼지와 물때가 함께 찌들어 고민이 많으셨습니다.

■ 창틀 & 외창 동시 복원 세척
유리창 외부 물때를 폼 약품으로 녹여낸 뒤 자성 와이퍼로 투명하게 마감하고, 창틀 레일 사이 좁은 구역까지 전용 습식 툴로 묵은 먼지를 깨끗하게 닦아냈습니다.
시공 후 창밖 뷰가 시원하게 트여 고객님께서 대만족하셨습니다!`,
      },
      {
        id: 'post-6',
        title: '잠실동 로드숍 1층 통유리 변색 썬팅 시트지 고열 스팀 박리 & 광택',
        category: '시트지제거',
        region: '서울 송파구',
        date: '2026.01.28',
        author: '클리어웍스 특수케어팀',
        excerpt: '오래되어 바스러지던 썬팅 시트지와 본드 잔여물을 고열 스팀 해체 장비로 무흠집 완벽 제거했습니다.',
        coverImage: PRESET_IMAGES.storeAfter,
        beforeImage: PRESET_IMAGES.storeBefore,
        afterImage: PRESET_IMAGES.storeAfter,
        tags: ['상가통유리', '시트지제거', '송파구유리창청소', '잠실동상가', '원상복구'],
        equipmentUsed: ['초고온 산업용 스팀 해체기', '본드 전용 리무버', '프로 스퀴지'],
        keyPoints: [
          '고열 스팀 연화 공법으로 유리 스크래치 방지',
          '화학 리무버 반응으로 끈적이는 아크릴 본드 박리',
          '최종 중성 광택 세척으로 투명도 완성',
        ],
        content: `안녕하세요, 상가 원상복구 및 스티커 제거 전문 클리어웍스입니다.

서울 송파구 잠실동 1층 매장에서 변색되고 들뜬 오래된 썬팅 필름 박리 작업을 진행했습니다.

■ 노후 필름 및 본드 박리 노하우
그냥 손으로 떼어내면 필름이 바스러지거나 본드가 유리에 끈적하게 남습니다. 클리어웍스는 고온 스팀으로 필름을 연화시킨 후, 본드 리무버로 미세 잔여물까지 칼날 손상 없이 투명하게 제거합니다!`,
      },
    ],
  },
  pricing: {
    sectionTitle: '가격 안내',
    sectionSubtitle: '기준 가격이며, 현장 상태에 따라 달라질 수 있습니다.',
    footerNote: '사진을 보내주시면 빠르게 견적을 드립니다.',
    rows: [
      {
        id: 'price-1',
        category: '아파트 외창',
        standard: '[00]평형 (24평~34평 기준)',
        price: '[00,000]원~',
        highlight: true,
      },
      {
        id: 'price-2',
        category: '상가·사무실 유리',
        standard: '유리 면적(㎡)당',
        price: '[0,000]원~',
      },
      {
        id: 'price-3',
        category: '빌딩 외벽',
        standard: '현장 확인 후 견적 (로프/스카이)',
        price: '별도 문의',
      },
      {
        id: 'price-4',
        category: '썬팅·스티커 제거',
        standard: '면적(㎡)당',
        price: '[0,000]원~',
      },
    ],
  },
  reviews: {
    sectionTitle: '고객 후기',
    sectionSubtitle: '실제 후기로 교체해 주세요.',
    items: [
      {
        id: 'rev-1',
        content: '뿌옇던 거실 창문이 완전히 투명해져서 한강 뷰가 선명하게 살아났습니다! 작업도 꼼꼼하고 뒷마무리까지 깔끔하셔서 너무 만족스럽습니다.',
        author: '[지역] 고객님',
        rating: 5,
        tag: '34평 아파트 외창',
      },
      {
        id: 'rev-2',
        content: '매장 통유리에 스티커 자국이랑 기름때가 심했는데 흔적도 없이 지워주셨어요. 손님들도 매장이 훨씬 환해졌다고 좋아하십니다.',
        author: '[지역] 고객님',
        rating: 5,
        tag: '카페 1층 전면유리',
      },
      {
        id: 'rev-3',
        content: '견적 상담부터 친절하셨고 약속 시간도 칼같이 지켜주셨어요. 배상책임보험도 가입되어 있어 안심하고 맡길 수 있었습니다.',
        author: '[지역] 고객님',
        rating: 5,
        tag: '입주 전 외창 청소',
      },
    ],
  },
  faq: {
    sectionTitle: '자주 묻는 질문',
    sectionSubtitle: '궁금한 점은 전화나 카톡으로 편하게 물어보세요.',
    items: [
      {
        id: 'faq-1',
        question: '비용은 어떻게 정해지나요?',
        answer: '창문 개수와 면적, 오염 정도, 작업 높이를 기준으로 현장 확인 후 견적을 드립니다. 사진 견적도 가능합니다.',
      },
      {
        id: 'faq-2',
        question: '작업 시간은 얼마나 걸리나요?',
        answer: '일반 아파트 외창은 보통 2~4시간, 상가와 빌딩은 규모에 따라 반나절에서 며칠까지 걸립니다.',
      },
      {
        id: 'faq-3',
        question: '고층이나 외벽 작업도 가능한가요?',
        answer: '가능합니다. 안전 장비와 보험을 갖추고 작업하며, 건물 구조에 맞는 방식으로 진행합니다.',
      },
      {
        id: 'faq-4',
        question: '비 오는 날에는 어떻게 하나요?',
        answer: '안전과 품질을 위해 우천 시에는 일정을 조율해 다른 날짜로 변경합니다.',
      },
      {
        id: 'faq-5',
        question: '찌든 물때도 제거되나요?',
        answer: '대부분 제거되지만 유리 표면이 부식된 경우에는 완전 제거가 어려울 수 있어 사전에 안내해 드립니다.',
      },
      {
        id: 'faq-6',
        question: '예약은 어떻게 하나요?',
        answer: '전화나 카톡으로 문의하시면 가능한 날짜를 안내해 드립니다. 성수기에는 일주일 전 예약을 권장합니다.',
      },
      {
        id: 'faq-7',
        question: '작업 중 파손되면 어떻게 되나요?',
        answer: '배상책임보험에 가입되어 있어 작업 중 발생한 손해는 보상해 드립니다.',
      },
      {
        id: 'faq-8',
        question: '작업 후 A/S가 되나요?',
        answer: '시공 후 점검에서 아쉬운 부분이 있으면 바로 재작업합니다. 7일 이내 문의해 주세요.',
      },
    ],
  },
  regions: {
    sectionTitle: '서비스 지역',
    sectionSubtitle: '서울시 25개 자치구 전역 및 수도권 주요 도시 무료 출장 견적 서비스를 제공합니다.',
    list: [
      // 서울특별시 25개 자치구 전역
      '강남구', '강동구', '강북구', '강서구', '관악구',
      '광진구', '구로구', '금천구', '노원구', '도봉구',
      '동대문구', '동작구', '마포구', '서대문구', '서초구',
      '성동구', '성북구', '송파구', '양천구', '영등포구',
      '용산구', '은평구', '종로구', '중구', '중랑구',

      // 경기도 주요 시 및 구 단위 전역
      '수원시', '수원 영통구', '수원 권선구', '수원 장안구', '수원 팔달구',
      '성남시', '성남 분당구', '성남 수정구', '성남 중원구',
      '고양시', '고양 일산동구', '고양 일산서구', '고양 덕양구',
      '용인시', '용인 수지구', '용인 기흥구', '용인 처인구',
      '부천시', '부천 원미구', '부천 소사구', '부천 오정구',
      '안산시', '안산 단원구', '안산 상록구',
      '안양시', '안양 동안구', '안양 만안구',
      '남양주시', '화성시', '평택시', '의정부시', '시흥시',
      '파주시', '김포시', '광명시', '광주시', '군포시',
      '오산시', '이천시', '양주시', '안성시', '구리시',
      '의왕시', '하남시', '포천시', '여주시', '과천시',
      '양평군', '가평군', '연천군',

      // 인천광역시 주요 구
      '인천 연수구', '인천 서구', '인천 부평구',
    ],
    details: {
      강남구: {
        name: '강남구',
        subDistricts: ['역삼동', '개포동', '청담동', '삼성동', '대치동', '신사동', '압구정동', '논현동', '도곡동', '일원동', '수서동', '세곡동', '자곡동'],
        description: '테헤란로 상업 오피스 및 대단지 고층 아파트 맞춤 유리창 클리닝',
        leadTime: '접수 당일 또는 익일 100% 방문 실측 가능',
        popularComplexes: ['디에이치 아너힐즈', '래미안 대치팰리스', '은마아파트', '도곡렉슬', '압구정 현대'],
        notice: '아파트 외창 공동구매 시 15% 추가 할인 적용',
      },
      서초구: {
        name: '서초구',
        subDistricts: ['반포동', '잠원동', '서초동', '방배동', '양재동', '내곡동', '우면동', '원지동'],
        description: '한강변 랜드마크 아파트 및 대형 상가 쇼윈도 집중 케어',
        leadTime: '상담 후 24시간 내 견적 산출 및 방문 일정 확정',
        popularComplexes: ['아크로리버파크', '래미안 원베일리', '반포 자이', '서초 그랑자이', '방배 그랑자이'],
        notice: '초고층 파노라마 뷰 세대 전문 스퀴지 장비 투입',
      },
      송파구: {
        name: '송파구',
        subDistricts: ['잠실동', '가락동', '문정동', '방이동', '오금동', '송파동', '신천동', '장지동', '풍납동', '마천동', '거여동'],
        description: '잠실 대단지 엘리트(엘스·리센츠·트리지움) 및 헬리오시티 전담팀 운영',
        leadTime: '평일/주말 맞춤 신속 출장 케어',
        popularComplexes: ['잠실 엘스', '리센츠', '트리지움', '헬리오시티', '파크리오', '올림픽선수기자촌'],
        notice: '입주 전 외창 및 발수코팅 패키지 인기 진행 중',
      },
      강동구: {
        name: '강동구',
        subDistricts: ['고덕동', '둔촌동', '명일동', '상일동', '암사동', '천호동', '길동', '강일동', '성내동'],
        description: '고덕·둔촌 대단지 신축 아파트 특화 입주 외창 및 고소 유리창 클리닝',
        leadTime: '접수 후 익일 방문 가능',
        popularComplexes: ['올림픽파크포레온', '고덕 그라시움', '고덕 아르테온', '래미안 명일역 솔베뉴'],
        notice: '신축 단지 입주 세대 공동구매 할인 혜택',
      },
      영등포구: {
        name: '영등포구',
        subDistricts: ['여의도동', '당산동', '문래동', '영등포동', '신길동', '양평동', '대림동', '도림동'],
        description: '여의도 금융 오피스 빌딩 및 신길·당산 대단지 주상복합 외창 전문',
        leadTime: '24시간 내 신속 방문 및 야간/주말 작업 조율 가능',
        popularComplexes: ['아크로타워 스퀘어', '여의도 시범아파트', '브라이튼 여의도', '신길 래미안에스티움'],
        notice: '여의도 오피스 정기 관리 계약 시 첫 달 20% 할인',
      },
      양천구: {
        name: '양천구',
        subDistricts: ['목동', '신정동', '신월동'],
        description: '목동 신시가지 대단지 아파트 및 학원가 상가 유리창 집중 관리',
        leadTime: '목동 전담팀 매일 상시 출장 순회 중',
        popularComplexes: ['목동 신시가지 1~14단지', '목동 힐스테이트', '목동 센트럴 아이파크위브', '목동 트라팰리스'],
        notice: '목동 신시가지 샷시 노후 외창 복원 특화 시공',
      },
      동작구: {
        name: '동작구',
        subDistricts: ['흑석동', '노량진동', '상도동', '사당동', '대방동', '신대방동', '본동'],
        description: '흑석 뉴타운 한강 조망 아파트 및 상도·사당 주거단지 외창 케어',
        leadTime: '상담 당일 전화/카톡 사진 즉시 견적 발송',
        popularComplexes: ['아크로 리버하임', '흑석 한강 센트레빌', '상도 자이헤리티지', '래미안 이수역 로이파크'],
        notice: '한강 조망권 흑석동 단지 초발수 코팅 무상 업그레이드',
      },
      관악구: {
        name: '관악구',
        subDistricts: ['봉천동', '신림동', '남현동', '보라매동', '행운동', '낙성대동'],
        description: '관악산 숲세권 꽃가루 분진 제거 및 서울대입구 상권 쇼윈도 청소',
        leadTime: '평일 및 주말 예약 순차 배정',
        popularComplexes: ['e편한세상 서울대입구', '관악 드림타운', '봉천 두산아파트', '관악 파크푸르지오'],
        notice: '숲세권 송화가루 및 수목 진액 고착 유막 분해 특화',
      },
      강서구: {
        name: '강서구',
        subDistricts: ['마곡동', '화곡동', '염창동', '가양동', '방화동', '등촌동', '공항동'],
        description: '마곡 R&D 지구 기업 사옥 통유리 및 마곡·염창 대단지 외창 청소',
        leadTime: '마곡 전담팀 상주로 당일 방문 상담 가능',
        popularComplexes: ['마곡 엠밸리 1~15단지', '마곡 힐스테이트', '염창동 롯데캐슬', '우장산 아이파크e편한세상'],
        notice: '마곡 연구단지 기업체 정기 관리 세금계산서 100% 발행',
      },
      구로구: {
        name: '구로구',
        subDistricts: ['신도림동', '구로동', '개봉동', '고척동', '오류동', '궁동', '온수동', '항동'],
        description: '신도림 역세권 주상복합 및 구로디지털단지 지식산업센터 통유리 관리',
        leadTime: '접수 후 1~2일 내 신속 일정 확정',
        popularComplexes: ['신도림 디큐브시티', '신도림 대림e편한세상', '고척 파크푸르지오', '항동 하버라인'],
        notice: '지식산업센터 및 오피스 유리 주말 무소음 시공',
      },
      금천구: {
        name: '금천구',
        subDistricts: ['가산동', '독산동', '시흥동'],
        description: '가산디지털단지 IT 타워 통유리 및 독산 롯데캐슬 대단지 집중 클리닝',
        leadTime: '평일·주말 맞춤 신속 견적 안내',
        popularComplexes: ['롯데캐슬 골드파크 1~3차', '가산 두산위브', '시흥 벽산아파트'],
        notice: '대단지 공동구매 접수 시 세대당 할인 혜택',
      },
      마포구: {
        name: '마포구',
        subDistricts: ['공덕동', '아현동', '상암동', '도화동', '용강동', '대흥동', '염리동', '신수동', '서교동', '합정동', '망원동', '연남동', '성산동'],
        description: '상암 DMC 미디어 사옥 및 마래푸(마포래미안푸르지오) 대단지 전문 케어',
        leadTime: '평일/주말 맞춤 출장 및 상암/공덕 상시 방문',
        popularComplexes: ['마포 래미안 푸르지오', '신촌 그랑자이', '마포 프레스티지 자이', '공덕 자이'],
        notice: '한강변 조망 아파트 외창 발수코팅 패키지 인기',
      },
      용산구: {
        name: '용산구',
        subDistricts: ['한남동', '이촌동', '한강로동', '이태원동', '보광동', '서빙고동', '원효로동', '효창동', '청파동', '후암동'],
        description: '한남동·이촌동 초고층 한강 파노라마뷰 및 고급 빌라 프라이빗 클리닝',
        leadTime: 'VIP 전담 엔지니어 배정, 철저한 보안 및 안심 시공',
        popularComplexes: ['한남 더힐', '래미안 첼리투스', '용산 센트럴파크 해링턴', '이촌 한강자이'],
        notice: '초고층 파노라마뷰 맞춤 무기스 스퀴지 공법 적용',
      },
      성동구: {
        name: '성동구',
        subDistricts: ['성수동', '옥수동', '금호동', '왕십리동', '행당동', '응봉동', '마장동', '사근동', '송정동', '용답동'],
        description: '성수동 갤러리아포레·트리마제 및 옥수·금호 한강변 대단지 전문 클리닝',
        leadTime: '접수 후 당일/익일 빠른 스케줄 배정',
        popularComplexes: ['트리마제', '아크로 서울포레스트', '갤러리아 포레', '옥수 파크힐스', 'e편한세상 옥수파크힐스'],
        notice: '성수동 핫플 카페·매장 쇼윈도 정기 관리 패키지',
      },
      광진구: {
        name: '광진구',
        subDistricts: ['자양동', '구의동', '광장동', '화양동', '군자동', '능동', '중곡동'],
        description: '자양동 한강 조망 주상복합 및 광장동 학군 아파트 외창 특화 케어',
        leadTime: '상담 후 24시간 내 신속 방문 실측',
        popularComplexes: ['광진 트라팰리스', '자양 래미안 프리미어팰리스', '광진 그랜드파크', '광장 현대 3·5단지'],
        notice: '한강변 물때 유막 제거 및 나노 코팅 전문',
      },
      중구: {
        name: '중구',
        subDistricts: ['명동', '을지로동', '회현동', '소공동', '신당동', '황학동', '중림동', '장충동', '필동', '다산동'],
        description: '도심 상업 중심지 빌딩 외벽·쇼윈도 및 신당동 대단지 아파트 케어',
        leadTime: '도심 야간/조기 출장 작업 조율 가능',
        popularComplexes: ['남산타운 아파트', '청계천 두산베어스타워', '남산 롯데캐슬 아이리스', '신당 현대'],
        notice: '상가 쇼윈도 지문·스티커 자국 무손상 원상복구',
      },
      종로구: {
        name: '종로구',
        subDistricts: ['평창동', '부암동', '교남동', '사직동', '삼청동', '혜화동', '무악동', '가회동', '창신동', '숭인동'],
        description: '평창동 타운하우스/단독주택 대형 통유리 및 경희궁자이 아파트 클리닝',
        leadTime: '단독주택·타운하우스 맞춤 방문 실측',
        popularComplexes: ['경희궁 자이 (1~4단지)', '인왕산 아이파크', '평창동 롯데캐슬 로잔', '무악 현대'],
        notice: '대형 통유리 및 고소 테라스창 안전 시공 전문',
      },
      서대문구: {
        name: '서대문구',
        subDistricts: ['북가좌동', '남가좌동', '홍제동', '홍은동', '연희동', '신촌동', '충정로동', '천연동'],
        description: 'DMC 가재울뉴타운 대단지 및 홍제·연희 숲세권 아파트 외창 케어',
        leadTime: '가재울 전담팀 상시 출장 순회 중',
        popularComplexes: ['DMC 래미안 e편한세상', 'DMC 파크뷰자이', 'e편한세상 신촌', '홍제원 현대'],
        notice: '뉴타운 대단지 주민 추천 공동구매 우대',
      },
      은평구: {
        name: '은평구',
        subDistricts: ['진관동', '불광동', '응암동', '녹번동', '대조동', '갈현동', '역촌동', '신사동', '증산동', '수색동'],
        description: '은평뉴타운 북한산 뷰 대단지 및 녹번·수색 신축 아파트 특화',
        leadTime: '상담 후 24시간 내 방문 일정 확정',
        popularComplexes: ['은평뉴타운 제각말·우물골·마고정', '녹번역 e편한세상 캐슬', '힐스테이트 녹번', 'DMC SK뷰'],
        notice: '북한산 숲세권 먼지 및 송화가루 세척 특화',
      },
      동대문구: {
        name: '동대문구',
        subDistricts: ['전농동', '답십리동', '이문동', '휘경동', '청량리동', '용두동', '제기동', '장안동'],
        description: '청량리 초고층 주상복합 및 전농·답십리·이문 뉴타운 대단지 클리닝',
        leadTime: '청량리 및 뉴타운 상시 순회 작업',
        popularComplexes: ['청량리역 롯데캐슬 SKY-L65', '래미안 크레시티', '답십리 래미안위브', '이문 아이파크자이'],
        notice: '초고층 65층 주상복합 전문 자석 장비 투입',
      },
      성북구: {
        name: '성북구',
        subDistricts: ['길음동', '종암동', '돈암동', '정릉동', '성북동', '장위동', '석관동', '안암동', '보문동', '삼선동'],
        description: '길음·장위 뉴타운 대단지 아파트 및 성북동 고급 주택 통유리 관리',
        leadTime: '길음/장위 뉴타운 상시 출장 지원',
        popularComplexes: ['래미안 길음 센터피스', '길음 래미안 트리베라', '꿈의숲 아이파크', '래미안 장위 퍼스트하이'],
        notice: '아파트 외창 + 방충망 먼지 세척 패키지',
      },
      중랑구: {
        name: '중랑구',
        subDistricts: ['면목동', '상봉동', '중화동', '묵동', '망우동', '신내동'],
        description: '상봉 역세권 주상복합 및 신내·면목 주거단지 외창 케어',
        leadTime: '접수 당일 신속 견적 안내',
        popularComplexes: ['사가정 센트럴아이파크', '상봉 프레미어스 엠코', '신내 우디안', '면목 라온프라이빗'],
        notice: '용마산/망우산 자락 결로 물때 전문 복원',
      },
      노원구: {
        name: '노원구',
        subDistricts: ['중계동', '상계동', '하계동', '공릉동', '월계동'],
        description: '중계동 은행사거리 학군지 및 상계·월계 대단지 샷시 외창 전문',
        leadTime: '노원 전담팀 매일 순회 방문',
        popularComplexes: ['중계 건영3차·청구', '상계 주공 1~16단지', '포레나 노원', '월계 센트럴아이파크'],
        notice: '오래된 아파트 하이샤시 레일 찌든때 완벽 스팀 케어',
      },
      도봉구: {
        name: '도봉구',
        subDistricts: ['창동', '쌍문동', '방학동', '도봉동'],
        description: '창동 역세권 개발지구 및 도봉·쌍문 주거단지 유리창 케어',
        leadTime: '신속 방문 및 주말 예약 가능',
        popularComplexes: ['창동 북한산 아이파크', '창동 동아아파트', '쌍문동 북한산 현대', '도봉 한신아파트'],
        notice: '도봉산 조망권 회복을 위한 맑은 유리 복원',
      },
      강북구: {
        name: '강북구',
        subDistricts: ['미아동', '수유동', '번동', '우이동'],
        description: '미아 뉴타운 대단지 및 북한산 우이동 숲세권 빌라/아파트 케어',
        leadTime: '미아뉴타운 상시 출장 대기',
        popularComplexes: ['미아 래미안 트리베라 1·2차', '꿈의숲 효성해링턴', '미아 두산위브', '수유 벽산아파트'],
        notice: '숲세권 송화가루 및 도로 분진 유막 박리 특화',
      },

      // 수도권 주요 핵심 지역
      분당구: {
        name: '분당구',
        subDistricts: ['정자동', '판교동', '백현동', '삼평동', '서현동', '이매동', '야탑동', '구미동', '금곡동', '운중동'],
        description: '판교 IT 밸리 사옥 쇼윈도 및 분당 주상복합 외창 특화 케어',
        leadTime: '경기 남부 전담팀 매일 상시 순회 작업 중',
        popularComplexes: ['판교 푸르지오 그랑블', '정자 파크뷰', '백현마을', '봇들마을', '판교 봇들8단지'],
        notice: '단지별 2세대 이상 동시 예약 시 출장비 면제 및 할인',
      },
      수지구: {
        name: '수지구',
        subDistricts: ['성복동', '신봉동', '죽전동', '동천동', '풍덕천동', '상현동', '고기동'],
        description: '수지 대단지 아파트 및 광교산 인근 숲세권 외창 집중 케어',
        leadTime: '용인 수지 전담팀 주중/주말 상시 출장',
        popularComplexes: ['성복역 롯데캐슬 골드타운', '신봉마을 자이', '동천자이', '죽전 동성아파트'],
        notice: '광교산 꽃가루 및 미세먼지 유막 제거 패키지',
      },
      '수원 영통구': {
        name: '수원 영통구',
        subDistricts: ['원천동', '이의동', '하동', '매탄동', '영통동', '망포동', '신동'],
        description: '광교호수공원 조망 시스템창호 및 삼성전자 배후 주거단지 외창 클리닝',
        leadTime: '광교 전담팀 매일 순회 방문',
        popularComplexes: ['광교 중흥 S-클래스', '광교 자연앤힐스테이트', '광교 아이파크', '힐스테이트 광교'],
        notice: '호수공원 물안개 습기 유막 분해 및 초발수 코팅',
      },
      일산동구: {
        name: '일산동구',
        subDistricts: ['장항동', '마두동', '백석동', '정발산동', '식사동', '풍동', '중산동'],
        description: '일산 호수공원 조망권 및 킨텍스 초고층 시스템창호 특화 케어',
        leadTime: '경기 북부 전담팀 주 4회 이상 순회',
        popularComplexes: ['킨텍스 원시티', '일산 위시티 자이', '백석 요진와이시티', '마두 강촌마을'],
        notice: '서해안 해풍 및 자유로 분진 맞춤 유막 박리',
      },
      하남시: {
        name: '하남시',
        subDistricts: ['망월동', '선동', '풍산동', '미사동', '신장동', '창우동', '학암동(위례)', '감이동(감일)'],
        description: '미사강변도시 한강 조망 및 위례·감일 신도시 대단지 아파트 외창 케어',
        leadTime: '미사/위례 전담팀 주중 매일 출장',
        popularComplexes: ['미사강변 센트럴자이', '미사강변 스타힐스', '위례 포레샤인', '감일 에코앤e편한세상'],
        notice: '미사 한강변 및 신도시 신축 입주 외창 특화',
      },
      '안양 동안구': {
        name: '안양 동안구',
        subDistricts: ['평촌동', '비산동', '관양동', '호계동', '갈산동', '귀인동', '범계동', '달안동', '부흥동'],
        description: '평촌 1기 신도시 대단지 샷시 복원 및 비산·호계 신축 아파트 클리닝',
        leadTime: '안양/과천/의왕 상시 순회 작업',
        popularComplexes: ['평촌 더샵 센트럴시티', '목련마을 두산·우성', '평촌 어바인퍼스트', '비산 삼성래미안'],
        notice: '평촌 노후 샤시 실리콘 보호 저압 중성 스퀴지 공법',
      },
      '인천 연수구': {
        name: '인천 연수구',
        subDistricts: ['송도동', '동춘동', '연수동', '청학동', '옥련동', '선학동'],
        description: '송도국제도시 초고층 커튼월 통창 및 센트럴파크 조망 특화 클리닝',
        leadTime: '송도 전담팀 매일 순회 방문',
        popularComplexes: ['송도 더샵 퍼스트파크', '송도 센트럴파크 푸르지오', '송도 자이더스타', '송도 아트윈푸르지오'],
        notice: '서해 염분 및 강풍 대비 초발수 나노 코팅 필수 적용',
      },
    },
  },
  contactForm: {
    sectionTitle: '무료 견적 신청',
    sectionSubtitle: '남겨주시면 영업시간 내에 연락드립니다.',
    successMessage: '신청이 접수되었습니다. 영업시간 내에 신속히 연락드리겠습니다.',
  },
  inquiries: [
    {
      id: 'inq-demo-1',
      name: '홍길동',
      phone: '010-9876-5432',
      region: '서울 서초구 반포동',
      buildingType: '아파트 외창 (34평)',
      content: '거실과 안방 베란다 외창에 물때가 심해 주말 청소 견적 문의드립니다.',
      createdAt: '2026-11-10 14:20',
      status: '대기중',
    },
  ],
};

// Filled sample for one-click completion
export const completedSampleData: Partial<SiteData> = {
  company: {
    name: '클리어웍스',
    region: '서울·수도권',
    phone: '010-8254-1004',
    kakaoLink: 'https://pf.kakao.com/_example',
    representative: '김맑음',
    bizNumber: '214-88-90123',
    address: '서울특별시 서초구 강남대로 381, 7층',
    operatingHours: '평일 08:00~19:00 (주말 예약제)',
    asPeriod: '7',
  },
  hero: {
    ...initialTemplateData.hero,
    title: '서울·수도권 유리창청소 전문 클리어웍스',
    stats: [
      { id: 'stat-1', value: '3,800+건', label: '누적 시공' },
      { id: 'stat-2', value: '12년', label: '현장 경력' },
      { id: 'stat-3', value: '1억원', label: '배상책임보험 가입' },
      { id: 'stat-4', value: '4.98점', label: '고객 만족도 (5.0 만점)' },
    ],
  },
  pricing: {
    ...initialTemplateData.pricing,
    rows: [
      {
        id: 'price-1',
        category: '아파트 외창',
        standard: '30평형대 기준 (내·외창 전체)',
        price: '280,000원~',
        highlight: true,
      },
      {
        id: 'price-2',
        category: '상가·사무실 유리',
        standard: '바닥 면적 / 유리 1㎡당',
        price: '3,500원~',
      },
      {
        id: 'price-3',
        category: '빌딩 외벽',
        standard: '현장 확인 후 맞춤 견적',
        price: '별도 상담',
      },
      {
        id: 'price-4',
        category: '썬팅·스티커 제거',
        standard: '면적(㎡)당 잔여물 특수제거',
        price: '15,000원~',
      },
    ],
  },
};
