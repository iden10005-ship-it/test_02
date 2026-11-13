import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { DEFAULT_ADMIN_PIN } from '../../utils/adminAuth';

interface AdminLoginModalProps {
  isOpen: boolean;
  expectedPin?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  expectedPin,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const targetPin = (expectedPin && expectedPin.trim()) || DEFAULT_ADMIN_PIN;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === targetPin) {
      setError('');
      onSuccess();
    } else {
      setError('관리자 비밀번호가 올바르지 않습니다.');
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight">관리자 모드 로그인</h3>
              <p className="text-[11px] text-slate-400">웹빌더 및 사이트 편집 권한 인증</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            관리자 인증 후 상단 웹빌더 도구, 문구 실시간 편집, SEO 키워드 관리 및 접수된 견적 문의를 확인할 수 있습니다.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              관리자 비밀번호
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError('');
                }}
                placeholder="비밀번호를 입력하세요"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPin((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                aria-label={showPin ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>관리자 모드 입장</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition-colors"
            >
              일반 화면으로 돌아가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
