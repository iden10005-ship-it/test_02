import React, { useRef } from 'react';
import {
  Pencil,
  Eye,
  Wand2,
  SlidersHorizontal,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Upload,
  RotateCcw,
  Inbox,
  Palette,
  Sparkles,
  Globe,
  FileText,
  MapPin,
  Layers,
} from 'lucide-react';
import { ThemeColor, PageView, ServiceItem } from '../../types/siteData';

interface EditorHeaderBarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  onChangeViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  theme: ThemeColor;
  onChangeTheme: (theme: ThemeColor) => void;
  onOpenBatchFill: () => void;
  onOpenDrawer: () => void;
  onOpenInquiries: () => void;
  onOpenSeoMaster: () => void;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  services?: ServiceItem[];
  regions?: string[];
  inquiryCount: number;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onReset: () => void;
}

export const EditorHeaderBar: React.FC<EditorHeaderBarProps> = ({
  isEditMode,
  onToggleEditMode,
  viewport,
  onChangeViewport,
  theme,
  onChangeTheme,
  onOpenBatchFill,
  onOpenDrawer,
  onOpenInquiries,
  onOpenSeoMaster,
  currentPage,
  onNavigate,
  services = [],
  regions = [],
  inquiryCount,
  onExportJson,
  onImportJson,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportJson(e.target.files[0]);
    }
  };

  const getPageLabel = () => {
    if (currentPage.type === 'home') return '🏠 메인 홈페이지';
    if (currentPage.type === 'service') {
      const s = services.find((item) => item.id === currentPage.serviceId);
      return `🛠️ 서비스: ${s ? s.title : currentPage.serviceId}`;
    }
    if (currentPage.type === 'region') {
      return `📍 지역: [${currentPage.regionName}] 상세`;
    }
    if (currentPage.type === 'matrix') {
      const s = services.find((item) => item.id === currentPage.serviceId);
      return `✖️ [${currentPage.regionName}] × ${s ? s.title.split('·')[0] : ''}`;
    }
    return '페이지';
  };

  return (
    <header className="relative z-20 w-full bg-slate-900 text-white border-b border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Brand, Page Switcher & Mode Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white flex items-center gap-1">
              <span>클리어웍스</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                웹빌더
              </span>
            </span>
          </div>

          {/* Quick Page Switcher Dropdown */}
          <div className="relative">
            <select
              value={
                currentPage.type === 'home'
                  ? 'home'
                  : currentPage.type === 'service'
                  ? `service:${currentPage.serviceId}`
                  : currentPage.type === 'region'
                  ? `region:${currentPage.regionName}`
                  : currentPage.type === 'matrix'
                  ? `matrix:${currentPage.regionName}:${currentPage.serviceId}`
                  : currentPage.type === 'gallery_list'
                  ? 'gallery_list'
                  : currentPage.type === 'gallery_detail'
                  ? `gallery_detail:${currentPage.postId}`
                  : 'home'
              }
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'home') {
                  onNavigate({ type: 'home' });
                } else if (val === 'gallery_list') {
                  onNavigate({ type: 'gallery_list' });
                } else if (val.startsWith('gallery_detail:')) {
                  onNavigate({ type: 'gallery_detail', postId: val.replace('gallery_detail:', '') });
                } else if (val.startsWith('service:')) {
                  onNavigate({ type: 'service', serviceId: val.replace('service:', '') });
                } else if (val.startsWith('region:')) {
                  onNavigate({ type: 'region', regionName: val.replace('region:', '') });
                } else if (val.startsWith('matrix:')) {
                  const [, rName, sId] = val.split(':');
                  onNavigate({ type: 'matrix', regionName: rName, serviceId: sId });
                }
              }}
              className="bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[170px] sm:max-w-[210px] truncate"
            >
              <option value="home">🏠 메인 홈페이지</option>
              <option value="gallery_list">📷 작업갤러리 (블로그)</option>
              <optgroup label="🛠️ 서비스별 상세페이지">
                {services.map((s) => (
                  <option key={s.id} value={`service:${s.id}`}>
                    서비스: {s.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="📍 지역별 상세페이지">
                {regions.map((r) => (
                  <option key={r} value={`region:${r}`}>
                    지역: [{r}] 상세
                  </option>
                ))}
              </optgroup>
              <optgroup label="✖️ 지역 × 서비스 확장 매트릭스">
                {regions.slice(0, 4).map((r) => (
                  <React.Fragment key={r}>
                    <option value={`matrix:${r}:srv-1`}>[{r}] × 아파트 외창</option>
                    <option value={`matrix:${r}:srv-2`}>[{r}] × 상가 유리</option>
                  </React.Fragment>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Mode Switcher Pill */}
          <div className="bg-slate-800/90 p-0.5 rounded-xl border border-slate-700 flex items-center shadow-xs">
            <button
              onClick={onToggleEditMode}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                isEditMode
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">실시간 편집</span>
            </button>
            <button
              onClick={onToggleEditMode}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                !isEditMode
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">방문자 뷰</span>
            </button>
          </div>
        </div>

        {/* Center: Tools (SEO Center, Batch Fill, Settings) */}
        <div className="flex items-center gap-2">
          {/* SEO & Sitemap Master Button */}
          <button
            onClick={onOpenSeoMaster}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
            title="10단계 SEO 설계도 및 sitemap.xml 생성"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>SEO & 사이트맵 마스터</span>
          </button>

          {/* Batch Fill Wizard */}
          <button
            onClick={onOpenBatchFill}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-slate-950 font-black text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
            title="빈칸([대괄호]) 일괄 채우기"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>빈칸 채우기</span>
          </button>

          {/* Full Drawer */}
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            title="전체 섹션 설정"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">설정</span>
          </button>

          {/* Inquiries */}
          <button
            onClick={onOpenInquiries}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors relative"
            title="접수된 견적 문의함"
          >
            <Inbox className="w-3.5 h-3.5 text-cyan-400" />
            {inquiryCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[10px] font-black">
                {inquiryCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Viewport & Export */}
        <div className="flex items-center gap-2">
          {/* Viewport switcher */}
          <div className="hidden lg:flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => onChangeViewport('desktop')}
              className={`p-1.5 rounded transition-colors ${
                viewport === 'desktop' ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-white'
              }`}
              title="데스크톱"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeViewport('tablet')}
              className={`p-1.5 rounded transition-colors ${
                viewport === 'tablet' ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-white'
              }`}
              title="태블릿 (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeViewport('mobile')}
              className={`p-1.5 rounded transition-colors ${
                viewport === 'mobile' ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-white'
              }`}
              title="모바일 (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme switcher */}
          <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-slate-800">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onChangeTheme('blue')}
              className={`w-3.5 h-3.5 rounded-full bg-blue-500 border ${
                theme === 'blue' ? 'border-white scale-110' : 'border-transparent opacity-60'
              }`}
            />
            <button
              onClick={() => onChangeTheme('ocean')}
              className={`w-3.5 h-3.5 rounded-full bg-cyan-600 border ${
                theme === 'ocean' ? 'border-white scale-110' : 'border-transparent opacity-60'
              }`}
            />
            <button
              onClick={() => onChangeTheme('emerald')}
              className={`w-3.5 h-3.5 rounded-full bg-emerald-600 border ${
                theme === 'emerald' ? 'border-white scale-110' : 'border-transparent opacity-60'
              }`}
            />
          </div>

          {/* Backup/Export */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={onExportJson}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="JSON 백업"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="JSON 복원"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => {
                if (confirm('초기 템플릿 상태로 복원하시겠습니까?')) {
                  onReset();
                }
              }}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Mode Notice Banner */}
      {isEditMode && (
        <div className="bg-blue-600/90 text-white text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-t border-blue-500/50">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>
            현재 <strong>{getPageLabel()}</strong> 화면 편집 중입니다. 페이지 텍스트를 클릭하면 즉시 수정됩니다.
          </span>
        </div>
      )}
    </header>
  );
};
