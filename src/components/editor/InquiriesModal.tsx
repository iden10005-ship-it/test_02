import React, { useState } from 'react';
import { Mail, Phone, Calendar, CheckCircle2, Clock, Trash2, X, Plus, User } from 'lucide-react';
import { InquiryItem } from '../../types/siteData';

interface InquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: InquiryItem[];
  onUpdateStatus: (id: string, status: InquiryItem['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onAddTestInquiry: () => void;
}

export const InquiriesModal: React.FC<InquiriesModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onUpdateStatus,
  onDeleteInquiry,
  onAddTestInquiry,
}) => {
  const [filter, setFilter] = useState<'전체' | InquiryItem['status']>('전체');

  if (!isOpen) return null;

  const filtered = inquiries.filter((inq) => {
    if (filter === '전체') return true;
    return inq.status === filter;
  });

  const getStatusBadge = (status: InquiryItem['status']) => {
    switch (status) {
      case '대기중':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case '연락완료':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '견적발송':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '취소':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">접수된 견적 문의함</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                  총 {inquiries.length}건
                </span>
              </div>
              <p className="text-xs text-slate-400">
                홈페이지 '무료 견적 신청' 폼을 통해 접수된 고객 문의 내역입니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAddTestInquiry}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              테스트 문의 추가
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-xs">
            {(['전체', '대기중', '연락완료', '견적발송'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            {filtered.length}건 표시 중
          </span>
        </div>

        {/* Inquiries List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Mail className="w-12 h-12 mx-auto mb-3 stroke-1 text-slate-300" />
              <p className="text-sm font-semibold">접수된 견적 문의가 없습니다.</p>
              <p className="text-xs text-slate-400 mt-1">
                홈페이지 하단의 무료 견적 신청 폼을 테스트해 보세요.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                {/* Top Row: Name, Phone, Status selector */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">{item.name}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <a
                          href={`tel:${item.phone}`}
                          className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {item.phone}
                        </a>
                        <span>·</span>
                        <span>{item.region}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown & Delete */}
                  <div className="flex items-center gap-2">
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value as InquiryItem['status'])}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="대기중">상태: 대기중</option>
                      <option value="연락완료">상태: 연락완료</option>
                      <option value="견적발송">상태: 견적발송</option>
                      <option value="취소">상태: 취소</option>
                    </select>

                    <button
                      onClick={() => onDeleteInquiry(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      title="문의 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Building type & message */}
                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900">
                    건물 유형: <span className="text-blue-600">{item.buildingType}</span>
                  </div>
                  {item.content && (
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
