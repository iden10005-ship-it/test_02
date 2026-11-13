import React, { useState } from 'react';
import { MapPin, Plus, X, Sparkles, Building2, Compass, CheckCircle2, Copy, Check, Link2, Search, ExternalLink } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'chips' | 'urls'>('chips');
  const [searchUrlKeyword, setSearchUrlKeyword] = useState('');
  const [copiedRegion, setCopiedRegion] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

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
          <div className="mt-6 bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xl text-left animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>전체 서비스 지역 세부 정보 ({regions.length}개 지역)</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  각 지역을 클릭하여 전용 상세페이지를 확인하거나, 네이버 블로그/카카오톡 공유용 고유 URL을 복사할 수 있습니다.
                </p>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setViewMode('chips')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'chips'
                        ? 'bg-white text-blue-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏷️ 지역 태그
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('urls')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'urls'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔗 고유 URL 주소 목록
                  </button>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  닫기 ✕
                </button>
              </div>
            </div>

            {/* TAB 1: Chips View */}
            {viewMode === 'chips' ? (
              <>
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
              </>
            ) : (
              /* TAB 2: URL Directory View */
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchUrlKeyword}
                      onChange={(e) => setSearchUrlKeyword(e.target.value)}
                      placeholder="지역 검색 (예: 강남구, 분당, 송도, 마포...)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://clearworks.kr';
                      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
                      const base = `${origin}${pathname.endsWith('/') ? pathname : pathname + '/'}`;
                      const allListText = regions
                        .map((reg) => `[${reg}] ${base}#/region/${encodeURIComponent(reg)}`)
                        .join('\n');
                      navigator.clipboard.writeText(allListText);
                      setCopiedAll(true);
                      setTimeout(() => setCopiedAll(false), 2000);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAll ? '전체 URL 복사 완료!' : '전체 지역 URL 일괄 복사'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {regions
                    .filter((r) => r.toLowerCase().includes(searchUrlKeyword.toLowerCase().trim()))
                    .map((region) => {
                      const relPath = `/#/region/${region}`;
                      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://clearworks.kr';
                      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
                      const fullUrl = `${origin}${pathname.endsWith('/') ? pathname : pathname + '/'}#/region/${encodeURIComponent(region)}`;
                      const isThisCopied = copiedRegion === region;

                      return (
                        <div
                          key={region}
                          className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-400 transition-all flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                                <span>{region}</span>
                              </span>
                              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                전용페이지
                              </span>
                            </div>
                            <div className="bg-white px-2 py-1 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 truncate select-all">
                              {relPath}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200/60">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(fullUrl);
                                setCopiedRegion(region);
                                setTimeout(() => setCopiedRegion(null), 2000);
                              }}
                              className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                                isThisCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {isThisCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{isThisCopied ? '복사됨!' : 'URL 복사'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (onViewRegion) onViewRegion(region);
                              }}
                              className="py-1 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>이동</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
