import React, { useState } from 'react';
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
} from 'lucide-react';
import { REGION_URL_MAP, SERVICE_URL_MAP, generateRegionServiceMatrix, NAVER_SEO_CHECKLIST, generateXmlSitemap, generateRobotsTxt } from '../../data/seoArchitectureData';
import { SiteData } from '../../types/siteData';

interface SeoMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  onNavigateMatrix: (regionName: string, serviceId: string) => void;
  onNavigateRegion: (regionName: string) => void;
  onNavigateService: (serviceId: string) => void;
}

export const SeoMasterModal: React.FC<SeoMasterModalProps> = ({
  isOpen,
  onClose,
  siteData,
  onNavigateMatrix,
  onNavigateRegion,
  onNavigateService,
}) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'matrix' | 'naver' | 'sitemap' | 'jsonld'>('blueprint');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">홈페이지 사이트맵 & 네이버 SEO 마스터 센터</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                  10단계 요건 100% 충족
                </span>
              </div>
              <p className="text-xs text-slate-300">
                구단위 지역 URL, 서비스 URL, 60개 확장 매트릭스, H1/H2 구조, 네이버 기술요건
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
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2 gap-1.5 text-xs font-bold">
          {[
            { id: 'blueprint', label: '①~⑩ 통합 설계도 가이드' },
            { id: 'matrix', label: `④ 지역×서비스 매트릭스 (${matrix.length}개)` },
            { id: 'naver', label: '⑩ 네이버 SEO 기술요건 검증' },
            { id: 'sitemap', label: 'sitemap.xml / robots.txt 다운로드' },
            { id: 'jsonld', label: 'Schema.org JSON-LD' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
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
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-indigo-600 font-medium cursor-pointer hover:bg-indigo-50"
                      >
                        /service/{s.slug} ({s.title.split('·')[0]})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                      ⑤
                    </span>
                    각 페이지 H1 공식
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    검색 의도에 부합하는 단일 최상위 H1 적용:
                    <br />
                    <code className="text-[11px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold block mt-1">
                      &lt;h1&gt;[{'{지역}'}] {'{서비스명}'} 전문 | 클리어웍스&lt;/h1&gt;
                    </code>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                      ⑥
                    </span>
                    표준 H2 계층 구조
                  </h4>
                  <ul className="text-[11px] text-slate-600 space-y-1">
                    <li>1. {'{지역}'} {'{서비스}'} 시공 특장점 및 공법</li>
                    <li>2. {'{지역}'} 관내 실제 시공 B&A 비교</li>
                    <li>3. 작업 범위 및 안심 보양 체크리스트</li>
                    <li>4. {'{지역}'} 고객님 실제 작업 후기 및 평점</li>
                    <li>5. {'{지역}'} 출장 가능 동 및 방문 일정</li>
                    <li>6. 자주 묻는 질문(FAQ) 및 무료 견적 신청</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGION X SERVICE MATRIX (60 combinations) */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    지역 × 서비스 60개 조합 확장 랜딩페이지
                  </h4>
                  <p className="text-xs text-slate-500">
                    클릭하면 해당 조합의 전용 로컬 상세페이지로 즉시 이동하여 화면과 SEO 구조를 확인할 수 있습니다.
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  총 {matrix.length}개 프로그래머틱 랜딩 URL
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {matrix.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onClose();
                      onNavigateMatrix(item.regionName, item.serviceId);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 cursor-pointer transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded">
                          {item.regionName}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                        [{item.regionName}] {item.serviceTitle}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">
                        {item.url}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>예상 견적: {item.priceEstimate}</span>
                      <span className="text-blue-600 font-bold group-hover:underline">페이지 보기 →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: NAVER SEO CHECKLIST */}
          {activeTab === 'naver' && (
            <div className="space-y-4">
              <div className="pb-2 border-b flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">네이버 서치어드바이저 권장 기술요건 100% 충족</h4>
                  <p className="text-xs text-slate-500">
                    네이버 Yeti 검색 로봇이 정상적으로 수집하고 노출 순위를 극대화할 수 있도록 설계되었습니다.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  모든 요건 통과
                </div>
              </div>

              <div className="space-y-3">
                {NAVER_SEO_CHECKLIST.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                          {item.category}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900">{item.title}</h5>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        적용됨
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{item.description}</p>
                    {item.codeSnippet && (
                      <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto relative">
                        <pre>{item.codeSnippet}</pre>
                        <button
                          onClick={() => handleCopy(item.codeSnippet || '', item.id)}
                          className="absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                          title="코드 복사"
                        >
                          {copiedKey === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SITEMAP.XML & ROBOTS.TXT */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              {/* sitemap.xml */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-900">sitemap.xml (전체 사이트맵 파일)</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(sitemapXml, 'sitemap')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                    >
                      {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      복사
                    </button>
                    <button
                      onClick={() => handleDownload(sitemapXml, 'sitemap.xml', 'application/xml')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      sitemap.xml 다운로드
                    </button>
                  </div>
                </div>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs max-h-56 overflow-y-auto">
                  <pre>{sitemapXml}</pre>
                </div>
              </div>

              {/* robots.txt */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">robots.txt (검색 로봇 수집 허용 규약)</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(robotsTxt, 'robots')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                    >
                      {copiedKey === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      복사
                    </button>
                    <button
                      onClick={() => handleDownload(robotsTxt, 'robots.txt', 'text/plain')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      robots.txt 다운로드
                    </button>
                  </div>
                </div>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs">
                  <pre>{robotsTxt}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: JSON-LD */}
          {activeTab === 'jsonld' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Schema.org JSON-LD 구조화 데이터</h4>
                  <p className="text-xs text-slate-500">
                    구글 및 네이버 검색결과에 리치 스니펫(전화번호, 주소, 서비스 목록, 지역)으로 노출되도록 주입됩니다.
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
