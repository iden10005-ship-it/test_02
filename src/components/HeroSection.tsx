import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Award, Users, Star, Image as ImageIcon } from 'lucide-react';
import { HeroData, CompanyInfo } from '../types/siteData';
import { BeforeAfterSlider } from './common/BeforeAfterSlider';
import { EditableText } from './common/EditableText';

interface HeroSectionProps {
  hero: HeroData;
  company: CompanyInfo;
  isEditMode: boolean;
  onUpdateHero: (key: keyof HeroData, value: any) => void;
  onUpdateStat: (statId: string, field: 'value' | 'label', value: string) => void;
  onOpenImagePicker?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  company,
  isEditMode,
  onUpdateHero,
  onUpdateStat,
  onOpenImagePicker,
}) => {
  const statIcons = [
    <Users key="1" className="w-5 h-5 text-blue-600" />,
    <Award key="2" className="w-5 h-5 text-indigo-600" />,
    <ShieldCheck key="3" className="w-5 h-5 text-emerald-600" />,
    <Star key="4" className="w-5 h-5 text-amber-500 fill-amber-400" />,
  ];

  return (
    <section id="top" className="pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-4 border border-blue-200/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <EditableText
              value={hero.badgeText}
              onSave={(val) => onUpdateHero('badgeText', val)}
              isEditMode={isEditMode}
              label="상단 뱃지 문구 수정"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] mb-5">
            <EditableText
              value={hero.title}
              onSave={(val) => onUpdateHero('title', val)}
              isEditMode={isEditMode}
              label="메인 헤드라인 제목 수정"
              tag="span"
              className="block"
            />
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            <EditableText
              value={hero.subtitle}
              onSave={(val) => onUpdateHero('subtitle', val)}
              isEditMode={isEditMode}
              label="서브 카피 문구 수정"
              multiline
              tag="span"
            />
          </p>

          {/* Action Call-To-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <a
              href={`tel:${company.phone}`}
              className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <EditableText
                value={hero.callButtonText}
                onSave={(val) => onUpdateHero('callButtonText', val)}
                isEditMode={isEditMode}
                label="전화 버튼 텍스트 수정"
              />
            </a>

            <a
              href={company.kakaoLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#3c1e1e] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <EditableText
                value={hero.kakaoButtonText}
                onSave={(val) => onUpdateHero('kakaoButtonText', val)}
                isEditMode={isEditMode}
                label="카카오톡 버튼 텍스트 수정"
              />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all"
            >
              빠른 온라인 견적
            </a>
          </div>
        </div>

        {/* Before / After Slider Showcase */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Slider Container with subtle frame */}
          <div className="p-2 sm:p-3 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/80">
            <BeforeAfterSlider
              beforeImage={hero.beforeImage}
              afterImage={hero.afterImage}
              beforeLabel={hero.beforeLabel}
              afterLabel={hero.afterLabel}
            />
          </div>

          {/* Subtitle guide & Edit image trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-3 px-2 text-center sm:text-left gap-2">
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 justify-center sm:justify-start">
              <span>💡</span>
              <EditableText
                value={hero.beforeAfterNotice}
                onSave={(val) => onUpdateHero('beforeAfterNotice', val)}
                isEditMode={isEditMode}
                label="비포애프터 안내문구 수정"
              />
            </p>

            {isEditMode && onOpenImagePicker && (
              <button
                onClick={onOpenImagePicker}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                전후 사진 URL 교체하기
              </button>
            )}
          </div>
        </div>

        {/* Key Trust Stats (4 Grid Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {hero.stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center justify-center"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center mb-2.5">
                {statIcons[idx % statIcons.length]}
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                <EditableText
                  value={stat.value}
                  onSave={(val) => onUpdateStat(stat.id, 'value', val)}
                  isEditMode={isEditMode}
                  label={`${stat.label} 수치 수정`}
                />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                <EditableText
                  value={stat.label}
                  onSave={(val) => onUpdateStat(stat.id, 'label', val)}
                  isEditMode={isEditMode}
                  label="통계 라벨 수정"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
