import React from 'react';

interface ProfessionalMediaFrameProps {
  src: string;
  alt: string;
  technical?: boolean;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
}

/** A consistent engineering-media canvas without solid letterbox gutters. */
export const ProfessionalMediaFrame: React.FC<ProfessionalMediaFrameProps> = ({
  src,
  alt,
  technical = false,
  className = '',
  imageClassName = '',
  loading = 'lazy',
}) => (
  <span className={`relative block h-full w-full overflow-hidden ${technical ? 'bg-slate-100' : 'bg-slate-200'} ${className}`}>
    {!technical && (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] scale-110 object-cover opacity-45 blur-2xl saturate-75"
      />
    )}
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`relative z-10 h-full w-full object-contain ${technical ? 'p-1.5 sm:p-2' : ''} ${imageClassName}`}
    />
  </span>
);
