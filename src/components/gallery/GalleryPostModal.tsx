import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Sparkles, Tag, MapPin, Calendar, User, Wrench, ListChecks } from 'lucide-react';
import { GalleryPost } from '../../types/siteData';
import { PRESET_IMAGES } from '../../data/defaultSiteData';

interface GalleryPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: GalleryPost | null;
  onSave: (postData: GalleryPost) => void;
}

export const GalleryPostModal: React.FC<GalleryPostModalProps> = ({
  isOpen,
  onClose,
  postToEdit,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'아파트' | '상가' | '빌딩' | '간판,어닝청소' | '시트지제거' | string>('아파트');
  const [region, setRegion] = useState('서울 강남구');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('클리어웍스 마스터');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES.aptAfter);
  const [beforeImage, setBeforeImage] = useState(PRESET_IMAGES.aptBefore);
  const [afterImage, setAfterImage] = useState(PRESET_IMAGES.aptAfter);
  const [tagsInput, setTagsInput] = useState('');
  const [equipmentInput, setEquipmentInput] = useState('');
  const [keyPointsInput, setKeyPointsInput] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || '');
      setCategory(postToEdit.category || '아파트');
      setRegion(postToEdit.region || '서울 강남구');
      setDate(postToEdit.date || new Date().toISOString().slice(0, 10).replace(/-/g, '.'));
      setAuthor(postToEdit.author || '클리어웍스 마스터');
      setExcerpt(postToEdit.excerpt || '');
      setCoverImage(postToEdit.coverImage || PRESET_IMAGES.aptAfter);
      setBeforeImage(postToEdit.beforeImage || PRESET_IMAGES.aptBefore);
      setAfterImage(postToEdit.afterImage || PRESET_IMAGES.aptAfter);
      setTagsInput((postToEdit.tags || []).join(', '));
      setEquipmentInput((postToEdit.equipmentUsed || []).join(', '));
      setKeyPointsInput((postToEdit.keyPoints || []).join('\n'));
      setContent(postToEdit.content || '');
    } else {
      // Default new post
      const today = new Date();
      const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(
        today.getDate()
      ).padStart(2, '0')}`;

      setTitle('');
      setCategory('아파트');
      setRegion('서울 강남구');
      setDate(formattedDate);
      setAuthor('클리어웍스 마스터');
      setExcerpt('');
      setCoverImage(PRESET_IMAGES.aptAfter);
      setBeforeImage(PRESET_IMAGES.aptBefore);
      setAfterImage(PRESET_IMAGES.aptAfter);
      setTagsInput('아파트외창, 유리창청소, 클리어웍스');
      setEquipmentInput('독일 Unger 윈도우 스퀴지, 마그네틱 와이퍼');
      setKeyPointsInput('3중 하단 보양 매트 설치\n친환경 폼 세정제 도포\n실내 전용 안전 공법');
      setContent(
        `안녕하세요, 프리미엄 유리창 케어 전문 클리어웍스입니다!\n\n오늘 소개해드릴 현장은 [지역명]에 위치한 [아파트/상가]입니다.\n\n■ 현장 오염 상태\n외부 미세먼지와 비바람으로 인해 유리가 뿌옇게 오염된 상태였습니다.\n\n■ 작업 내용\n1. 아랫집 물 피해 방지 보양 작업\n2. 친환경 약품 반응 및 세척\n3. 마그네틱 스퀴지 세척 및 나노 발수코팅\n\n■ 작업 후기\n창문이 투명하게 정돈되어 고객님께서 크게 만족해주셨습니다!`
      );
    }
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const equipmentArray = equipmentInput
      .split(',')
      .map((eq) => eq.trim())
      .filter((eq) => eq.length > 0);

    const keyPointsArray = keyPointsInput
      .split('\n')
      .map((kp) => kp.trim())
      .filter((kp) => kp.length > 0);

    const newPost: GalleryPost = {
      id: postToEdit ? postToEdit.id : `post-${Date.now()}`,
      title,
      category,
      region,
      date,
      author,
      excerpt: excerpt || title,
      coverImage: coverImage || PRESET_IMAGES.aptAfter,
      beforeImage,
      afterImage,
      tags: tagsArray.length > 0 ? tagsArray : ['유리창청소', '시공후기'],
      equipmentUsed: equipmentArray,
      keyPoints: keyPointsArray,
      content,
    };

    onSave(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                {postToEdit ? '작업일지 (블로그 포스트) 수정' : '새 작업일지 (블로그 포스트) 작성'}
              </h2>
              <p className="text-xs text-slate-400">
                실제 시공 현장 스토리와 전후 사진을 블로그 글처럼 구체적으로 작성하세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* 1. Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              게시글 제목 *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: [서울 강남구] 대치동 아파트 45평 거실 외창 물때 완벽 세척 후기"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-slate-900"
            />
          </div>

          {/* 2. Grid: Category, Region, Date, Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>카테고리</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="아파트">아파트</option>
                <option value="상가">상가</option>
                <option value="빌딩">빌딩</option>
                <option value="간판,어닝청소">간판,어닝청소</option>
                <option value="시트지제거">시트지제거</option>
                <option value="자유일지">자유일지</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>시공 지역</span>
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="예: 서울 강남구"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>작업일자</span>
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2026.03.11"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>작성자</span>
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="클리어웍스 마스터"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 3. Images */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span>사진 이미지 URL 설정 (전후 사진 비교 및 대표 이미지)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">대표(커버) 사진 URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">청소 전 사진 URL</label>
                <input
                  type="text"
                  value={beforeImage}
                  onChange={(e) => setBeforeImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">청소 후 사진 URL</label>
                <input
                  type="text"
                  value={afterImage}
                  onChange={(e) => setAfterImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
              <span className="text-slate-500 font-semibold">추천 프리셋 적용:</span>
              <button
                type="button"
                onClick={() => {
                  setBeforeImage(PRESET_IMAGES.aptBefore);
                  setAfterImage(PRESET_IMAGES.aptAfter);
                  setCoverImage(PRESET_IMAGES.aptAfter);
                }}
                className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold transition-colors"
              >
                아파트 프리셋
              </button>
              <button
                type="button"
                onClick={() => {
                  setBeforeImage(PRESET_IMAGES.storeBefore);
                  setAfterImage(PRESET_IMAGES.storeAfter);
                  setCoverImage(PRESET_IMAGES.storeAfter);
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold transition-colors"
              >
                상가 프리셋
              </button>
              <button
                type="button"
                onClick={() => {
                  setBeforeImage(PRESET_IMAGES.buildingBefore);
                  setAfterImage(PRESET_IMAGES.buildingAfter);
                  setCoverImage(PRESET_IMAGES.buildingAfter);
                }}
                className="px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold transition-colors"
              >
                빌딩 프리셋
              </button>
            </div>
          </div>

          {/* 4. Excerpt (Summary) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              요약 설명 (카드 목록에 노출)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="예: 입주 후 6년간 쌓인 거실 외창 물때를 자성 스퀴지 공법으로 투명 복원했습니다."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 5. Key points & Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <ListChecks className="w-3.5 h-3.5 text-blue-600" />
                <span>주요 작업 포인트 (줄바꿈으로 구분)</span>
              </label>
              <textarea
                rows={3}
                value={keyPointsInput}
                onChange={(e) => setKeyPointsInput(e.target.value)}
                placeholder="아랫집 낙수 방지 3중 보양&#10;친환경 폼 약품 반응 세척&#10;나노 불소 발수 코팅 마감"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>투입된 전문 장비 (쉼표로 구분)</span>
              </label>
              <textarea
                rows={3}
                value={equipmentInput}
                onChange={(e) => setEquipmentInput(e.target.value)}
                placeholder="독일 Unger 윈도우 스퀴지, 마그네틱 와이퍼, 불소 발수코팅제"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 6. Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              해시태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="아파트외창, 강남구유리창청소, 발수코팅, 내돈내산"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 7. Detailed Blog Post Content Body */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              블로그 본문 내용 * (줄바꿈 및 구문 기입 가능)
            </label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="현장 스토리, 오염 원인, 청소 방법, 시공 후 소감을 상세하게 작성하세요."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{postToEdit ? '수정사항 저장' : '작업일지 등록'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
