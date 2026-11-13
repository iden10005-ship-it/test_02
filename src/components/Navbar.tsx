import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MessageSquare, FileText, Menu, X, Sparkles, ChevronDown, MapPin, ArrowRight, Lock } from 'lucide-react';
import { CompanyInfo, ServiceItem, PageView } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface NavbarProps {
  company: CompanyInfo;
  services?: ServiceItem[];
  regions?: string[];
  currentPage?: PageView;
  isEditMode: boolean;
  onUpdateCompany: (key: keyof CompanyInfo, value: string) => void;
  onNavigateHome?: () => void;
  onNavigateService?: (serviceId: string) => void;
  onNavigateRegion?: (regionName: string) => void;
  onNavigateGalleryList?: () => void;
  onOpenSeoMaster?: () => void;
  isAdminMode?: boolean;
  onOpenAdminLogin?: () => void;
  onLogoutAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  company,
  services = [],
  regions = [],
  currentPage = { type: 'home' },
  isEditMode,
  onUpdateCompany,
  onNavigateHome,
  onNavigateService,
  onNavigateRegion,
  onNavigateGalleryList,
  onOpenSeoMaster,
  isAdminMode = false,
  onOpenAdminLogin,
  onLogoutAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setServiceDropdownOpen(false);
  };

  const isHome = currentPage.type === 'home';
  const cleanPhone = company.phone.replace(/[^0-9]/g, '');

  const scrollToSection = (sectionId: string) => {
    handleNavClick();
    if (!isHome && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 10);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-lg border-b border-slate-200/90' : 'shadow-xs border-b border-slate-200'
      }`}
    >
      {/* 1. Top Utility Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">
              {company.region ? `${company.region} 전지역 무료 견적 출장` : '서울·수도권 전지역 무료 견적 출장'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden sm:inline">운영시간: {company.operatingHours}</span>
            <a
              href={`tel:${company.phone}`}
              className="font-bold text-white hover:text-blue-400 flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <EditableText
                value={company.phone}
                onSave={(val) => onUpdateCompany('phone', val)}
                isEditMode={isEditMode}
                label="대표 전화번호 수정"
              />
            </a>
            {!isAdminMode && onOpenAdminLogin && (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors pl-2 border-l border-slate-700 font-semibold text-[11px]"
                title="관리자 모드 로그인"
              >
                <Lock className="w-3 h-3 text-blue-400" />
                <span>관리자</span>
              </button>
            )}
            {isAdminMode && onLogoutAdmin && (
              <button
                type="button"
                onClick={onLogoutAdmin}
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-200 transition-colors pl-2 border-l border-slate-700 font-semibold text-[11px]"
                title="관리자 모드 종료"
              >
                <Lock className="w-3 h-3" />
                <span>관리자 모드 종료</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`bg-white/98 backdrop-blur-md px-4 sm:px-6 transition-all duration-200 ${
          isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => {
              handleNavClick();
              if (onNavigateHome) onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                <EditableText
                  value={company.name}
                  onSave={(val) => onUpdateCompany('name', val)}
                  isEditMode={isEditMode}
                  label="업체명 수정"
                />
              </span>
              <span className="text-[10px] text-blue-600 font-bold tracking-wider uppercase -mt-1">
                Glass Cleaning Specialist
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* 1. 홈 */}
            <button
              onClick={() => {
                handleNavClick();
                if (onNavigateHome) onNavigateHome();
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                isHome ? 'text-blue-600 bg-blue-50/70' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              홈
            </button>

            {/* 2. 서비스 Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServiceDropdownOpen(true)}
              onMouseLeave={() => setServiceDropdownOpen(false)}
            >
              <button
                onClick={() => scrollToSection('service')}
                className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1"
              >
                <span>서비스</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {serviceDropdownOpen && services.length > 0 && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider border-b border-slate-100 mb-1">
                    <span>전문 서비스 목록</span>
                  </div>
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        setServiceDropdownOpen(false);
                        if (onNavigateService) onNavigateService(srv.id);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <span>{srv.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. 작업과정 */}
            <button
              onClick={() => scrollToSection('process')}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              작업과정
            </button>

            {/* 4. 작업갤러리 */}
            <button
              onClick={() => {
                handleNavClick();
                if (currentPage.type !== 'home') {
                  if (onNavigateHome) onNavigateHome();
                  setTimeout(() => scrollToSection('gallery'), 50);
                } else {
                  scrollToSection('gallery');
                }
              }}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              작업갤러리
            </button>

            {/* 5. 가격안내 */}
            <button
              onClick={() => scrollToSection('price')}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              가격안내
            </button>

            {/* 6. FAQ */}
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              FAQ
            </button>

            {/* 7. 서비스지역 (홈페이지 순서와 맞춰 FAQ 우측 배치) */}
            <button
              onClick={() => scrollToSection('regions')}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              서비스지역
            </button>

            {/* 8. 무료견적 */}
            <button
              onClick={() => scrollToSection('contact')}
              className="ml-1 px-4 py-2 text-sm font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-xl transition-all border border-blue-200 hover:border-blue-600"
            >
              무료견적
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={company.kakaoLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#fada0a] text-[#3c1e1e] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="카카오톡 1:1 상담"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>카톡 문의</span>
            </a>

            <a
              href={`tel:${company.phone}`}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{company.phone}</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${company.phone}`}
              className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs"
              aria-label="전화 걸기"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto mt-3 rounded-2xl border">
            {/* Quick Navigation Items */}
            <div className="space-y-1 mb-5">
              <button
                onClick={() => {
                  handleNavClick();
                  if (onNavigateHome) onNavigateHome();
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full text-left px-3.5 py-2.5 text-base font-bold text-slate-900 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                🏠 홈으로
              </button>

              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('service');
                }}
                className="w-full text-left px-3.5 py-2.5 text-base font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
              >
                🛠️ 서비스
              </button>

              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('process');
                }}
                className="w-full text-left px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                작업과정
              </button>

              <button
                onClick={() => {
                  handleNavClick();
                  if (currentPage.type !== 'home') {
                    if (onNavigateHome) onNavigateHome();
                    setTimeout(() => scrollToSection('gallery'), 50);
                  } else {
                    scrollToSection('gallery');
                  }
                }}
                className="w-full text-left px-3.5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                작업갤러리
              </button>

              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('price');
                }}
                className="w-full text-left px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                가격안내
              </button>

              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('faq');
                }}
                className="w-full text-left px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                자주 묻는 질문(FAQ)
              </button>

              {/* 서비스지역 */}
              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('regions');
                }}
                className="w-full text-left px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                서비스지역
              </button>

              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('contact');
                }}
                className="w-full text-left px-3.5 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl"
              >
                무료 견적 신청
              </button>
            </div>

            {/* Service Detail Shortcuts */}
            <div className="pt-3 border-t border-slate-100 mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                서비스별 상세페이지 바로가기
              </span>
              <div className="space-y-1">
                {services.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      handleNavClick();
                      if (onNavigateService) onNavigateService(srv.id);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-between"
                  >
                    <span>• {srv.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Contact CTAs (전화상담 / 카톡상담 / 문자상담 / 무료견적) */}
            <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-slate-100">
              <a
                href={`tel:${company.phone}`}
                onClick={handleNavClick}
                className="py-2.5 px-1 rounded-xl bg-slate-900 text-white font-bold text-center text-xs flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] leading-tight">전화상담</span>
              </a>
              <a
                href={company.kakaoLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="py-2.5 px-1 rounded-xl bg-[#FEE500] text-[#3c1e1e] font-bold text-center text-xs flex flex-col items-center justify-center gap-1 shadow-xs hover:brightness-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="text-[11px] leading-tight">카톡상담</span>
              </a>
              <a
                href={`sms:${cleanPhone}`}
                onClick={handleNavClick}
                className="py-2.5 px-1 rounded-xl bg-emerald-600 text-white font-bold text-center text-xs flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-100" />
                <span className="text-[11px] leading-tight">문자상담</span>
              </a>
              <button
                onClick={() => {
                  handleNavClick();
                  scrollToSection('contact');
                }}
                className="py-2.5 px-1 rounded-xl bg-blue-600 text-white font-bold text-center text-xs flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4 text-white" />
                <span className="text-[11px] leading-tight">무료견적</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
