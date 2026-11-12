import React, { useState } from 'react';
import { MapPin, Plus, X, Sparkles, Building2, Compass, CheckCircle2 } from 'lucide-react';
import { EditableText } from './common/EditableText';

interface RegionsSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  regions: string[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onAddRegion: (region: string) => void;
  onRemoveRegion: (index: number) => void;
  onViewRegion?: (regionName: string) => void;
}

export const RegionsSection: React.FC<RegionsSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  regions,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onAddRegion,
  onRemoveRegion,
  onViewRegion,
}) => {
  const [newRegionInput, setNewRegionInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRegionInput.trim()) {
      onAddRegion(newRegionInput.trim());
      setNewRegionInput('');
    }
  };

  // Grouping for simplified presentation
  const seoulList = regions.filter((r) =>
    ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'].includes(r)
  );

  const incheonList = regions.filter((r) => r.startsWith('인천'));

  // Top representative chips
  const seoulSample = ['강남구', '서초구', '송파구', '마포구', '용산구', '영등포구', '노원구', '강동구'];
  const gyeonggiSample = ['분당구', '수지구', '수원 영통구', '일산동구', '하남시', '안양 동안구', '화성시', '부천시'];
  const incheonSample = incheonList.length > 0 ? incheonList : ['인천 연수구', '인천 서구', '인천 부평구'];

  return (
    <section id="regions" className="py-16 md:py-24 bg-slate-50/70 border-t border-slate-200/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <span className="text-xs font-extrabold text-blue-600 tracking-wider uppercase mb-2 block">
          Service Coverage Area
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          <EditableText
            value={sectionTitle}
            onSave={onUpdateTitle}
            isEditMode={isEditMode}
            label="서비스 지역 제목 수정"
            tag="span"
          />
        </h2>
        <p className="text-xs sm:text-base text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          <EditableText
            value={sectionSubtitle}
            onSave={onUpdateSubtitle}
            isEditMode={isEditMode}
            label="서비스 지역 부제목 수정"
            tag="span"
          />
        </p>

        {/* 3 Main Regional Category Cards: 서울, 경기, 인천 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          {/* Card 1: 서울특별시 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs border border-blue-200/60 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  서울 25개구 전역
                </span>
                <span className="text-[11px] font-bold text-slate-400">당일/익일 출장</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                서울특별시 전지역
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                강남·서초·송파·마포·용산·영등포·노원 등 서울시 25개 자치구 모든 아파트 및 상가 유리창 전문 출장
              </p>

              {/* Representative Region Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {seoulSample.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => onViewRegion && onViewRegion(reg)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-blue-500" />
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold text-xs border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>서울 전체 구 목록 보기 ({seoulList.length > 0 ? seoulList.length : 25}개 구)</span>
            </button>
          </div>

          {/* Card 2: 경기도 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200/60 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  경기 주요 신도시 전역
                </span>
                <span className="text-[11px] font-bold text-slate-400">전담팀 배정</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                경기도 주요 지역
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                수원·성남(분당)·용인(수지)·고양(일산)·부천·하남·안양·화성·평택 등 수도권 신도시 및 구/시 전역
              </p>

              {/* Representative Region Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {gyeonggiSample.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => onViewRegion && onViewRegion(reg)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-blue-500" />
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold text-xs border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>경기 전체 시/구 목록 보기</span>
            </button>
          </div>

          {/* Card 3: 인천광역시 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs border border-indigo-200/60 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  인천 주요 국제도시
                </span>
                <span className="text-[11px] font-bold text-slate-400">초발수 코팅</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                인천광역시
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                송도국제도시(연수구)·청라/검단(서구)·부평구 등 서해 해풍 및 염분 방지 나노 불소 코팅 특화
              </p>

              {/* Representative Region Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {incheonSample.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => onViewRegion && onViewRegion(reg)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-blue-500" />
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold text-xs border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>인천 주요 구 목록 보기</span>
            </button>
          </div>
        </div>

        {/* Collapsible / Expandable Full List Toggle */}
        <div className="text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-600 text-xs sm:text-sm font-bold border border-slate-200 shadow-2xs transition-all"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>{isExpanded ? '전체 세부 지역 목록 접기 ▲' : '서울·경기·인천 전체 세부 지역 목록 보기 ▼'}</span>
          </button>
        </div>

        {/* Expanded Full List (only rendered when requested) */}
        {isExpanded && (
          <div className="mt-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg text-left animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>전체 서비스 지역 세부 목록 ({regions.length}개 지역)</span>
              </h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                닫기 ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {regions.map((region, idx) => (
                <span
                  key={`${region}-${idx}`}
                  onClick={() => {
                    if (onViewRegion) onViewRegion(region);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-semibold border border-slate-200/80 transition-colors cursor-pointer group"
                >
                  <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                  <span>{region}</span>
                  <span className="text-[10px] text-slate-300 group-hover:text-blue-600 font-extrabold">→</span>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveRegion(idx);
                      }}
                      className="ml-1 p-0.5 text-slate-400 hover:text-red-500 rounded-full"
                      title="삭제"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {/* Add Region in Edit Mode */}
            {isEditMode && (
              <form onSubmit={handleAdd} className="flex items-center gap-2 max-w-sm mt-6 pt-4 border-t border-slate-100">
                <input
                  type="text"
                  value={newRegionInput}
                  onChange={(e) => setNewRegionInput(e.target.value)}
                  placeholder="예: 하남시 미사동"
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  지역 추가
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
