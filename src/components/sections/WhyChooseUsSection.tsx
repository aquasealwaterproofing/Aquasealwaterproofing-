import React, { useState, useRef, useEffect } from 'react';
import {
  ClipboardCheck,
  ShieldCheck,
  CheckSquare,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Maximize2,
  HardHat,
  RotateCcw
} from 'lucide-react';
import {
  savePersistentVideo,
  getPersistentVideoUrl,
  clearPersistentVideo
} from '../../lib/videoStorage';
import { useAdminMode } from '../../lib/adminAuth';
import defaultWhyAquasealVideo from '../../assets/videos/why-aquaseal-video.mp4';

export const WhyChooseUsSection: React.FC = () => {
  const { isAdmin } = useAdminMode();
  const [videoSrc, setVideoSrc] = useState<string>(defaultWhyAquasealVideo);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [customVideoLoaded, setCustomVideoLoaded] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore persistent custom video if previously selected by user
  useEffect(() => {
    let isMounted = true;
    getPersistentVideoUrl('why-aquaseal').then((savedUrl) => {
      if (isMounted && savedUrl) {
        setVideoSrc(savedUrl);
        setCustomVideoLoaded(true);
        setVideoFailed(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Ensure autoplay works across modern mobile and desktop browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [videoSrc, isMuted]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const immediateUrl = URL.createObjectURL(file);
      setVideoSrc(immediateUrl);
      setVideoFailed(false);
      setCustomVideoLoaded(true);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.src = immediateUrl;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }

      // Save permanently to server backend so shared link and all visitors see it
      const serverUrl = await savePersistentVideo('why-aquaseal', file);
      if (serverUrl && !serverUrl.startsWith('blob:')) {
        setVideoSrc(serverUrl);
      }
      setIsUploading(false);
    }
  };

  const handleResetVideo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await clearPersistentVideo('why-aquaseal');
    setVideoSrc(defaultWhyAquasealVideo);
    setCustomVideoLoaded(false);
    setVideoFailed(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = defaultWhyAquasealVideo;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const benefits = [
    {
      id: 'professional-approach',
      title: 'PROFESSIONAL APPROACH',
      description:
        'Every project begins with understanding the surface condition and waterproofing requirement.',
      icon: <ClipboardCheck className="w-5 h-5 text-[#0A2540]" />,
      detail: 'Site-specific inspection before system recommendation',
    },
    {
      id: 'quality-materials',
      title: 'QUALITY MATERIALS',
      description:
        'We focus on suitable waterproofing systems and quality application practices.',
      icon: <ShieldCheck className="w-5 h-5 text-[#0A2540]" />,
      detail: 'Selected for climate resistance and substrate bonding',
    },
    {
      id: 'attention-to-detail',
      title: 'ATTENTION TO DETAIL',
      description:
        'Surface preparation, crack treatment and application details matter. We focus on the details that support a reliable finish.',
      icon: <CheckSquare className="w-5 h-5 text-[#0A2540]" />,
      detail: 'Corner coving, V-groove infills, and multi-coat curing',
    },
    {
      id: 'clean-systematic-work',
      title: 'CLEAN & SYSTEMATIC WORK',
      description:
        'Organized execution with attention to the property and surrounding areas.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#0A2540]" />,
      detail: 'Clean site management during and after application',
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      {/* Hidden file input for uploading the execution video (Owner/Admin Only) */}
      {isAdmin && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/mp4,video/webm,video/quicktime,video/*"
          className="hidden"
          id="why-aquaseal-video-uploader"
        />
      )}

      {/* Subtle Structural Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#0A2540 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Label & 4 Benefit Blocks */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Lockup */}
            <div>
              {/* Section Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
                WHY AQUASEAL
              </div>

              {/* Geometric Balance Gold Accent Rule */}
              <div className="w-12 h-1 bg-[#FFD700] rounded-xs mb-4" />

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
                Protection That Starts With the Right Solution
              </h2>

              <p className="text-base text-slate-600 font-medium mt-3 leading-relaxed max-w-xl">
                Waterproofing effectiveness depends on surface readiness and methodical chemical placement. We prioritize practical engineering practices tailored to Indian construction conditions.
              </p>
            </div>

            {/* 4 Professional Benefit Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {benefits.map((item, idx) => (
                <div
                  key={item.id}
                  id={`benefit-block-${idx + 1}`}
                  className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#0A2540]/40 transition-all duration-200 flex flex-col justify-between group relative"
                >
                  {/* Subtle top indicator on hover */}
                  <div className="h-0.5 w-0 group-hover:w-full bg-[#FFD700] absolute top-0 left-0 transition-all duration-300 rounded-t-lg" />

                  <div>
                    {/* Icon & Index */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-[#FFD700] transition-colors duration-200 shadow-2xs">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Benefit Title */}
                    <h3 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight uppercase leading-snug mb-2">
                      {item.title}
                    </h3>

                    {/* Benefit Exact Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Supporting Quality Note */}
                  <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#0A2540]" />
                    <span>{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Live On-Site Systematic Execution Video Player */}
          <div className="lg:col-span-5">
            <div className="relative">
              
              {/* Geometric Construction Framing Accents */}
              <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-[#0A2540]/30 rounded-tr-sm pointer-events-none hidden sm:block" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-[#FFD700] rounded-bl-sm pointer-events-none hidden sm:block" />

              {/* Realistic Construction Video & Media Container */}
              <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow-xl shadow-slate-900/20 group flex flex-col">
                
                {/* Top Media Bar: Title & Playback Controls */}
                <div className="bg-[#0A2540] text-white px-3 sm:px-3.5 py-2 flex items-center justify-between border-b border-white/10 shrink-0 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <HardHat className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white truncate">
                      Aquaseal On-Site Execution
                    </span>
                    <span className="hidden xs:inline-block px-1.5 py-0.5 bg-[#FFD700] text-[#0A2540] text-[9px] font-black uppercase rounded-xs shrink-0">
                      Live
                    </span>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="h-6 sm:h-7 px-2 rounded-xs bg-white/15 hover:bg-white/25 text-white flex items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                      <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleMute}
                      className="h-6 sm:h-7 px-2 rounded-xs bg-white/15 hover:bg-white/25 text-white flex items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-3 h-3 text-slate-300" /> : <Volume2 className="w-3 h-3 text-[#FFD700]" />}
                      <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="h-6 sm:h-7 px-1.5 rounded-xs bg-white/15 hover:bg-white/25 text-white flex items-center text-[10px] transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>

                    {/* Owner / Admin Controls */}
                    {isAdmin && (
                      <>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="h-6 sm:h-7 px-2 rounded-xs bg-[#FFD700] hover:bg-[#ffe033] text-[#0A2540] flex items-center gap-1 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                          title="Owner Access: Upload / Change Video"
                        >
                          <Upload className={`w-3 h-3 ${isUploading ? 'animate-bounce' : ''}`} />
                          <span className="hidden md:inline">{isUploading ? 'Saving...' : 'Change'}</span>
                        </button>

                        {customVideoLoaded && (
                          <button
                            type="button"
                            onClick={handleResetVideo}
                            className="h-6 sm:h-7 px-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-slate-300 flex items-center text-[10px] transition-colors cursor-pointer"
                            title="Reset to Default Video"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Video Display Container: 16:9 Aspect Ratio with object-contain */}
                <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                  {videoFailed ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center text-white bg-slate-900">
                      <div
                        onClick={() => {
                          setVideoFailed(false);
                          setVideoSrc(defaultWhyAquasealVideo);
                          if (videoRef.current) {
                            videoRef.current.src = defaultWhyAquasealVideo;
                            videoRef.current.play().catch(() => {});
                          }
                        }}
                        className="w-12 h-12 rounded-full bg-[#FFD700] text-[#0A2540] flex items-center justify-center mb-2 shadow-lg cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-black uppercase text-white">
                        Aquaseal Rooftop Application
                      </h4>
                      <p className="text-[10px] text-slate-300 max-w-xs mt-1">
                        Continuous elastomeric coating over terrace slab
                      </p>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      onError={() => {
                        if (videoSrc !== defaultWhyAquasealVideo) {
                          setVideoSrc(defaultWhyAquasealVideo);
                          setCustomVideoLoaded(false);
                        } else {
                          setVideoFailed(true);
                        }
                      }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onClick={handleTogglePlay}
                      className="w-full h-full object-contain cursor-pointer bg-slate-950"
                    />
                  )}
                </div>

                {/* Bottom Technical Specification Bar */}
                <div className="bg-[#0A2540] text-white px-3 sm:px-3.5 py-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] shrink-0 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-bold text-slate-200 truncate">
                      Seamless membrane • Crack infill • Parapet wall skirting
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded-xs border border-emerald-500/30 shrink-0">
                    100% Waterproof
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
