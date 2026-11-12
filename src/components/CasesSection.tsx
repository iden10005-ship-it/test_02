import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, RefreshCw, Home, Store, Building2, Grid, Tag } from 'lucide-react';
import { CaseItem } from '../types/siteData';
import { EditableText } from './common/EditableText';
import { BeforeAfterSlider } from './common/BeforeAfterSlider';

interface CasesSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  cases: CaseItem[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateCase: (id: string, field: keyof CaseItem, value: string) => void;
  onAddCase?: (category?: string) => void;
  onDeleteCase?: (id: string) => void;
  onEditCaseImages?: (caseItem: CaseItem) => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  cases,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateCase,
  onAddCase,
  onDeleteCase,
  onEditCaseImages,
}) => {
  // Active Tab state: '전체' | '아파트' | '상가' | '빌딩'
  const [activeTab, setActiveTab] = useState<string>('전체');

  // Store which view mode is active for each case card (slider vs tab toggle)
  const [activeCardView, setActiveCardView] = useState<{ [id: string]: 'slider' | 'before' | 'after' }>({});

  const setCardView = (id: string, mode: 'slider' | 'before' | 'after') => {
    setActiveCardView((prev) => ({ ...prev, [id]: mode }));
  };

  // Category matching helper
  const matchesCategory = (itemCategory: string, filterTab: string) => {
    if (filterTab === '전체') return true;
    if (!itemCategory) return false;
    const cat = itemCategory.trim().toLowerCase();
    if (filterTab === '아파트') {
      return cat.includes('아파트') || cat.includes('주택') || cat.includes('베란다');
    }
    if (filterTab === '상가') {
      return cat.includes('상가') || cat.includes('매장') || cat.includes('점포') || cat.includes('식당') || cat.includes('카페');
    }
    if (filterTab === '빌딩') {
      return cat.includes('빌딩') || cat.includes('외벽') || cat.includes('사무실') || cat.includes('오피스');
    }
    return cat.includes(filterTab.toLowerCase());
  };

  // Tab counts
  const getTabCount = (tabId: string) => {
    if (tabId === '전체') return cases.length;
    return cases.filter((c) => matchesCategory(c.category, tabId)).length;
  };

  // Filtered cases list
  const filteredCases = cases.filter((item) => matchesCategory(item.category, activeTab));

  const TABS = [
    { id: '전체', label: '전체', icon: Grid },
    { id: '아파트', label: '아파트', icon: Home },
    { id: '상가', label: '상가', icon: Store },
    { id: '빌딩', label: '빌딩', icon: Building2 },
  ];

  const handleAddClick = () => {
    if (onAddCase) {
      onAddCase(activeTab !== '전체' ? activeTab : '아파트');
    }
  };

  return (
    <section id="cases" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 block">
            Portfolio & Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            <EditableText
              value={sectionTitle}
              onSave={onUpdateTitle}
              isEditMode={isEditMode}
              label="시공사례 섹션 제목 수정"
              tag="span"
            />
          </h2>
          <p className="text-base text-slate-600">
            <EditableText
              value={sectionSubtitle}
              onSave={onUpdateSubtitle}
              isEditMode={isEditMode}
              label="시공사례 섹션 부제목 수정"
              tag="span"
            />
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cases Grid */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCases.map((caseItem) => {
              const currentMode = activeCardView[caseItem.id] || 'slider';

              return (
                <div
                  key={caseItem.id}
                  className="bg-slate-50/90 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
                >
                  {/* Visual Area */}
                  <div>
                    <div className="relative">
                      {currentMode === 'slider' ? (
                        <BeforeAfterSlider
                          beforeImage={caseItem.beforeImage}
                          afterImage={caseItem.afterImage}
                          beforeLabel="전"
                          afterLabel="후"
                          aspectRatio="aspect-[4/3]"
                        />
                      ) : (
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                          <img
                            src={currentMode === 'after' ? caseItem.afterImage : caseItem.beforeImage}
                            alt={caseItem.title}
                            className="w-full h-full object-cover"
                          />
                          <span
                            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                              currentMode === 'after' ? 'bg-emerald-600' : 'bg-slate-800'
                            }`}
                          >
                            {currentMode === 'after' ? '청소 후' : '청소 전'}
                          </span>
                        </div>
                      )}

                      {/* View mode toggle buttons */}
                      <div className="absolute bottom-3 right-3 z-20 flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg">
                        <button
                          onClick={() => setCardView(caseItem.id, 'slider')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                            currentMode === 'slider' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                          }`}
                          title="슬라이더 비교"
                        >
                          비교
                        </button>
                        <button
                          onClick={() => setCardView(caseItem.id, 'before')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                            currentMode === 'before' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          전
                        </button>
                        <button
                          onClick={() => setCardView(caseItem.id, 'after')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                            currentMode === 'after' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          후
                        </button>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        {isEditMode ? (
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <select
                              value={caseItem.category}
                              onChange={(e) => onUpdateCase(caseItem.id, 'category', e.target.value)}
                              className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                              <option value="아파트">아파트</option>
                              <option value="상가">상가</option>
                              <option value="빌딩">빌딩</option>
                            </select>
                          </div>
                        ) : (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700">
                            {caseItem.category}
                          </span>
                        )}

                        {isEditMode && onEditCaseImages && (
                          <button
                            onClick={() => onEditCaseImages(caseItem)}
                            className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            사진 교체
                          </button>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        <EditableText
                          value={caseItem.title}
                          onSave={(val) => onUpdateCase(caseItem.id, 'title', val)}
                          isEditMode={isEditMode}
                          label="시공사례 제목 수정"
                        />
                      </h3>

                      <p className="text-xs font-semibold text-blue-600 mb-2">
                        <EditableText
                          value={caseItem.specs}
                          onSave={(val) => onUpdateCase(caseItem.id, 'specs', val)}
                          isEditMode={isEditMode}
                          label="평수 및 규격 정보 수정"
                        />
                      </p>

                      {caseItem.description && (
                        <p className="text-xs text-slate-500 leading-relaxed">
                          <EditableText
                            value={caseItem.description}
                            onSave={(val) => onUpdateCase(caseItem.id, 'description', val)}
                            isEditMode={isEditMode}
                            label="시공 상세 내용 수정"
                            multiline
                          />
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer in edit mode */}
                  {isEditMode && onDeleteCase && cases.length > 1 && (
                    <div className="p-4 pt-0 flex justify-end">
                      <button
                        onClick={() => onDeleteCase(caseItem.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        사례 삭제
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add case card in edit mode */}
            {isEditMode && onAddCase && (
              <button
                onClick={handleAddClick}
                className="rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/60 p-6 flex flex-col items-center justify-center text-blue-600 gap-2 min-h-[340px] transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-bold text-sm">
                  {activeTab !== '전체' ? `'${activeTab}' 시공사례 추가하기` : '새 시공사례 추가하기'}
                </span>
              </button>
            )}
          </div>
        ) : (
          /* Empty State when no cases in selected category tab */
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              '{activeTab}' 카테고리의 시공 사례가 없습니다
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              새로운 시공 사례를 추가하시거나 다른 카테고리를 선택해 주세요.
            </p>
            {isEditMode && onAddCase && (
              <button
                onClick={handleAddClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>'{activeTab}' 시공사례 신규 추가</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
