import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  ArrowRight,
  MapPin,
  Calendar,
  User,
  Tag,
  Edit2,
  Trash2,
  Home,
  Store,
  Building2,
  Grid,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Layers,
} from 'lucide-react';
import { GalleryPost, CompanyInfo } from '../../types/siteData';
import { GalleryPostModal } from '../gallery/GalleryPostModal';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

interface GalleryListPageProps {
  posts: GalleryPost[];
  company: CompanyInfo;
  isEditMode: boolean;
  onBackHome: () => void;
  onSelectPost: (postId: string) => void;
  onAddPost: (newPost: GalleryPost) => void;
  onUpdatePost: (updatedPost: GalleryPost) => void;
  onDeletePost: (postId: string) => void;
}

export const GalleryListPage: React.FC<GalleryListPageProps> = ({
  posts,
  company,
  isEditMode,
  onBackHome,
  onSelectPost,
  onAddPost,
  onUpdatePost,
  onDeletePost,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postToEdit, setPostToEdit] = useState<GalleryPost | null>(null);

  // Category matching
  const matchesCategory = (itemCat: string, targetTab: string) => {
    if (targetTab === '전체') return true;
    if (!itemCat) return false;
    const cat = itemCat.trim().toLowerCase();
    if (targetTab === '아파트') return cat.includes('아파트') || cat.includes('주택');
    if (targetTab === '상가') return cat.includes('상가') || cat.includes('매장') || cat.includes('점포');
    if (targetTab === '빌딩') return cat.includes('빌딩') || cat.includes('외벽');
    if (targetTab === '간판,어닝청소') return cat.includes('간판') || cat.includes('어닝');
    if (targetTab === '시트지제거') return cat.includes('시트지') || cat.includes('썬팅') || cat.includes('스티커') || cat.includes('필름');
    return cat.includes(targetTab.toLowerCase());
  };

  // Filter posts by active category tab
  const filteredPosts = posts.filter((post) => matchesCategory(post.category, activeCategory));

  const TABS = [
    { id: '전체', label: '전체일지', icon: Grid },
    { id: '아파트', label: '아파트', icon: Home },
    { id: '상가', label: '상가', icon: Store },
    { id: '빌딩', label: '빌딩', icon: Building2 },
    { id: '간판,어닝청소', label: '간판·어닝청소', icon: Wrench },
    { id: '시트지제거', label: '시트지제거', icon: Layers },
  ];

  const handleOpenCreateModal = () => {
    setPostToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: GalleryPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostToEdit(post);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말 이 작업일지 게시글을 삭제하시겠습니까?')) {
      onDeletePost(postId);
    }
  };

  const handleSavePostModal = (postData: GalleryPost) => {
    if (postToEdit) {
      onUpdatePost(postData);
    } else {
      onAddPost(postData);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={onBackHome} className="hover:text-blue-600 transition-colors">
            홈
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-800">작업 갤러리 (현장일지)</span>
        </nav>

        {/* Hero Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Field Stories & Work Logs</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              클리어웍스 현장 작업 갤러리
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              아파트 외창부터 상가·빌딩 외벽까지, 실제 현장에서 직접 시공한 전후 결과와
              클리어웍스만의 세척 노하우를 생생한 블로그 일지로 만나보세요.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleOpenCreateModal}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>새 작업일지 작성하기</span>
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% 직접 시공한 현장 사진만 게재합니다</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Blog Post List Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post.id)}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={post.coverImage || post.afterImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Badges on image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold shadow-md">
                        {post.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        {post.region}
                      </span>
                    </div>

                    {/* Admin Action Overlay */}
                    {isEditMode && (
                      <div className="absolute top-3 right-3 z-20 flex gap-1 bg-black/70 backdrop-blur-md p-1 rounded-xl">
                        <button
                          onClick={(e) => handleOpenEditModal(post, e)}
                          className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                          title="글 수정"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(post.id, e)}
                          className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
                          title="글 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:bg-blue-50/50 transition-colors">
                  <span>작업일지 상세 읽기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">검색된 작업일지가 없습니다</h3>
            <p className="text-xs text-slate-500 mb-6">
              다른 카테고리나 검색어로 검색하시거나 새로운 작업일지를 작성해보세요.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>새 작업일지 작성하기</span>
            </button>
          </div>
        )}
      </div>

      {/* Post Creator/Editor Modal */}
      <GalleryPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postToEdit={postToEdit}
        onSave={handleSavePostModal}
      />
    </div>
  );
};
