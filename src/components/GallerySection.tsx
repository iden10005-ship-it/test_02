import React from 'react';
import { Sparkles, ArrowRight, MapPin, Calendar, Plus } from 'lucide-react';
import { GalleryPost } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface GallerySectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  posts: GalleryPost[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onViewGalleryList: () => void;
  onSelectPost: (postId: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  posts,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onViewGalleryList,
  onSelectPost,
}) => {
  const latestPosts = posts.slice(0, 6);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Real Field Stories & Work Logs
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              <EditableText
                value={sectionTitle}
                onSave={onUpdateTitle}
                isEditMode={isEditMode}
                label="작업갤러리 섹션 제목 수정"
                tag="span"
              />
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              <EditableText
                value={sectionSubtitle}
                onSave={onUpdateSubtitle}
                isEditMode={isEditMode}
                label="작업갤러리 섹션 부제목 수정"
                tag="span"
              />
            </p>
          </div>

          <button
            onClick={onViewGalleryList}
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-blue-600 font-extrabold text-xs sm:text-sm border border-slate-200 shadow-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <span>전체 작업일지 보러가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Latest 3 Posts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={post.coverImage || post.afterImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold shadow-md">
                      {post.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {post.region}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:bg-blue-50/50 transition-colors">
                <span>자세히 보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
