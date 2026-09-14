import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Brush,
  Droplets,
  CheckCircle2,
  Calendar,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  HardHat,
  ShieldCheck,
  Maximize2,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import {
  savePersistentVideo,
  getPersistentVideoUrl,
  clearPersistentVideo
} from '../../lib/videoStorage';
import { useAdminMode } from '../../lib/adminAuth';

interface ProcessSectionProps {
  onOpenInspectionModal: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onOpenInspectionModal,
}) => {
  const { isAdmin } = useAdminMode();
  const [videoSrc, setVideoSrc] = useState<string>('./process-video.mp4');
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
    getPersistentVideoUrl('process').then((savedUrl) => {
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

  const steps = [
    {
      number: '01',
      title: 'SITE INSPECTION',
      description:
        'We assess the affected area, surface condition and visible moisture or seepage concerns.',
      icon: <Search className="w-5 h-5" />,
      detail: 'Visual check & dampness evaluation',
    },
    {
      number: '02',
      title: 'SURFACE PREPARATION',
      description:
        'The surface is prepared appropriately before waterproofing work begins.',
      icon: <Brush className="w-5 h-5" />,
      detail: 'Debris removal & crack opening',
    },
    {
      number: '03',
      title: 'WATERPROOFING APPLICATION',
      description:
        'The selected waterproofing system is applied according to the project requirements.',
      icon: <Droplets className="w-5 h-5" />,
      detail: 'Methodical coating & joint sealing',
    },
    {
      number: '04',
      title: 'FINAL CHECK',
      description:
        'The completed area is reviewed for finish quality and visible application issues.',
      icon: <CheckCircle2 className="w-5 h-5" />,
      detail: 'Comprehensive application inspection',
    },
  ];

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
      const serverUrl = await savePersistentVideo('process', file);
      if (serverUrl && !serverUrl.startsWith('blob:')) {
        setVideoSrc(serverUrl);
      }
      setIsUploading(false);
    }
  };

  const handleResetVideo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await clearPersistentVideo('process');
    setVideoSrc('./process-video.mp4');
    setCustomVideoLoaded(false);
    setVideoFailed(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = './process-video.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      id="process"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20"
    >
      {/* Hidden file input for uploading the user's execution video (Owner/Admin Only) */}
      {isAdmin && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/mp4,video/webm,video/quicktime,video/*"
          className="hidden"
          id="process-video-uploader"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
            OUR PROCESS
          </div>

          {/* Geometric Balance Gold Accent Rule */}
          <div className="w-12 h-1 bg-[#FFD700] rounded-xs mx-auto mb-4" />

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
            From Inspection to Protection
          </h2>

          <p className="text-base text-slate-600 font-medium mt-3 leading-relaxed max-w-xl mx-auto">
            A transparent and methodical approach to diagnosing water ingress and executing suitable protective treatments.
          </p>
        </div>

        {/* Process Steps: Desktop Horizontal, Mobile Vertical Timeline */}
        <div className="relative">
          
          {/* Desktop Connecting Line (Hidden on Mobile) */}
          <div
            className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-slate-200 z-0"
            aria-hidden="true"
          />

          {/* Steps Container: Vertical Timeline on Mobile (border-l), Grid on Tablet & Desktop */}
          <div className="relative z-10 border-l-2 border-slate-200 ml-2 xs:ml-4 pl-4 xs:pl-6 space-y-6 xs:space-y-8 md:border-l-0 md:ml-0 md:pl-0 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                id={`process-step-${step.number}`}
                className="group relative bg-[#F8FAFC] border border-slate-200/90 rounded-lg p-4 xs:p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#0A2540]/40 transition-all duration-200"
              >
                {/* Mobile Timeline Node (Positioned on the border-l line) */}
                <div
                  className="md:hidden absolute -left-[25px] xs:-left-[33px] top-6 w-4 h-4 xs:w-5 xs:h-5 rounded-full bg-white border-4 border-[#0A2540]"
                  aria-hidden="true"
                />

                {/* Top Accent Line on Hover */}
                <div className="h-1 w-0 group-hover:w-full bg-[#FFD700] absolute top-0 left-0 transition-all duration-300 rounded-t-lg" />

                <div>
                  {/* Step Marker & Icon Header */}
                  <div className="flex items-center justify-between mb-4 xs:mb-5">
                    <span className="w-9 h-9 xs:w-11 xs:h-11 rounded-sm bg-[#0A2540] text-[#FFD700] flex items-center justify-center font-black text-xs xs:text-sm tracking-wider shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      {step.number}
                    </span>

                    <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-sm bg-white border border-slate-200 text-[#0A2540] flex items-center justify-center shadow-2xs group-hover:bg-blue-50 transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight uppercase leading-snug mb-1.5 xs:mb-2">
                    STEP {step.number} — {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Sub-detail Pill */}
                <div className="pt-3 mt-4 xs:mt-5 border-t border-slate-200/80 text-[10px] xs:text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                  <span>{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SYSTEMATIC EXECUTION: Live Site Video Showcase Block */}
        <div className="mt-14 sm:mt-20 bg-[#0A2540] rounded-xl overflow-hidden border border-slate-700 shadow-xl text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
            
            {/* Left/Top: Video Player Container (7 cols on tablet/desktop) */}
            <div className="md:col-span-7 relative bg-slate-950 flex flex-col justify-between overflow-hidden group">
              
              {/* Top Media Bar: Title & Playback Controls */}
              <div className="bg-[#0A2540] text-white px-3 sm:px-3.5 py-2 flex items-center justify-between border-b border-white/10 shrink-0 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <HardHat className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white truncate">
                    Systematic Terrace Execution
                  </span>
                  <span className="hidden xs:inline-block px-1.5 py-0.5 bg-[#FFD700] text-[#0A2540] text-[9px] font-black uppercase rounded-xs shrink-0">
                    Field Work
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

                  {/* Video Change/Upload Controls: Visible ONLY to Owner / Admin */}
                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="h-6 sm:h-7 px-2 rounded-xs bg-[#FFD700] hover:bg-[#ffe033] text-[#0A2540] flex items-center gap-1 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                        title="Owner Access: Change / Select Video File"
                      >
                        <Upload className={`w-3 h-3 text-[#0A2540] ${isUploading ? 'animate-bounce' : ''}`} />
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
                {videoFailed && !customVideoLoaded ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center text-white bg-slate-900">
                    <div
                      onClick={() => {
                        if (isAdmin) fileInputRef.current?.click();
                        else onOpenInspectionModal();
                      }}
                      className="w-12 h-12 rounded-full bg-[#FFD700] text-[#0A2540] flex items-center justify-center mb-2 shadow-lg cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-white">
                      Systematic Terrace Execution
                    </h4>
                    <p className="text-[10px] text-slate-300 max-w-xs mt-1">
                      Multi-layer waterproof membrane & parapet sealing
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
                    onError={() => setVideoFailed(true)}
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
                    Continuous Terrace Membrane & Parapet Sealing
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#FFD700] bg-white/10 px-1.5 py-0.5 rounded-xs shrink-0">
                  Standard Procedure
                </span>
              </div>
            </div>

            {/* Right/Bottom: Technical Execution Details (5 cols) */}
            <div className="md:col-span-5 p-5 sm:p-6 lg:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#0A2540]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FFD700]">
                  <ShieldCheck className="w-4 h-4" />
                  Systematic Execution Standard
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                  Standardized Chemical Application on Rooftop Slabs
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  As shown in our live field application, our team applies seamless protective layers using standardized chemical coats to prevent water penetration into concrete slabs.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-xs bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        Parapet Skirting & Corner Coving
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                        Vertical sealing up the wall perimeter prevents corner seepage and masonry water seepage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-xs bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        Uniform Membrane Thickness
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                        Cross-coat roller application ensures no pinholes, voids, or micro-cracks remain unprotected.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-xs bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        Continuous Jointless Seal
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                        Eliminates problematic overlaps and joints common in traditional bitumen roll sheets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  variant="accent"
                  size="sm"
                  fullWidth
                  iconLeft={<Calendar className="w-4 h-4 text-[#0A2540]" />}
                  onClick={onOpenInspectionModal}
                >
                  Book Free Slab Inspection
                </Button>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-sm text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Change Video
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Conversion Action Below Process */}
        <div className="mt-14 sm:mt-18 text-center pt-8 border-t border-slate-100 max-w-xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Get an experienced waterproofing technician to evaluate your property's moisture levels.
          </p>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              iconLeft={<Calendar className="w-4 h-4 text-white" />}
              onClick={onOpenInspectionModal}
              id="process-book-inspection-cta"
            >
              Book a Free Inspection
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
