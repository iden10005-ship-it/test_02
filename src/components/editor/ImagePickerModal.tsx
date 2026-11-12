import React, { useState } from 'react';
import { X, Image as ImageIcon, Check, Sparkles } from 'lucide-react';
import { PRESET_IMAGES } from '../../data/defaultSiteData';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeImage: string;
  afterImage: string;
  onSave: (beforeImage: string, afterImage: string) => void;
  title?: string;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  beforeImage: initialBefore,
  afterImage: initialAfter,
  onSave,
  title = '전후 비교 사진 교체',
}) => {
  const [before, setBefore] = useState(initialBefore);
  const [after, setAfter] = useState(initialAfter);

  if (!isOpen) return null;

  const presets = [
    {
      label: '파노라마 아파트 외창 (강추)',
      before: PRESET_IMAGES.beforeHero,
      after: PRESET_IMAGES.afterHero,
    },
    {
      label: '일반 아파트 베란다 창틀/유리',
      before: PRESET_IMAGES.aptBefore,
      after: PRESET_IMAGES.aptAfter,
    },
    {
      label: '상가 1층 매장 전면 통유리',
      before: PRESET_IMAGES.storeBefore,
      after: PRESET_IMAGES.storeAfter,
    },
    {
      label: '고층 빌딩/오피스 외부 유리',
      before: PRESET_IMAGES.buildingBefore,
      after: PRESET_IMAGES.buildingAfter,
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(before, after);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">{title}</h3>
              <p className="text-xs text-slate-400">프리셋을 선택하거나 이미지 URL을 직접 입력하세요.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              추천 유리창 청소 고화질 프리셋
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setBefore(preset.before);
                    setAfter(preset.after);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 mb-1">
                    {preset.label}
                  </div>
                  <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden h-14">
                    <img src={preset.before} alt="전" className="w-full h-full object-cover" />
                    <img src={preset.after} alt="후" className="w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleApply} className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                청소 전 (Before) 이미지 URL
              </label>
              <input
                type="url"
                required
                value={before}
                onChange={(e) => setBefore(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                청소 후 (After) 이미지 URL
              </label>
              <input
                type="url"
                required
                value={after}
                onChange={(e) => setAfter(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Preview Box */}
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-100 rounded-xl">
              <div>
                <span className="text-[10px] font-bold text-slate-500 block mb-1">Before 미리보기</span>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200">
                  <img src={before} alt="Before preview" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 block mb-1">After 미리보기</span>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200">
                  <img src={after} alt="After preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                사진 적용하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
