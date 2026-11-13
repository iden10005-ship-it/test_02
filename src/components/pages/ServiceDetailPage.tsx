import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  Wrench,
  ShieldCheck,
  Phone,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem, CompanyInfo, InquiryItem } from '../../types/siteData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { EditableText } from '../common/EditableText';
import { PRESET_IMAGES } from '../../data/defaultSiteData';
import { InternalUrlBar } from '../common/InternalUrlBar';

interface ServiceDetailPageProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  company: CompanyInfo;
  isEditMode: boolean;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onUpdateService: (id: string, field: keyof ServiceItem, value: any) => void;
  onSubmitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  allServices,
  company,
  isEditMode,
  onBack,
  onSelectService,
  onUpdateService,
  onSubmitInquiry,
}) => {
  const detail = service.detail || {
    tagline: '깨끗하고 투명한 공간을 만드는 전문 유리창 케어 솔루션',
    targetAudience: '상세 대상 건물 및 공간',
    scopeList: [
      '유리창 내·외면 찌든 물때 및 유막 정밀 제거',
      '창틀 샷시 레일 및 실리콘 틈새 세척',
      '친환경 중성 세정제 사용으로 유리 표면 보호',
      '최종 건조 및 무얼룩 광택 마무리',
    ],
    equipment: [
      '전문가용 스퀴지 및 극세사 패드',
      '유리 전용 생분해성 세정제',
    ],
    duration: '2~3시간 내외',
    priceGuide: '현장 조건 및 면적에 따른 맞춤 견적',
    beforeImage: PRESET_IMAGES.aptBefore,
    afterImage: PRESET_IMAGES.aptAfter,
  };

  const handleUpdateDetailField = (field: keyof typeof detail, value: any) => {
    onUpdateService(service.id, 'detail', {
      ...detail,
      [field]: value,
    });
  };

  const otherServices = allServices.filter((s) => s.id !== service.id);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200 py-2.5 sm:py-3.5 px-3 sm:px-6 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>메인으로 돌아가기</span>
          </button>

          <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1.5 font-medium">
            <span className="cursor-pointer hover:underline" onClick={onBack}>홈</span>
            <span>/</span>
            <span>서비스 안내</span>
            <span>/</span>
            <span className="font-bold text-blue-600">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-8 space-y-6 sm:space-y-10">
        {/* Internal Direct URL Bar */}
        <InternalUrlBar
          path={`#/service/${service.id}`}
          title={`[${service.title}] 세부페이지 고유 URL 주소 (내부주소)`}
          subtitle={`이 주소를 상담 안내 또는 홍보 글에 첨부하면 [${service.title}] 전용 상세페이지로 바로 연결됩니다.`}
        />

        {/* 2. Service Hero Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            {service.badge && (
              <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] sm:text-xs font-bold mb-2.5 sm:mb-3">
                {service.badge}
              </span>
            )}
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight mb-2 sm:mb-4">
              <EditableText
                value={service.title}
                onSave={(val) => onUpdateService(service.id, 'title', val)}
                isEditMode={isEditMode}
                label="서비스 제목 수정"
              />
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-600 font-bold mb-2.5 sm:mb-4 leading-relaxed">
              <EditableText
                value={detail.tagline}
                onSave={(val) => handleUpdateDetailField('tagline', val)}
                isEditMode={isEditMode}
                label="서비스 슬로건/헤드카피 수정"
              />
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed mb-5 sm:mb-8">
              <EditableText
                value={service.description}
                onSave={(val) => onUpdateService(service.id, 'description', val)}
                isEditMode={isEditMode}
                label="서비스 개요 설명 수정"
                multiline
              />
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <a
                href={`tel:${company.phone}`}
                className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all text-center"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{company.phone} 전화 상담</span>
              </a>
              <a
                href={company.kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-[#FEE500] text-[#3c1e1e] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs hover:brightness-95 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>카톡 1:1 상담</span>
              </a>
              <a
                href="#quote-form"
                className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors text-center"
              >
                <span>무료 견적 신청</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Before & After Visual Comparison for this specific service */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {service.title} 전후 비교
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              실제 시공 현장에서 촬영된 고화질 비교 사진입니다. 슬라이더를 밀어 확인해보세요.
            </p>
          </div>

          <div className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md">
            <BeforeAfterSlider
              beforeImage={detail.beforeImage || PRESET_IMAGES.aptBefore}
              afterImage={detail.afterImage || PRESET_IMAGES.aptAfter}
              beforeLabel="시공 전"
              afterLabel="시공 후"
            />
          </div>
        </div>

        {/* 4. Detailed Scope Checklist & Equipment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Work Scope */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">시공 범위 및 체크리스트</h3>
            </div>

            <ul className="space-y-2.5 sm:space-y-3.5">
              {detail.scopeList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] sm:text-xs">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Equipment */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">사용 전문 장비 및 공법</h3>
            </div>

            <ul className="space-y-2.5 sm:space-y-3.5">
              {detail.equipment.map((eq, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    •
                  </span>
                  <span className="leading-relaxed">{eq}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 grid grid-cols-2 gap-2 sm:gap-3 text-xs">
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-500 block mb-0.5 text-[11px] sm:text-xs">평균 소요 시간</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">{detail.duration}</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-500 block mb-0.5 text-[11px] sm:text-xs">가격 가이드</span>
                <span className="font-bold text-blue-600 text-xs sm:text-sm">{detail.priceGuide}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Service Specific FAQ */}
        {detail.faqList && detail.faqList.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
              <h3 className="text-base sm:text-xl font-bold text-slate-900">
                {service.title} 관련 자주 묻는 질문
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {detail.faqList.map((faqItem, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-2">
                    <span className="text-blue-600 font-black">Q.</span>
                    {faqItem.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5 sm:pl-6">
                    {faqItem.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Quick Quote Application for this service */}
        <div id="quote-form" className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-xl">
          <div className="max-w-2xl mx-auto text-center">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3 inline-block">
              100% 무료 맞춤 견적
            </span>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-3 leading-snug">
              [{service.title}] 견적을 바로 받아보세요
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-5 sm:mb-8 leading-relaxed">
              전화번호와 작업 희망 일정을 남겨주시면 10분 내에 담당 엔지니어가 친절히 안내해 드립니다.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('qname') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('qphone') as HTMLInputElement).value;
                const content = (form.elements.namedItem('qcontent') as HTMLInputElement).value;

                if (!name || !phone) return;

                onSubmitInquiry({
                  name,
                  phone,
                  region: company.region,
                  buildingType: service.title,
                  content: content || `${service.title} 상세페이지를 통한 맞춤 견적 문의`,
                });

                alert('견적 신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.');
                form.reset();
              }}
              className="space-y-2.5 sm:space-y-3.5 text-left max-w-lg mx-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input
                  name="qname"
                  type="text"
                  required
                  placeholder="고객명 / 상호"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="qphone"
                  type="tel"
                  required
                  placeholder="연락처 (010-0000-0000)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                name="qcontent"
                type="text"
                placeholder="희망 날짜 및 평수/창문 수량 (예: 34평 11월 20일)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/30"
              >
                {service.title} 무료 견적 신청하기
              </button>
            </form>
          </div>
        </div>

        {/* 7. Explore Other Services */}
        <div className="pt-2 sm:pt-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">다른 전문 클리닝 서비스 둘러보기</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {otherServices.map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  onSelectService(other.id);
                }}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {other.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
