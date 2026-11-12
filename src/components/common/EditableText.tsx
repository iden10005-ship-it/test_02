import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditMode: boolean;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  label?: string;
  multiline?: boolean;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  isEditMode,
  className = '',
  tag: Tag = 'span',
  label = '텍스트 수정',
  multiline = false,
  placeholder = '내용을 입력하세요',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Sync temp value when props change
  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  if (!isEditMode) {
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  const handleOpenEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(value);
    setIsEditing(true);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <>
      <Tag
        onClick={handleOpenEdit}
        title="클릭하여 수정하기"
        className={`group/edit relative cursor-pointer transition-all duration-150 ${className} hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-500 hover:bg-blue-50/70 hover:rounded-sm`}
      >
        {value || <span className="text-slate-400 italic">{placeholder}</span>}
        <span className="hidden group-hover/edit:inline-flex items-center justify-center ml-1.5 p-0.5 rounded bg-blue-600 text-white text-[10px] align-middle shadow-sm">
          <Pencil className="w-2.5 h-2.5" />
        </span>
      </Tag>

      {/* Quick Edit Popup Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          onClick={handleCancel}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Pencil className="w-4 h-4 text-blue-600" />
                {label}
              </h4>
              <span className="text-xs text-slate-400">ESC 또는 바깥 클릭 취소</span>
            </div>

            <form onSubmit={handleSave}>
              <div className="mb-4">
                {multiline ? (
                  <textarea
                    rows={4}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={placeholder}
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={placeholder}
                    autoFocus
                  />
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                >
                  수정 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
