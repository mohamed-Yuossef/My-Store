
import { Link } from "react-router-dom";

type EmptyStateProps = {
  title?: string;
  ctaText?: string;
  to?: string;
  className?: string;
};

export default function EmptyState({
  title = "عربة التسوق فارغة",
  ctaText = "تسوق الآن",
  to = "/products",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[70vh] p-4 text-center ${className}`}
      dir="rtl"
    >
      {/* SVG: عربة تسوق فارغة */}
      <svg
        role="img"
        aria-label="سلة فارغة"
        viewBox="0 0 256 256"
        className="w-64 h-64 mb-4"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopOpacity="0.1" />
            <stop offset="100%" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ظل خفيف */}
        <ellipse cx="128" cy="210" rx="72" ry="10" fill="url(#g1)" />

        {/* جسم العربة */}
        <g stroke="currentColor" strokeWidth="10" fill="none" opacity="0.9">
          <path
            d="M24 48h24l18 96a16 16 0 0 0 16 13h90a16 16 0 0 0 15.5-11.6l20.5-68.4a8 8 0 0 0-7.6-10.3H64"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* مقبض */}
          <path d="M52 64l8 0" strokeLinecap="round" />
          {/* خطوط زخرفية داخل السلة */}
          <path d="M88 104h88M80 136h96" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* العجلات */}
        <g fill="none" stroke="currentColor" strokeWidth="10">
          <circle cx="98" cy="200" r="12" />
          <circle cx="178" cy="200" r="12" />
        </g>

        {/* لمسة ودّية */}
        <g stroke="currentColor" strokeWidth="8" strokeLinecap="round">
          <path d="M118 86c0 8 8 14 10 14s10-6 10-14" opacity="0.35" />
          <path d="M106 176h72" opacity="0.3" />
        </g>
      </svg>

      <p className="text-lg font-medium mb-4">{title}</p>

      <Link
        to={to}
        className="inline-flex items-center justify-center rounded-xl px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm"
      >
        {ctaText}
      </Link>
    </div>
  );
}
