import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Link2, Share2 } from 'lucide-react';

interface InternalUrlBarProps {
  path: string; // e.g. '#/region/강남구' or '#/service/srv-1'
  title?: string;
  subtitle?: string;
  className?: string;
}

export const InternalUrlBar: React.FC<InternalUrlBarProps> = ({
  path,
  title = '세부페이지 고유 URL (내부 주소)',
  subtitle = '네이버 블로그, 스마트플레이스, 카카오톡 상담에 이 주소를 첨부하면 해당 세부페이지로 즉시 연결됩니다.',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  // Compute full URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  // Normalize base
  const cleanBase = `${origin}${pathname.endsWith('/') ? pathname : pathname + '/'}`.replace(/\/+$/, '/');
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const fullUrl = `${cleanBase}${cleanPath}`;
  const displayRelative = path.startsWith('#') ? `/${path}` : `/#/${path}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`bg-slate-900 text-white rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <Link2 className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">{title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                상세페이지 직통 링크
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <code className="font-mono text-emerald-400 font-bold text-xs sm:text-sm truncate select-all">
                {showFull ? fullUrl : displayRelative}
              </code>
              <button
                type="button"
                onClick={() => setShowFull(!showFull)}
                className="text-[10px] text-slate-400 hover:text-white underline shrink-0"
              >
                {showFull ? '상대경로 보기' : '전체 도메인 보기'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>주소 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>URL 주소 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/80 leading-relaxed">
          💡 {subtitle}
        </p>
      )}
    </div>
  );
};
