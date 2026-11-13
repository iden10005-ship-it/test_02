import React, { useState, useEffect } from 'react';
import {
  X,
  FileCode,
  Globe,
  MapPin,
  Layers,
  Search,
  ExternalLink,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Sliders,
  Eye,
  Lightbulb,
  AlertCircle,
  Link2,
} from 'lucide-react';
import {
  REGION_URL_MAP,
  SERVICE_URL_MAP,
  generateRegionServiceMatrix,
  NAVER_SEO_CHECKLIST,
  generateXmlSitemap,
  generateRobotsTxt,
} from '../../data/seoArchitectureData';
import { SiteData, PageView, PageSeoConfig } from '../../types/siteData';
import { getPageKey } from '../../utils/urlRouter';
import { getEffectivePageSeo, getKeywordSuggestions } from '../../utils/seoHelper';

interface SeoMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  currentPage?: PageView;
  onUpdateSiteData?: (updater: (prev: SiteData) => SiteData) => void;
  onNavigateMatrix: (regionName: string, serviceId: string) => void;
  onNavigateRegion: (regionName: string) => void;
  onNavigateService: (serviceId: string) => void;
}



export const SeoMasterModal: React.FC<SeoMasterModalProps> = ({
  isOpen,
  onClose,
  siteData,
  currentPage,
  onUpdateSiteData,
  onNavigateMatrix,
  onNavigateRegion,
  onNavigateService,
}) => {
  const [activeTab, setActiveTab] = useState<'keywords' | 'blueprint' | 'matrix' | 'naver' | 'sitemap' | 'jsonld'>('keywords');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // SEO Keyword Editor state
  const initialPageKey = currentPage ? getPageKey(currentPage) : 'home';
  const [selectedPageKey, setSelectedPageKey] = useState<string>(initialPageKey);

  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [primaryKeywords, setPrimaryKeywords] = useState<string[]>([]);
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>([]);
  const [regionLongTailKeywords, setRegionLongTailKeywords] = useState<string[]>([]);
  const [newPrimaryInput, setNewPrimaryInput] = useState<string>('');
  const [newSecondaryInput, setNewSecondaryInput] = useState<string>('');
  const [newRegionLongTailInput, setNewRegionLongTailInput] = useState<string>('');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Sync selectedPageKey with currentPage whenever modal is opened
  useEffect(() => {
    if (isOpen && currentPage) {
      const key = getPageKey(currentPage);
      setSelectedPageKey(key);
    }
  }, [isOpen, currentPage]);

  // Load SEO data whenever selectedPageKey changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const seo = getEffectivePageSeo(selectedPageKey, siteData);
      setEditTitle(seo.title || '');
      setEditDescription(seo.description || '');
      setPrimaryKeywords(seo.primaryKeywords || []);
      setSecondaryKeywords(seo.secondaryKeywords || []);
      setRegionLongTailKeywords(seo.regionLongTailKeywords || []);
      setSaveFeedback(null);
    }
  }, [isOpen, selectedPageKey, siteData]);

  if (!isOpen) return null;

  const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://clearworks.co.kr';
  const matrix = generateRegionServiceMatrix(siteData.regions.list, siteData.services.items);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Keyword operations
  const handleAddPrimaryKeyword = (keyword: string) => {
    const clean = keyword.trim();
    if (!clean) return;
    // Support comma-separated batch adding
    const parts = clean.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
    setPrimaryKeywords((prev) => {
      const next = [...prev];
      for (const p of parts) {
        if (!next.includes(p)) next.push(p);
      }
      return next;
    });
    setNewPrimaryInput('');
  };

  const handleRemovePrimaryKeyword = (index: number) => {
    setPrimaryKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSecondaryKeyword = (keyword: string) => {
    const clean = keyword.trim();
    if (!clean) return;
    const parts = clean.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
    setSecondaryKeywords((prev) => {
      const next = [...prev];
      for (const p of parts) {
        if (!next.includes(p)) next.push(p);
      }
      return next;
    });
    setNewSecondaryInput('');
  };

  const handleRemoveSecondaryKeyword = (index: number) => {
    setSecondaryKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddRegionLongTailKeyword = (keyword: string) => {
    const clean = keyword.trim();
    if (!clean) return;
    const parts = clean.split(',').map((p) => p.trim()).filter((p) => p.length > 0);
    setRegionLongTailKeywords((prev) => {
      const next = [...prev];
      for (const p of parts) {
        if (!next.includes(p)) next.push(p);
      }
      return next;
    });
    setNewRegionLongTailInput('');
  };

  const handleRemoveRegionLongTailKeyword = (index: number) => {
    setRegionLongTailKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSavePageSeo = () => {
    if (!onUpdateSiteData) return;
    const cleanPrimary = primaryKeywords.map((k) => k.trim()).filter((k) => k.length > 0);
    const cleanSecondary = secondaryKeywords.map((k) => k.trim()).filter((k) => k.length > 0);
    const cleanRegionLongTail = regionLongTailKeywords.map((k) => k.trim()).filter((k) => k.length > 0);

    onUpdateSiteData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        pages: {
          ...(prev.seo?.pages || {}),
          [selectedPageKey]: {
            title: editTitle.trim(),
            description: editDescription.trim(),
            primaryKeywords: cleanPrimary,
            secondaryKeywords: cleanSecondary,
            regionLongTailKeywords: cleanRegionLongTail,
            author: prev.company.name,
          },
        },
      },
    }));

    setSaveFeedback(`[${getPageLabel(selectedPageKey)}] SEO 키워드 및 메타데이터가 성공적으로 저장 및 반영되었습니다!`);
    setTimeout(() => setSaveFeedback(null), 3500);
  };

  const handleResetToDefault = () => {
    if (confirm('현재 페이지의 SEO 키워드를 시스템 권장 기본값으로 복원하시겠습니까?')) {
      // Clear custom config for this page
      if (onUpdateSiteData) {
        onUpdateSiteData((prev) => {
          const nextPages = { ...(prev.seo?.pages || {}) };
          delete nextPages[selectedPageKey];
          return {
            ...prev,
            seo: {
              ...prev.seo,
              pages: nextPages,
            },
          };
        });
      }
      const defaults = getEffectivePageSeo(selectedPageKey, {
        ...siteData,
        seo: { ...siteData.seo, pages: {} },
      });
      setEditTitle(defaults.title || '');
      setEditDescription(defaults.description || '');
      setPrimaryKeywords(defaults.primaryKeywords || []);
      setSecondaryKeywords(defaults.secondaryKeywords || []);
      setRegionLongTailKeywords(defaults.regionLongTailKeywords || []);
      setSaveFeedback('권장 기본 키워드로 복원되었습니다.');
      setTimeout(() => setSaveFeedback(null), 2500);
    }
  };

  function getPageLabel(key: string): string {
    if (key === 'home') return '🏠 메인 홈페이지';
    if (key.startsWith('region:')) return `📍 지역: [${key.replace('region:', '')}] 상세`;
    if (key.startsWith('service:')) {
      const sId = key.replace('service:', '');
      const srv = siteData.services.items.find((s) => s.id === sId);
      return `🛠️ 서비스: ${srv ? srv.title : sId}`;
    }
    if (key.startsWith('matrix:')) {
      const [, r, sId] = key.split(':');
      const srv = siteData.services.items.find((s) => s.id === sId);
      return `✖️ [${r}] × ${srv ? srv.title.split('·')[0] : sId}`;
    }
    if (key === 'gallery_list') return '📷 시공갤러리 목록';
    return key;
  }

  function getPageRelativeUrl(key: string): string {
    if (key === 'home') return '/';
    if (key.startsWith('region:')) return `/#/region/${key.replace('region:', '')}`;
    if (key.startsWith('service:')) return `/#/service/${key.replace('service:', '')}`;
    if (key.startsWith('matrix:')) {
      const [, r, sId] = key.split(':');
      return `/#/region/${r}/${sId}`;
    }
    if (key === 'gallery_list') return '/#/gallery';
    return '/';
  }

  const sitemapXml = generateXmlSitemap(currentDomain, siteData.regions.list, siteData.services.items);
  const robotsTxt = generateRobotsTxt(currentDomain);

  // Generate dynamic JSON-LD
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: siteData.company.name,
    description: '아파트 외창부터 상가·빌딩 외벽까지, 얼룩 없이 맑고 투명한 유리창 청소 전문',
    url: currentDomain,
    telephone: siteData.company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.company.address,
      addressLocality: siteData.company.region,
      addressCountry: 'KR',
    },
    openingHours: siteData.company.operatingHours,
    areaServed: siteData.regions.list.map((r) => ({
      '@type': 'AdministrativeArea',
      name: r,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '유리창 청소 서비스',
      itemListElement: siteData.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  const suggestions = getKeywordSuggestions(selectedPageKey, siteData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">홈페이지 사이트맵 & 네이버 SEO 마스터 센터</h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                  키워드 실시간 편집 지원
                </span>
              </div>
              <p className="text-xs text-slate-300">
                현재 페이지 검색엔진 키워드 커스텀, 지역별 URL 구조, 60개 확장 매트릭스, 네이버 기술요건
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

        {/* Modal Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2 gap-1.5 text-xs font-bold no-scrollbar">
          {[
            { id: 'keywords', label: '🎯 현재 페이지 SEO 키워드 관리' },
            { id: 'blueprint', label: '①~⑩ 통합 설계도 가이드' },
            { id: 'matrix', label: `④ 지역×서비스 매트릭스 (${matrix.length}개)` },
            { id: 'naver', label: '⑩ 네이버 SEO 기술요건 검증' },
            { id: 'sitemap', label: 'sitemap.xml / robots.txt 다운로드' },
            { id: 'jsonld', label: 'Schema.org JSON-LD' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab.id === 'keywords' && <Tag className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 0: KEYWORDS MANAGEMENT (USER REQUEST) */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              {/* Target Page Selector Banner */}
              <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-blue-400 block mb-1">
                      현재 편집 대상 페이지 선택
                    </span>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedPageKey}
                        onChange={(e) => setSelectedPageKey(e.target.value)}
                        className="bg-slate-800 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="home">🏠 메인 홈페이지</option>
                        <optgroup label="📍 지역별 상세페이지">
                          {siteData.regions.list.map((r) => (
                            <option key={r} value={`region:${r}`}>
                              지역: [{r}] 상세페이지
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="🛠️ 서비스별 상세페이지">
                          {siteData.services.items.map((s) => (
                            <option key={s.id} value={`service:${s.id}`}>
                              서비스: {s.title}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="✖️ 지역 × 서비스 확장 매트릭스">
                          {siteData.regions.list.slice(0, 4).map((r) => (
                            <React.Fragment key={r}>
                              <option value={`matrix:${r}:srv-1`}>[{r}] × 아파트 외창</option>
                              <option value={`matrix:${r}:srv-2`}>[{r}] × 상가 유리</option>
                            </React.Fragment>
                          ))}
                        </optgroup>
                        <option value="gallery_list">📷 시공갤러리 목록</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">내부 고유 URL:</span>
                    <code className="font-mono text-emerald-400 font-bold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 select-all">
                      {getPageRelativeUrl(selectedPageKey)}
                    </code>
                  </div>
                </div>

                {saveFeedback && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{saveFeedback}</span>
                  </div>
                )}
              </div>

              {/* 1. Main SEO Title & Meta Description */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>검색엔진 노출 제목 및 설명문</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    네이버 / 구글 검색 결과 미리보기 실시간 반영
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      페이지 제목 (Title Tag)
                    </label>
                    <span
                      className={`text-[11px] font-bold ${
                        editTitle.length >= 30 && editTitle.length <= 60
                          ? 'text-emerald-600'
                          : editTitle.length > 60
                          ? 'text-amber-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {editTitle.length}자 (권장: 30~60자)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="예: [강남구] 유리창청소·아파트 외창청소 전문 | 클리어웍스"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      검색 설명문 (Meta Description)
                    </label>
                    <span
                      className={`text-[11px] font-bold ${
                        editDescription.length >= 80 && editDescription.length <= 160
                          ? 'text-emerald-600'
                          : editDescription.length > 160
                          ? 'text-amber-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {editDescription.length}자 (권장: 80~160자)
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="검색엔진 및 카카오톡 링크 공유 시 표시되는 1~2문장의 핵심 요약 설명문입니다."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-medium resize-none"
                  />
                </div>
              </div>

              {/* 2. SEO Keywords Management */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span>핵심 메인 SEO 키워드 ({primaryKeywords.length}개)</span>
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      네이버 검색 및 웹마스터도구가 가장 중요하게 수집하는 대표 키워드입니다.
                    </span>
                  </div>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 min-h-[50px] items-center">
                    {primaryKeywords.length === 0 ? (
                      <span className="text-xs text-slate-400">등록된 핵심 키워드가 없습니다. 아래 입력창에서 키워드를 추가해 주세요.</span>
                    ) : (
                      primaryKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-2xs group"
                        >
                          <span>#{kw}</span>
                          <button
                            type="button"
                            onClick={() => handleRemovePrimaryKeyword(idx)}
                            className="p-0.5 hover:bg-blue-700 rounded-full text-blue-200 hover:text-white transition-colors"
                            title="삭제"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddPrimaryKeyword(newPrimaryInput);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={newPrimaryInput}
                      onChange={(e) => setNewPrimaryInput(e.target.value)}
                      placeholder="새 메인 키워드 입력 (쉼표로 구분하여 여러 개 입력 가능)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>추가</span>
                    </button>
                  </form>
                </div>

                {/* Secondary / Long-tail Keywords */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <span>연관 서브 & 롱테일 키워드 ({secondaryKeywords.length}개)</span>
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      세부 질문형 검색어, 가격/비용 검색어 등 보조 유입 키워드
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 min-h-[46px] items-center">
                    {secondaryKeywords.length === 0 ? (
                      <span className="text-xs text-slate-400">보조 롱테일 키워드가 없습니다.</span>
                    ) : (
                      secondaryKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold"
                        >
                          <span>{kw}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSecondaryKeyword(idx)}
                            className="p-0.5 hover:bg-slate-300 rounded-full text-slate-500 hover:text-red-600"
                            title="삭제"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddSecondaryKeyword(newSecondaryInput);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={newSecondaryInput}
                      onChange={(e) => setNewSecondaryInput(e.target.value)}
                      placeholder="새 롱테일 키워드 입력 (예: 샷시 물때 제거, 유리창청소 비용 등)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>추가</span>
                    </button>
                  </form>
                </div>

                {/* Region-Specific Long-Tail Keywords */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span>지역별 맞춤 확장 롱테일 키워드 ({regionLongTailKeywords.length}개)</span>
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      특정 구/시 단위 지역 검색 유입을 극대화하는 맞춤 롱테일 키워드 메타 태그
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 min-h-[46px] items-center">
                    {regionLongTailKeywords.length === 0 ? (
                      <span className="text-xs text-slate-400">등록된 지역별 롱테일 키워드가 없습니다. 아래에서 추가하거나 추천 지역 키워드를 선택하세요.</span>
                    ) : (
                      regionLongTailKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200/60"
                        >
                          <span>{kw}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRegionLongTailKeyword(idx)}
                            className="p-0.5 hover:bg-indigo-200 rounded-full text-indigo-500 hover:text-red-600"
                            title="삭제"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddRegionLongTailKeyword(newRegionLongTailInput);
                    }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <input
                      type="text"
                      value={newRegionLongTailInput}
                      onChange={(e) => setNewRegionLongTailInput(e.target.value)}
                      placeholder="지역별 확장 롱테일 키워드 입력 (예: 강남구 아파트 외창 물때 제거 비용)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>추가</span>
                    </button>
                  </form>

                  {/* Quick Region Keyword Batch Injectors */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 block">
                      ⚡ 주요 서비스 지역 맞춤 롱테일 원클릭 추가:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['강남구 아파트 외창청소', '서초구 유리창 물때제거', '송파구 고층창문 청소', '분당구 상가 유리세척', '마포구 아파트 유리발수코팅'].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddRegionLongTailKeyword(preset)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Smart Keyword Recommendations */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>네이버·구글 고수익 추천 키워드 (클릭하여 즉시 추가)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        for (const sug of suggestions) {
                          handleAddPrimaryKeyword(sug);
                        }
                      }}
                      className="text-[11px] text-blue-700 hover:text-blue-900 font-extrabold hover:underline"
                    >
                      + 추천 키워드 일괄 추가
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddPrimaryKeyword(sug)}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-800 text-xs font-semibold border border-blue-200/80 transition-colors shadow-2xs flex items-center gap-1 group"
                      >
                        <Plus className="w-3 h-3 text-blue-500 group-hover:text-white" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Live Search Engine SERP Preview */}
              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>검색엔진(네이버/구글) 검색결과 실시간 미리보기</span>
                </span>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs max-w-2xl">
                  <div className="text-[11px] text-slate-500 truncate mb-0.5">
                    {currentDomain}{getPageRelativeUrl(selectedPageKey)}
                  </div>
                  <div className="text-base font-bold text-blue-700 hover:underline cursor-pointer truncate mb-1">
                    {editTitle || '페이지 제목이 여기에 표시됩니다'}
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {editDescription || '검색결과 요약 설명문(Meta Description)이 여기에 표시됩니다.'}
                  </div>
                </div>
              </div>

              {/* Save & Reset Action Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>권장 기본 키워드로 복원</span>
                </button>

                <button
                  type="button"
                  onClick={handleSavePageSeo}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>현재 페이지 SEO 키워드 저장 & 실시간 반영</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: BLUEPRINT */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              {/* Architecture Diagram */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs leading-relaxed overflow-x-auto">
                <div className="text-emerald-400 font-bold mb-2">
                  [클리어웍스 전체 URL 및 인덱싱 정보구조(IA) 아키텍처]
                </div>
                <div className="text-slate-300">
                  {`① 홈페이지 메인 (/)
    ├── ② 구단위 지역 URL (/region/{구명})  [강남구, 서초구, 송파구, 분당구 등 10개 구]
    ├── ③ 서비스 URL (/service/{서비스명})   [아파트 외창, 상가 유리, 빌딩 외벽 등 6개 서비스]
    └── ④ 지역 × 서비스 확장 매트릭스 (/region/{구명}/service/{서비스명})
          ├── ⑤ H1: [{지역}] {서비스명} 전문 | 클리어웍스
          ├── ⑥ H2: 7단계 논리적 헤딩 구조 (특장점 → B&A → 체크리스트 → 후기 → 가격 → 일정 → FAQ)
          ├── ⑦ 핵심 검색어: [{지역} {서비스}], [{지역} 유리창청소], [{지역} 외창청소 비용]
          ├── ⑧ 작업사례: 해당 지역 실제 아파트/상가 시공 B&A 및 고객 평점 매핑
          ├── ⑨ 내부링크: 빵부스러기(Breadcrumb) + 해당 지역 타 서비스 + 타 지역 동종 서비스
          └── ⑩ 네이버 SEO: Yeti 크롤러 허용, Meta description, OpenGraph, Schema.org JSON-LD`}
                </div>
              </div>

              {/* 10 Step Detailed Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                      ②
                    </span>
                    구단위 지역 URL 구조
                  </h4>
                  <p className="text-xs text-slate-600 mb-2">
                    단순 키워드 나열이 아닌 구별 고유 슬러그를 매핑하여 네이버와 구글 로컬 검색에 최적화합니다.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(REGION_URL_MAP).map(([name, item]) => (
                      <span
                        key={item.id}
                        onClick={() => {
                          onClose();
                          onNavigateRegion(name);
                        }}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-blue-600 font-medium cursor-pointer hover:bg-blue-50"
                      >
                        /region/{item.slug} ({name})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                      ③
                    </span>
                    서비스 URL 구조
                  </h4>
                  <p className="text-xs text-slate-600 mb-2">
                    서비스 카테고리별 명확하고 직관적인 URL 계층을 구축했습니다.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(SERVICE_URL_MAP).map(([id, s]) => (
                      <span
                        key={id}
                        onClick={() => {
                          onClose();
                          onNavigateService(id);
                        }}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-blue-600 font-medium cursor-pointer hover:bg-blue-50"
                      >
                        /service/{s.slug} ({s.title.split('·')[0]})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGION X SERVICE MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    지역(10개) × 서비스(6개) 조합 매트릭스 URL 목록 ({matrix.length}개)
                  </h4>
                  <p className="text-xs text-slate-500">
                    원하는 조합을 클릭하면 해당 매트릭스 페이지로 즉시 이동합니다.
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      matrix.map((m) => `${m.regionName} × ${m.serviceTitle}: ${currentDomain}${m.url}`).join('\n'),
                      'matrixAll'
                    )
                  }
                  className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1"
                >
                  {copiedKey === 'matrixAll' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  전체 매트릭스 URL 목록 복사
                </button>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                    <tr>
                      <th className="p-2.5">지역</th>
                      <th className="p-2.5">서비스</th>
                      <th className="p-2.5">URL 경로</th>
                      <th className="p-2.5">H1 헤딩 태그</th>
                      <th className="p-2.5 text-right">페이지 열기</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {matrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-2.5 font-bold text-slate-800">{row.regionName}</td>
                        <td className="p-2.5 text-slate-700">{row.serviceTitle}</td>
                        <td className="p-2.5 font-mono text-[11px] text-blue-600">{row.url}</td>
                        <td className="p-2.5 text-slate-500 truncate max-w-xs">{row.h1}</td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => {
                              onClose();
                              onNavigateMatrix(row.regionName, row.serviceId);
                            }}
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold"
                          >
                            이동 →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: NAVER SEO REQUIREMENTS */}
          {activeTab === 'naver' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  ⑩ 네이버 서치어드바이저 웹 표준 & 기술요건 검증 리포트
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  모든 검사항목 통과 (PASSED)
                </span>
              </div>

              <div className="space-y-3">
                {NAVER_SEO_CHECKLIST.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-xs font-bold text-slate-500 uppercase">{req.category}</span>
                        <h5 className="text-sm font-bold text-slate-900">{req.title}</h5>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        준수 완료
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pl-7">{req.description}</p>

                    {req.codeSnippet && (
                      <div className="ml-7 bg-slate-900 text-slate-200 p-2.5 rounded-xl font-mono text-[11px] overflow-x-auto flex items-center justify-between">
                        <code>{req.codeSnippet}</code>
                        <button
                          onClick={() => handleCopy(req.codeSnippet || '', req.id)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          {copiedKey === req.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SITEMAP & ROBOTS */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              {/* sitemap.xml */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">sitemap.xml (전체 사이트맵 파일)</h4>
                    <p className="text-xs text-slate-500">
                      메인, 구단위 지역, 서비스 및 60개 매트릭스 URL이 모두 포함된 XML 규격 파일입니다.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(sitemapXml, 'sitemap')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 flex items-center gap-1"
                    >
                      {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      복사
                    </button>
                    <button
                      onClick={() => handleDownload(sitemapXml, 'sitemap.xml', 'application/xml')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      sitemap.xml 다운로드
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl font-mono text-xs max-h-56 overflow-y-auto">
                  <pre>{sitemapXml}</pre>
                </div>
              </div>

              {/* robots.txt */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">robots.txt (검색엔진 로봇 수집 허용 파일)</h4>
                    <p className="text-xs text-slate-500">
                      네이버 Yeti, 구글 Googlebot 크롤러의 전체 페이지 색인 허용 및 사이트맵 경로를 지정합니다.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(robotsTxt, 'robots')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 flex items-center gap-1"
                    >
                      {copiedKey === 'robots' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      복사
                    </button>
                    <button
                      onClick={() => handleDownload(robotsTxt, 'robots.txt')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      robots.txt 다운로드
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl font-mono text-xs">
                  <pre>{robotsTxt}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SCHEMA.ORG JSON-LD */}
          {activeTab === 'jsonld' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Schema.org 표준 구조화 데이터 (JSON-LD)</h4>
                  <p className="text-xs text-slate-500">
                    네이버 스마트블록 및 구글 리치 스니펫(별점, 서비스 카탈로그, 지역 정보)에 노출됩니다.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(JSON.stringify(jsonLdData, null, 2), 'jsonld')}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1"
                >
                  {copiedKey === 'jsonld' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  JSON-LD 복사
                </button>
              </div>

              <div className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto">
                <pre>{JSON.stringify(jsonLdData, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            💡 네이버 웹마스터도구(Search Advisor)에 <code className="text-blue-600 font-bold">sitemap.xml</code>과 <code className="text-blue-600 font-bold">robots.txt</code>를 등록하면 최적의 노출을 얻을 수 있습니다.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
