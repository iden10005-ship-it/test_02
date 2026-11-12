import React from 'react';
import { Sparkles, Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { CompanyInfo } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface FooterProps {
  company: CompanyInfo;
  isEditMode: boolean;
  onUpdateCompany: (field: keyof CompanyInfo, value: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  company,
  isEditMode,
  onUpdateCompany,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 pb-24 md:pb-12 text-xs sm:text-sm border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-800/80">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                <EditableText
                  value={company.name}
                  onSave={(val) => onUpdateCompany('name', val)}
                  isEditMode={isEditMode}
                  label="업체명 수정"
                />
              </span>
              <span className="text-xs text-slate-500 block">
                프리미엄 윈도우 케어 & 외벽 청소 솔루션
              </span>
            </div>
          </div>

          {/* Quick links & Back to top */}
          <div className="flex items-center gap-4">
            <a href="#service" className="hover:text-white transition-colors">
              서비스
            </a>
            <a href="#cases" className="hover:text-white transition-colors">
              시공사례
            </a>
            <a href="#price" className="hover:text-white transition-colors">
              가격안내
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              자주 묻는 질문
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
              title="맨 위로"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Business Details info matching markdown */}
        <div className="pt-6 space-y-2 text-slate-500 text-xs leading-relaxed">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <strong className="text-slate-300 font-bold">
              <EditableText
                value={company.name}
                onSave={(val) => onUpdateCompany('name', val)}
                isEditMode={isEditMode}
                label="상호명 수정"
              />
            </strong>
            <span>·</span>
            <span>
              대표: {' '}
              <EditableText
                value={company.representative}
                onSave={(val) => onUpdateCompany('representative', val)}
                isEditMode={isEditMode}
                label="대표자명 수정"
              />
            </span>
            <span>·</span>
            <span>
              사업자등록번호: {' '}
              <EditableText
                value={company.bizNumber}
                onSave={(val) => onUpdateCompany('bizNumber', val)}
                isEditMode={isEditMode}
                label="사업자등록번호 수정"
              />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              사업장 주소: {' '}
              <EditableText
                value={company.address}
                onSave={(val) => onUpdateCompany('address', val)}
                isEditMode={isEditMode}
                label="사업장 주소 수정"
              />
            </span>
            <span>·</span>
            <span>
              전화: {' '}
              <a href={`tel:${company.phone}`} className="text-slate-400 hover:text-white">
                <EditableText
                  value={company.phone}
                  onSave={(val) => onUpdateCompany('phone', val)}
                  isEditMode={isEditMode}
                  label="대표 전화번호 수정"
                />
              </a>
            </span>
            <span>·</span>
            <span>
              운영시간: {' '}
              <EditableText
                value={company.operatingHours}
                onSave={(val) => onUpdateCompany('operatingHours', val)}
                isEditMode={isEditMode}
                label="운영시간 수정"
              />
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-slate-600 gap-2">
            <p>© 2026 {company.name}. All rights reserved.</p>
            <p className="text-[11px]">배상책임보험 가입 업체 | 안전시공 인증</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
