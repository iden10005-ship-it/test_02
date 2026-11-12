import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight,
  Search,
  Calendar,
} from 'lucide-react';
import { CompanyInfo, ServiceItem, RegionDetailItem, InquiryItem, ReviewItem, CaseItem } from '../../types/siteData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { PRESET_IMAGES } from '../../data/defaultSiteData';

interface RegionServiceMatrixPageProps {
  regionName: string;
  regionDetail?: RegionDetailItem;
  service: ServiceItem;
  allRegions: string[];
  allServices: ServiceItem[];
  company: CompanyInfo;
  reviews: ReviewItem[];
  cases: CaseItem[];
  onBack: () => void;
  onNavigateRegion: (regionName: string) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateMatrix: (regionName: string, serviceId: string) => void;
  onSubmitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => void;
}

export const RegionServiceMatrixPage: React.FC<RegionServiceMatrixPageProps> = ({
  regionName,
  regionDetail,
  service,
  allRegions,
  allServices,
  company,
  reviews,
  cases,
  onBack,
  onNavigateRegion,
  onNavigateService,
  onNavigateMatrix,
  onSubmitInquiry,
}) => {
  const detail: RegionDetailItem = regionDetail || {
    name: regionName,
    subDistricts: [`${regionName} 1동`, `${regionName} 2동`, '중심 상권', '아파트 밀집 구역'],
    description: `${regionName} 전지역 유리창 전문 신속 출장`,
    leadTime: '접수 후 24시간 이내 방문 견적 가능',
    popularComplexes: [`${regionName} 랜드마크 아파트`],
    notice: '2세대 이상 동시 신청 시 추가 할인 적용',
  };

  const targetKeywords = [
    `${regionName} ${service.title}`,
    `${regionName} 유리창청소`,
    `${regionName} 외창청소 업체`,
    `${regionName} ${service.title} 비용`,
    `${regionName} 유리청소 견적`,
  ];

  // Other services in this region
  const otherServicesInRegion = allServices.filter((s) => s.id !== service.id);
  // Other regions for this service
  const otherRegionsForService = allRegions.filter((r) => r !== regionName);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* 1. Internal Link: Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈페이지로 돌아가기</span>
          </button>

          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1.5 font-medium">
            <span className="cursor-pointer hover:underline" onClick={onBack}>홈</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline" onClick={() => onNavigateRegion(regionName)}>
              {regionName}
            </span>
            <span>/</span>
            <span className="font-bold text-blue-600">{service.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* 5. Semantic H1 Header */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            {/* SEO Tag badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {regionName} 전담 출장팀
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                배상책임보험 가입
              </span>
            </div>

            {/* H1 element */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              [{regionName}] {service.title} 전문 클리닝 | {company.name}
            </h1>

            <p className="text-base sm:text-lg text-blue-600 font-semibold mb-4">
              {regionName} 관내 아파트 및 상업 건물 맞춤형 무얼룩·무스크래치 프리미엄 윈도우 케어
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {regionName}의 미세먼지와 계절별 황사, 외창에 고착된 석회 물때를 특수 거품 세정과 전문 스퀴지로 완벽히 박리합니다. 아래층 물 튐 피해 없이 안심하고 투명한 뷰를 되찾으세요.
            </p>

            {/* Target Keywords (SEO ⑦) */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-2">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>핵심 매칭 키워드:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {targetKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${company.phone}`}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                {company.phone} 전화 견적
              </a>
              <a
                href={company.kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#FEE500] text-[#3c1e1e] font-bold text-sm flex items-center gap-2 shadow-xs hover:brightness-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                카톡 사진 견적
              </a>
              <a
                href="#quote-matrix"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                [{regionName}] 온라인 견적 신청
              </a>
            </div>
          </div>
        </header>

        {/* 6. Standard Semantic H2 Structure */}

        {/* H2 - Section 1: 시공 특장점 및 공법 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              01
            </span>
            {regionName} {service.title} 시공 특장점 및 전문 공법
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            클리어웍스는 단순 걸레질이 아닌, 독일 수입 스퀴지와 안전 자성 와이퍼 시스템을 채택하여 유리 표면 손상 없이 투명도를 100% 복원합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-2">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">고밀도 거품 유막 분해</h3>
              <p className="text-xs text-slate-500">
                수년간 누적된 빗물 자국과 산성 유막을 친환경 중성 케미컬로 부드럽게 분해합니다.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-2">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">비산 방지 오염수 즉시 회수</h3>
              <p className="text-xs text-slate-500">
                아래층 세대나 화단으로 오염수가 흘러내리지 않도록 고무 블레이드로 완벽 밀착 집진합니다.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm mb-2">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">창틀 샷시 레일 스팀 케어</h3>
              <p className="text-xs text-slate-500">
                유리뿐만 아니라 창틀 하단 물구멍과 흑먼지까지 흡입 청소하여 결로 곰팡이를 예방합니다.
              </p>
            </div>
          </div>
        </section>

        {/* H2 - Section 2: Before & After 실증 비교 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              02
            </span>
            {regionName} 관내 실제 시공 전후(Before & After) 비교
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {regionName} 현장에서 시공한 실제 사진입니다. 슬라이더 바를 좌우로 드래그하여 투명한 시야 복원을 확인하세요.
          </p>

          <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-md">
            <BeforeAfterSlider
              beforeImage={PRESET_IMAGES.beforeHero}
              afterImage={PRESET_IMAGES.afterHero}
              beforeLabel="청소 전 오염 상태"
              afterLabel="클리어웍스 시공 후"
            />
          </div>
        </section>

        {/* H2 - Section 3: 작업 범위 및 체크리스트 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              03
            </span>
            작업 범위 및 안심 보양 체크리스트
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-blue-700 block">✓ 포함 작업 항목</span>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  실내 측 내창 및 외부 측 외창 양면 정밀 클리닝
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  창틀 샷시 레일 찌든 먼지 및 물구멍 흡입 세척
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  외부 난간대 스테인리스 오염물 표면 닦기
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  방충망 외부 먼지 털기 및 주변 바닥 보양 정리
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-indigo-700 block">✓ 고객 안심 보장</span>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  현대해상 영업배상책임보험 1억원 가입 업체
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  시공 후 고객 대면 최종 검수 및 미흡 부위 즉시 재작업
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  {company.asPeriod}일 이내 무상 A/S 보장
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* H2 - Section 4: 고객 후기 (SEO ⑧ 작업사례 매핑) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              04
            </span>
            {regionName} 고객님 실제 작업 후기 및 평점 (★ 4.98)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-slate-500 font-bold ml-1.5">{regionName} 고객님 (아파트 외창)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                "{regionName} 고층 아파트라 아래층 민원이 가장 걱정이었는데, 물 한 방울 안 떨어뜨리고 거실 창문이 완전히 사라진 것처럼 투명해졌습니다. 강력 추천합니다!"
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-slate-500 font-bold ml-1.5">{regionName} 상가 점주님</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                "매장 오픈 전 스티커 자국과 손자국이 심했는데 약속 시간 정확히 지켜주시고 매장이 2배는 환해졌습니다. 정기 관리도 바로 계약했습니다."
              </p>
            </div>
          </div>
        </section>

        {/* H2 - Section 5: 출장 가능 동 및 방문 일정 */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              05
            </span>
            {regionName} 출장 가능 세부 동 및 신속 방문 일정
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            아래 {regionName} 관내 전지역은 {company.name} 전담팀이 매일 상시 순회 작업 중이므로 당일/익일 빠른 예약이 가능합니다.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {detail.subDistricts.map((dong, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200/80 flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-blue-600" />
                {dong}
              </span>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 flex items-center justify-between">
            <span className="font-semibold">
              방문 가능 일정: <strong className="text-blue-700">{detail.leadTime}</strong>
            </span>
            <span className="font-bold text-blue-700">주말·공휴일 예약 가능</span>
          </div>
        </section>

        {/* H2 - Section 6: 무료 견적 신청 폼 (SEO ⑩ 네이버 전환 최적화) */}
        <section id="quote-matrix" className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-2xl mx-auto text-center">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 inline-block">
              {regionName} 전담 출장팀 직통
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              [{regionName}] {service.title} 무료 견적 신청
            </h2>
            <p className="text-sm text-slate-300 mb-8">
              창문 사진이나 평수 정보를 남겨주시면 10분 내에 정확한 견적을 산출하여 안내해 드립니다.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('mname') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('mphone') as HTMLInputElement).value;
                const address = (form.elements.namedItem('maddress') as HTMLInputElement).value;

                if (!name || !phone) return;

                onSubmitInquiry({
                  name,
                  phone,
                  region: `${regionName} ${address}`.trim(),
                  buildingType: service.title,
                  content: `[${regionName} × ${service.title}] 페이지를 통한 맞춤 견적 신청`,
                });

                alert(`[${regionName}] ${service.title} 견적 신청이 접수되었습니다! 곧 연락드리겠습니다.`);
                form.reset();
              }}
              className="space-y-3.5 text-left max-w-lg mx-auto"
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="mname"
                  type="text"
                  required
                  placeholder="고객명 / 상호"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="mphone"
                  type="tel"
                  required
                  placeholder="연락처 (010-0000-0000)"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                name="maddress"
                type="text"
                placeholder={`세부 주소 및 단지명 (예: ${detail.subDistricts[0] || '1동'} 34평)`}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/30"
              >
                [{regionName}] {service.title} 견적 신청 완료
              </button>
            </form>
          </div>
        </section>

        {/* 9. Internal Mesh Linking: Cross-links to other services & regions */}
        <section className="pt-8 border-t border-slate-200/80 space-y-8">
          {/* Other Services in this Region */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{regionName}의 다른 청소 서비스 바로가기</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {otherServicesInRegion.map((otherSrv) => (
                <button
                  key={otherSrv.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onNavigateMatrix(regionName, otherSrv.id);
                  }}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 block line-clamp-1">
                    {otherSrv.title}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {regionName} 전용 페이지 →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
