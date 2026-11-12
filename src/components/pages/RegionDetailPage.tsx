import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { CompanyInfo, RegionDetailItem, InquiryItem, ReviewItem, CaseItem } from '../../types/siteData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { EditableText } from '../common/EditableText';
import { PRESET_IMAGES } from '../../data/defaultSiteData';
import { RegionApartmentAndKnowHowSection } from '../region/RegionApartmentAndKnowHowSection';

interface RegionDetailPageProps {
  regionName: string;
  regionDetail?: RegionDetailItem;
  allRegions: string[];
  company: CompanyInfo;
  reviews: ReviewItem[];
  cases: CaseItem[];
  isEditMode: boolean;
  onBack: () => void;
  onSelectRegion: (regionName: string) => void;
  onUpdateRegionDetail?: (regionName: string, detail: RegionDetailItem) => void;
  onSubmitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => void;
}

export const RegionDetailPage: React.FC<RegionDetailPageProps> = ({
  regionName,
  regionDetail,
  allRegions,
  company,
  reviews,
  cases,
  isEditMode,
  onBack,
  onSelectRegion,
  onUpdateRegionDetail,
  onSubmitInquiry,
}) => {
  const [quoteAddress, setQuoteAddress] = React.useState('');
  const [quoteBuilding, setQuoteBuilding] = React.useState('아파트 외창 (베란다/확장형)');

  const handleSelectComplexForQuote = (complexName: string) => {
    setQuoteAddress(complexName);
    setQuoteBuilding('아파트 외창 (베란다/확장형)');
    const el = document.getElementById('region-quote');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Fallback if no specific detail entry exists for a custom region
  const detail: RegionDetailItem = regionDetail || {
    name: regionName,
    subDistricts: [`${regionName} 1동`, `${regionName} 2동`, '중심 상권', '아파트 밀집 구역'],
    description: `${regionName} 전지역 아파트 외창 및 상가 유리창 전문 신속 출장`,
    leadTime: '상담 접수 후 24시간 이내 방문 견적 가능',
    popularComplexes: [`${regionName} 랜드마크 아파트`, `${regionName} 중심 상업지구`],
    notice: `${regionName} 지역 단체 및 공동구매 접수 시 특별 할인 적용`,
  };

  const handleUpdate = (field: keyof RegionDetailItem, value: any) => {
    if (onUpdateRegionDetail) {
      onUpdateRegionDetail(regionName, {
        ...detail,
        [field]: value,
      });
    }
  };

  const otherRegions = allRegions.filter((r) => r !== regionName);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Breadcrumb Bar */}
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
            <span>서비스 지역</span>
            <span>/</span>
            <span className="font-bold text-blue-600">[{regionName}] 유리창 청소</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* 2. Region Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{regionName} 전지역 출장 가능</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              [{regionName}] 유리창청소 전문 {company.name}
            </h1>

            <p className="text-base sm:text-lg text-blue-600 font-semibold mb-4">
              <EditableText
                value={detail.description}
                onSave={(val) => handleUpdate('description', val)}
                isEditMode={isEditMode}
                label="지역 대표 설명 수정"
              />
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {regionName} 관내 아파트 외창 물때부터 상가 쇼윈도, 통유리까지 전문 스퀴지 장비와 안심 배상책임보험으로 흔적 없이 맑고 투명하게 케어합니다.
            </p>

            {detail.notice && (
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/70 text-xs text-blue-900 font-medium mb-8 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <EditableText
                  value={detail.notice}
                  onSave={(val) => handleUpdate('notice', val)}
                  isEditMode={isEditMode}
                  label="지역 공지/할인 문구 수정"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${company.phone}`}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                {regionName} 직통 상담 ({company.phone})
              </a>
              <a
                href={company.kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#FEE500] text-[#3c1e1e] font-bold text-sm flex items-center gap-2 shadow-xs hover:brightness-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                카톡 문의
              </a>
              <a
                href="#region-quote"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                {regionName} 빠른 출장 견적
              </a>
            </div>
          </div>
        </div>

        {/* 3. Coverage Details & Districts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sub Districts */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{regionName} 출장 가능 세부 동</h3>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              아래 관내 모든 법정동 및 행정동에 당일/익일 출장 작업이 가능합니다.
            </p>

            <div className="flex flex-wrap gap-2">
              {detail.subDistricts.map((dong, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80"
                >
                  {dong}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>방문 일정: <strong className="text-slate-800">{detail.leadTime}</strong></span>
              </span>
              <span className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                100% 당일/익일 출장
              </span>
            </div>
          </div>

          {/* Quick Regional Highlights */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{regionName} 시공 신뢰 보증</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {regionName} 관내 아파트 및 상가 유리창은 고소 작업 안전 인증 장비와 독일제 친환경 중성 케미컬을 투입하여 창틀과 실리콘 손상 없이 맑고 투명하게 복원합니다.
              </p>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>창틀 탈거 없는 실내 안전 양면 자석 시공 (추락 위험 0%)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>아랫집 낙수 피해 방지 3중 보양 및 레일 오염수 전량 회수</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>현대해상 영업배상책임보험 1억원 가입 안전 보증</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">관내 아파트 단지별 맞춤 장비 보유</span>
              <a
                href="#region-complexes"
                className="text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>단지별 가이드 보기 ↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. Major Apartment Complexes & Regional Work Know-How Section */}
        <div id="region-complexes">
          <RegionApartmentAndKnowHowSection
            regionName={regionName}
            company={company}
            customApartments={detail.apartments}
            customKnowHows={detail.knowHows}
            customFactors={detail.environmentalFactors}
            isEditMode={isEditMode}
            onUpdateApartments={(newApts) => handleUpdate('apartments', newApts)}
            onUpdateKnowHows={(newKH) => handleUpdate('knowHows', newKH)}
            onSelectComplexForQuote={handleSelectComplexForQuote}
          />
        </div>

        {/* 5. Before & After Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                [{regionName}] 시공 전후 비교
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                실제 시공 사진입니다. 좌우로 드래그하여 투명한 유리창 효과를 직접 확인하세요.
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-md">
            <BeforeAfterSlider
              beforeImage={PRESET_IMAGES.beforeHero}
              afterImage={PRESET_IMAGES.afterHero}
              beforeLabel="시공 전 (물때)"
              afterLabel="시공 후 (투명)"
            />
          </div>
        </div>

        {/* 5. Region Specific Quote Request Form */}
        <div id="region-quote" className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-2xl mx-auto text-center">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 inline-block">
              {regionName} 전담 출장팀 배정
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              [{regionName}] 빠른 무료 견적 신청
            </h3>
            <p className="text-sm text-slate-300 mb-8">
              지역명과 연락처를 남겨주시면 {regionName} 담당 엔지니어가 신속하게 정확한 견적을 안내해 드립니다.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('rname') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('rphone') as HTMLInputElement).value;
                const address = (form.elements.namedItem('raddress') as HTMLInputElement).value;
                const building = (form.elements.namedItem('rbuilding') as HTMLSelectElement).value;

                if (!name || !phone) return;

                onSubmitInquiry({
                  name,
                  phone,
                  region: `${regionName} ${address}`.trim(),
                  buildingType: building,
                  content: `${regionName} 지역 상세페이지를 통한 맞춤 견적 신청`,
                });

                alert(`${regionName} 지역 견적 신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.`);
                form.reset();
              }}
              className="space-y-3.5 text-left max-w-lg mx-auto"
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="rname"
                  type="text"
                  required
                  placeholder="성함 / 고객명"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="rphone"
                  type="tel"
                  required
                  placeholder="연락처 (010-0000-0000)"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="raddress"
                  type="text"
                  value={quoteAddress}
                  onChange={(e) => setQuoteAddress(e.target.value)}
                  placeholder={`세부 동/아파트명 (예: ${detail.subDistricts[0] || '반포동'})`}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="rbuilding"
                  value={quoteBuilding}
                  onChange={(e) => setQuoteBuilding(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="아파트 외창 (베란다/확장형)">아파트 외창 청소</option>
                  <option value="상가·매장 통유리">상가 통유리 청소</option>
                  <option value="빌딩 외벽 (로프/스카이)">빌딩 외벽 청소</option>
                  <option value="입주·이사청소 유리">입주/이사 청소 유리</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/30"
              >
                [{regionName}] 무료 견적 신청하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
