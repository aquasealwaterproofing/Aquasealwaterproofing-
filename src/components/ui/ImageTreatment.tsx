import React from 'react';
import { ImageTreatmentProps } from '../../types';

export const ImageTreatment: React.FC<ImageTreatmentProps> = ({
  src,
  alt,
  aspectRatio = '16:9',
  caption,
  tag,
  className = '',
  id,
}) => {
  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
  }[aspectRatio];

  return (
    <figure
      id={id}
      className={`relative overflow-hidden rounded-xl border border-slate-200/90 bg-slate-100 shadow-xs group ${className}`.trim()}
    >
      <div className={`w-full overflow-hidden ${aspectClasses}`}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {tag && (
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-[#0A2540]/90 text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-[2px]">
            {tag}
          </span>
        </div>
      )}

      {caption && (
        <figcaption className="p-3.5 bg-white border-t border-slate-100 text-xs font-medium text-slate-600 flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
            {aspectRatio}
          </span>
        </figcaption>
      )}
    </figure>
  );
};
