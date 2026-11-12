import React, { useState } from 'react';
import {
  ChevronRight,
  MapPin,
  Calendar,
  User,
  Sparkles,
  ArrowLeft,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Edit2,
  Share2,
  Send,
  HelpCircle,
} from 'lucide-react';
import { GalleryPost, CompanyInfo, InquiryItem } from '../../types/siteData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { GalleryPostModal } from '../gallery/GalleryPostModal';

interface GalleryDetailPageProps {
  post: GalleryPost;
  allPosts: GalleryPost[];
  company: CompanyInfo;
  isEditMode: boolean;
  onBackToList: () => void;
  onSelectPost: (postId: string) => void;
  onUpdatePost: (updatedPost: GalleryPost) => void;
  onSubmitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => void;
}

export const GalleryDetailPage: React.FC<GalleryDetailPageProps> = ({
  post,
  allPosts,
  company,
  isEditMode,
  onBackToList,
  onSelectPost,
  onUpdatePost,
  onSubmitInquiry,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [buildingType, setBuildingType] = useState('아파트 외창 케어');
  const [contentMsg, setContentMsg] = useState(
    `[${post.region}] ${post.title} 작업일지를 보고 견적 문의드립니다.`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('성함과 연락처를 작성해 주세요.');
      return;
    }

    setIsSubmitting(true);
    onSubmitInquiry({
      name,
      phone,
      region: post.region,
      buildingType,
      content: contentMsg,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySubmitted(true);
    }, 400);
  };

  // Other posts for sidebar / footer
  const otherPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBackToList}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>작업갤러리 목록으로 돌아가기</span>
          </button>

          {isEditMode && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>이 게시글 수정하기</span>
            </button>
          )}
        </div>

        {/* Main Article Card */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          {/* Header Banner */}
          <div className="p-6 sm:p-10 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-sm">
                {post.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1 border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {post.region}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>작성일자: {post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>시공담당: {post.author}</span>
              </span>
            </div>
          </div>

          {/* Visual Showcase: Before / After Comparison */}
          {post.beforeImage && post.afterImage ? (
            <div className="p-6 sm:p-8 bg-slate-900 border-y border-slate-800">
              <div className="text-center mb-4">
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase block mb-1">
                  Before & After Visual Comparison
                </span>
                <p className="text-xs text-slate-300">
                  슬라이더바를 좌우로 드래그하여 청소 전후 차이를 확인하세요.
                </p>
              </div>
              <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <BeforeAfterSlider
                  beforeImage={post.beforeImage}
                  afterImage={post.afterImage}
                  beforeLabel="청소 전 오염"
                  afterLabel="청소 후 클리어뷰"
                  aspectRatio="aspect-[16/10]"
                />
              </div>
            </div>
          ) : post.coverImage ? (
            <div className="aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          ) : null}

          {/* Article Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Highlights Callout Box */}
            {post.keyPoints && post.keyPoints.length > 0 && (
              <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm border-b border-blue-200/60 pb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>이번 현장의 주요 작업 포인트</span>
                </div>
                <ul className="space-y-2">
                  {post.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Equipment Used Badges */}
            {post.equipmentUsed && post.equipmentUsed.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-500 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  투입된 전문 장비:
                </span>
                {post.equipmentUsed.map((eq, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold border border-slate-200/80"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            )}

            {/* Content Text Body */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Floating / Bottom Quick Quote Request Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-extrabold text-blue-300 uppercase tracking-wider block mb-2">
              Free Quote Inquiry
            </span>
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              [{post.region}] 유사 시공 견적이 궁금하신가요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
              사진 1장이면 당일 무료 방문 실측 및 견적 안내가 가능합니다. 부담 없이 문의하세요!
            </p>

            {inquirySubmitted ? (
              <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-6 text-center text-white">
                <ShieldCheck className="w-10 h-10 text-emerald-300 mx-auto mb-2" />
                <h4 className="font-extrabold text-base mb-1">견적 문의가 정상 접수되었습니다!</h4>
                <p className="text-xs text-slate-200">
                  담당 마스터가 현장 내용 확인 후 빠르게 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함 *"
                    className="px-4 py-2.5 rounded-xl bg-white/90 text-slate-900 text-xs font-bold placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="연락처 *"
                    className="px-4 py-2.5 rounded-xl bg-white/90 text-slate-900 text-xs font-bold placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? '접수 중...' : '무료 견적 신청하기'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Other Recent Work Stories */}
        {otherPosts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">
              클리어웍스의 다른 작업일지 둘러보기
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherPosts.map((other) => (
                <div
                  key={other.id}
                  onClick={() => onSelectPost(other.id)}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden mb-3">
                    <img
                      src={other.coverImage || other.afterImage}
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 block mb-1">
                    [{other.region}] · {other.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                    {other.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <GalleryPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        postToEdit={post}
        onSave={(updated) => {
          onUpdatePost(updated);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
};
