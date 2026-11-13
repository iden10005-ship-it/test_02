import React from 'react';
import { Phone, MessageCircle, MessageSquare, FileText } from 'lucide-react';
import { CompanyInfo } from '../types/siteData';

interface MobileStickyBarProps {
  company: CompanyInfo;
  onOpenQuote?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ company, onOpenQuote }) => {
  const cleanPhone = company.phone.replace(/[^0-9]/g, '');

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (onOpenQuote) {
      e.preventDefault();
      onOpenQuote();
      return;
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      e.preventDefault();
      contactElem.scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <aside
      aria-label="빠른 문의"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* 1. 전화상담 */}
        <a
          href={`tel:${company.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
        >
          <Phone className="w-4 h-4 mb-0.5 text-blue-400" />
          <span className="text-[11px] font-bold leading-tight">전화상담</span>
        </a>

        {/* 2. 카톡상담 */}
        <a
          href={company.kakaoLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FEE500] text-[#3c1e1e] font-bold text-xs hover:brightness-95 active:scale-95 transition-all shadow-xs"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 fill-current" />
          <span className="text-[11px] font-bold leading-tight">카톡상담</span>
        </a>

        {/* 3. 문자상담 */}
        <a
          href={`sms:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 active:scale-95 transition-all shadow-xs"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-100" />
          <span className="text-[11px] font-bold leading-tight">문자상담</span>
        </a>

        {/* 4. 무료견적 */}
        <a
          href="#contact"
          onClick={handleQuoteClick}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-95 transition-all shadow-xs"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">무료견적</span>
        </a>
      </div>
    </aside>
  );
};
