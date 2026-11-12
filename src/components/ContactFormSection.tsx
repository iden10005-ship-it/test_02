import React, { useState } from 'react';
import { Send, CheckCircle, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { CompanyInfo, InquiryItem } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface ContactFormSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  successMessage: string;
  company: CompanyInfo;
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateSuccessMessage: (msg: string) => void;
  onSubmitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => void;
  onOpenInquiriesModal?: () => void;
  inquiryCount?: number;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  successMessage,
  company,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateSuccessMessage,
  onSubmitInquiry,
  onOpenInquiriesModal,
  inquiryCount = 0,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    buildingType: '아파트 외창 (베란다/확장형)',
    content: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const buildingOptions = [
    '아파트 외창 (베란다/확장형)',
    '상가·매장 통유리',
    '사무실·오피스 내부/외창',
    '빌딩 외벽 (로프/스카이)',
    '입주·이사 청소 유리창',
    '썬팅/스티커 제거 작업',
    '기타 맞춤 작업',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('성함 또는 상호명을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('연락받으실 전화번호를 입력해 주세요.');
      return;
    }

    setError('');
    onSubmitInquiry({
      name: formData.name,
      phone: formData.phone,
      region: formData.region || company.region,
      buildingType: formData.buildingType,
      content: formData.content,
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      region: '',
      buildingType: '아파트 외창 (베란다/확장형)',
      content: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          {/* Left Side: Brand promise & contact summary */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-6 border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>비대면 사진 견적 가능</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
                빠르고 투명한<br />무료 견적 안내
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                창문 종류와 상태를 남겨주시면 담당 엔지니어가 작업 일정과 합리적인 견적을 꼼꼼히 산출하여 안내해 드립니다.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">직통 전화 상담</span>
                    <a href={`tel:${company.phone}`} className="font-bold hover:text-blue-300 transition-colors">
                      {company.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">운영 시간</span>
                    <span className="font-medium">{company.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">안심 보장</span>
                    <span className="font-medium">영업배상책임보험 1억원 가입</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiries admin test button */}
            {onOpenInquiriesModal && (
              <div className="pt-8 border-t border-slate-800 mt-8">
                <button
                  type="button"
                  onClick={onOpenInquiriesModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-between border border-slate-700 transition-colors"
                >
                  <span>📩 접수된 견적 내역 확인</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    {inquiryCount}건
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                <EditableText
                  value={sectionTitle}
                  onSave={onUpdateTitle}
                  isEditMode={isEditMode}
                  label="견적 신청 섹션 제목 수정"
                  tag="span"
                />
              </h2>
              <p className="text-sm text-slate-600">
                <EditableText
                  value={sectionSubtitle}
                  onSave={onUpdateSubtitle}
                  isEditMode={isEditMode}
                  label="견적 신청 섹션 부제목 수정"
                  tag="span"
                />
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  접수가 완료되었습니다!
                </h4>
                <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
                  <EditableText
                    value={successMessage}
                    onSave={onUpdateSuccessMessage}
                    isEditMode={isEditMode}
                    label="접수 완료 안내문구 수정"
                  />
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    추가 견적 작성하기
                  </button>
                  {onOpenInquiriesModal && (
                    <button
                      type="button"
                      onClick={onOpenInquiriesModal}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      방금 접수된 문의 확인하기 ({inquiryCount}건)
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      이름 / 고객명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-1234-5678"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Region */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      지역 (시·구·동)
                    </label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      placeholder="예: 서울 서초구 반포동"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Building Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      건물 유형
                    </label>
                    <select
                      value={formData.buildingType}
                      onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      {buildingOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    문의 내용 / 희망 작업일
                  </label>
                  <textarea
                    rows={3}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="창문 수량, 대략적인 평수 또는 오염 상태를 간단히 적어주시면 더 신속하게 견적 산출이 가능합니다."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                  무료 견적 신청 완료하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
