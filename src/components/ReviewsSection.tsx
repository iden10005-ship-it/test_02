import React from 'react';
import { Star, Quote, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface ReviewsSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  reviews: ReviewItem[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateReview: (id: string, field: keyof ReviewItem, value: any) => void;
  onAddReview?: () => void;
  onDeleteReview?: (id: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  reviews,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateReview,
  onAddReview,
  onDeleteReview,
}) => {
  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 block">
            Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            <EditableText
              value={sectionTitle}
              onSave={onUpdateTitle}
              isEditMode={isEditMode}
              label="고객 후기 섹션 제목 수정"
              tag="span"
            />
          </h2>
          <p className="text-base text-slate-600">
            <EditableText
              value={sectionSubtitle}
              onSave={onUpdateSubtitle}
              isEditMode={isEditMode}
              label="고객 후기 섹션 부제목 수정"
              tag="span"
            />
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/90 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Content */}
                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-6">
                  <EditableText
                    value={review.content}
                    onSave={(val) => onUpdateReview(review.id, 'content', val)}
                    isEditMode={isEditMode}
                    label="후기 본문 내용 수정"
                    multiline
                  />
                </blockquote>
              </div>

              {/* Author & Tag Footer */}
              <div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <EditableText
                        value={review.author}
                        onSave={(val) => onUpdateReview(review.id, 'author', val)}
                        isEditMode={isEditMode}
                        label="고객명/지역 수정"
                      />
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 inline shrink-0" />
                    </div>
                    {review.tag && (
                      <span className="text-xs text-slate-500 font-medium">
                        {review.tag}
                      </span>
                    )}
                  </div>

                  {isEditMode && onDeleteReview && reviews.length > 1 && (
                    <button
                      onClick={() => onDeleteReview(review.id)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Review in Edit Mode */}
          {isEditMode && onAddReview && (
            <button
              onClick={onAddReview}
              className="rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/60 p-6 flex flex-col items-center justify-center text-blue-600 gap-2 min-h-[220px] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm">새 고객 후기 추가하기</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
