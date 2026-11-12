import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { CompanyInfo } from '../types/siteData';

interface MobileStickyBarProps {
  company: CompanyInfo;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ company }) => {
  return (
    <aside
      aria-label="빠른 문의"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call button */}
        <a
          href={`tel:${company.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
        >
          <Phone className="w-4 h-4 mb-0.5 text-blue-400" />
          <span>전화 상담</span>
        </a>

        {/* Kakao button */}
        <a
          href={company.kakaoLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#FEE500] text-[#3c1e1e] font-bold text-xs hover:brightness-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 fill-current" />
          <span>카톡 상담</span>
        </a>

        {/* Quote button */}
        <a
          href="#contact"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>무료 견적</span>
        </a>
      </div>
    </aside>
  );
};
