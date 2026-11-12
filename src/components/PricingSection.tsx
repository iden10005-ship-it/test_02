import React from 'react';
import { Camera, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { PriceRow } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface PricingSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  footerNote: string;
  rows: PriceRow[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateFooterNote: (note: string) => void;
  onUpdateRow: (id: string, field: keyof PriceRow, value: any) => void;
  onAddRow?: () => void;
  onDeleteRow?: (id: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  footerNote,
  rows,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateFooterNote,
  onUpdateRow,
  onAddRow,
  onDeleteRow,
}) => {
  return (
    <section id="price" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 block">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            <EditableText
              value={sectionTitle}
              onSave={onUpdateTitle}
              isEditMode={isEditMode}
              label="가격 섹션 제목 수정"
              tag="span"
            />
          </h2>
          <p className="text-base text-slate-600">
            <EditableText
              value={sectionSubtitle}
              onSave={onUpdateSubtitle}
              isEditMode={isEditMode}
              label="가격 섹션 부제목 수정"
              tag="span"
            />
          </p>
        </div>

        {/* Pricing Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs sm:text-sm font-semibold tracking-wider">
                  <th className="py-4 px-6 sm:px-8">구분</th>
                  <th className="py-4 px-6 sm:px-8">기준</th>
                  <th className="py-4 px-6 sm:px-8 text-right">가격 (VAT 별도)</th>
                  {isEditMode && <th className="py-4 px-4 text-center w-20">관리</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      row.highlight ? 'bg-blue-50/20 font-medium' : ''
                    }`}
                  >
                    <td className="py-5 px-6 sm:px-8 text-slate-900 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <EditableText
                        value={row.category}
                        onSave={(val) => onUpdateRow(row.id, 'category', val)}
                        isEditMode={isEditMode}
                        label="구분명 수정"
                      />
                    </td>
                    <td className="py-5 px-6 sm:px-8 text-slate-600">
                      <EditableText
                        value={row.standard}
                        onSave={(val) => onUpdateRow(row.id, 'standard', val)}
                        isEditMode={isEditMode}
                        label="기준 정보 수정"
                      />
                    </td>
                    <td className="py-5 px-6 sm:px-8 text-right font-extrabold text-blue-600 text-base sm:text-lg">
                      <EditableText
                        value={row.price}
                        onSave={(val) => onUpdateRow(row.id, 'price', val)}
                        isEditMode={isEditMode}
                        label="가격 정보 수정"
                      />
                    </td>
                    {isEditMode && (
                      <td className="py-5 px-4 text-center">
                        {onDeleteRow && rows.length > 1 && (
                          <button
                            onClick={() => onDeleteRow(row.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="행 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button in Edit Mode */}
          {isEditMode && onAddRow && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={onAddRow}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                새 가격 행 추가하기
              </button>
            </div>
          )}
        </div>

        {/* Quick Photo Estimate Banner Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                <EditableText
                  value={footerNote}
                  onSave={onUpdateFooterNote}
                  isEditMode={isEditMode}
                  label="사진 견적 안내문구 수정"
                />
              </h4>
              <p className="text-xs sm:text-sm text-blue-100">
                창문 전경 사진 2~3장을 보내주시면 10분 내에 정확한 견적을 안내해 드립니다.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shrink-0 hover:bg-blue-50 transition-colors shadow-md shadow-black/10"
          >
            사진 견적 문의하기
          </a>
        </div>
      </div>
    </section>
  );
};
