import React, { useState } from 'react';
import { Sparkles, Wand2, X, Check, RotateCcw } from 'lucide-react';
import { SiteData } from '../../types/siteData';
import { completedSampleData } from '../../data/defaultSiteData';

interface QuickBatchFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  onApply: (updatedData: Partial<SiteData>) => void;
  onResetToTemplate: () => void;
}

export const QuickBatchFillModal: React.FC<QuickBatchFillModalProps> = ({
  isOpen,
  onClose,
  siteData,
  onApply,
  onResetToTemplate,
}) => {
  const [region, setRegion] = useState(
    siteData.company.region === '[지역]' ? '서울·수도권' : siteData.company.region
  );
  const [phone, setPhone] = useState(
    siteData.company.phone === '010-0000-0000' ? '010-8254-1004' : siteData.company.phone
  );
  const [representative, setRepresentative] = useState(
    siteData.company.representative === '[이름]' ? '김맑음' : siteData.company.representative
  );
  const [bizNumber, setBizNumber] = useState(
    siteData.company.bizNumber === '000-00-00000' ? '214-88-90123' : siteData.company.bizNumber
  );
  const [address, setAddress] = useState(
    siteData.company.address === '[사업장 주소]' ? '서울특별시 서초구 강남대로 381' : siteData.company.address
  );
  const [experience, setExperience] = useState('12년');
  const [constructionCount, setConstructionCount] = useState('3,800+건');
  const [rating, setRating] = useState('4.9점');

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    // Batch update across the entire site data
    const updatedCompany = {
      ...siteData.company,
      region,
      phone,
      representative,
      bizNumber,
      address,
    };

    // Update hero title with region
    const updatedHero = {
      ...siteData.hero,
      title: `${region} 유리창청소 전문 ${siteData.company.name}`,
      stats: [
        { id: 'stat-1', value: constructionCount, label: '누적 시공' },
        { id: 'stat-2', value: experience, label: '현장 경력' },
        { id: 'stat-3', value: '보험 가입', label: '배상책임보험' },
        { id: 'stat-4', value: rating, label: '고객 만족도' },
      ],
    };

    // Update services title
    const updatedServices = {
      ...siteData.services,
      sectionTitle: `${region} 유리창청소 서비스`,
    };

    // Update cases titles with region
    const updatedCases = {
      ...siteData.cases,
      items: siteData.cases.items.map((c) => ({
        ...c,
        title: c.title.replace(/\[지역\]/g, region),
        specs: c.specs.replace(/\[평수\]/g, '34평형').replace(/\[규모\]/g, '1층 45평').replace(/\[층수\]/g, '5층 빌딩'),
      })),
    };

    // Update reviews author with region
    const updatedReviews = {
      ...siteData.reviews,
      items: siteData.reviews.items.map((r) => ({
        ...r,
        author: r.author.replace(/\[지역\]/g, region),
      })),
    };

    onApply({
      company: updatedCompany,
      hero: updatedHero,
      services: updatedServices,
      cases: updatedCases,
      reviews: updatedReviews,
    });

    onClose();
  };

  const handleApplyPresetSample = () => {
    onApply(completedSampleData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">빈칸([대괄호]) 일괄 완성 마법사</h3>
              <p className="text-xs text-blue-100">
                지역, 연락처, 대표명 등을 입력하면 사이트 전체에 자동 반영됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Quick preset callout */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-900 block mb-0.5">
                💡 완성형 모범 데이터로 바로 채우고 싶으신가요?
              </span>
              <p className="text-[11px] text-blue-700">
                실제 영업 중인 청소업체 수준의 세부 정보와 포트폴리오로 한 번에 세팅합니다.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetSample}
              className="shrink-0 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              모범 예시 채우기
            </button>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  활동 지역 ([지역])
                </label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="예: 서울·수도권 또는 강남·서초"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  대표 전화번호 ([010-0000-0000])
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  대표자명 ([이름])
                </label>
                <input
                  type="text"
                  value={representative}
                  onChange={(e) => setRepresentative(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  사업자등록번호
                </label>
                <input
                  type="text"
                  value={bizNumber}
                  onChange={(e) => setBizNumber(e.target.value)}
                  placeholder="예: 123-45-67890"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                사업장 주소 ([사업장 주소])
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="예: 서울특별시 서초구 서초대로 123"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  누적 시공 건수
                </label>
                <input
                  type="text"
                  value={constructionCount}
                  onChange={(e) => setConstructionCount(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  현장 경력
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  고객 만족도
                </label>
                <input
                  type="text"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (confirm('초기 원본 템플릿([000] 빈칸 상태)으로 되돌리시겠습니까?')) {
                    onResetToTemplate();
                    onClose();
                  }
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                원본 템플릿 복원
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  전체 적용하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
