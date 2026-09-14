import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Droplets,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Sparkles,
  Film,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import {
  savePersistentVideo,
  getPersistentVideoUrl,
  clearPersistentVideo
} from '../../lib/videoStorage';
import { useAdminMode } from '../../lib/adminAuth';
import heroBgImage from '../../assets/images/waterproof_roof_hero_1789057634476.jpg';
import defaultRoofsealVideo from '../../assets/videos/roofseal-video.mp4';

interface HeroSectionProps {
  onOpenInspectionModal: () => void;
  onCallNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInspectionModal,
  onCallNow,
}) => {
  const { isAdmin } = useAdminMode();
  const [videoSrc, setVideoSrc] = useState<string>(defaultRoofsealVideo);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [customVideoLoaded, setCustomVideoLoaded] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore persistent video from IndexedDB or server cache
  useEffect(() => {
    let isMounted = true;
    getPersistentVideoUrl('roofseal').then((savedUrl) => {
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
        // Autoplay policy: pause state until user interacts
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Play immediately using local object URL so user gets zero wait time
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

      // Save permanently to server backend so shared link and all visitors see it!
      const serverUrl = await savePersistentVideo('roofseal', file);
      if (serverUrl && !serverUrl.startsWith('blob:')) {
        setVideoSrc(serverUrl);
      }
      setIsUploading(false);
    }
  };

  const handleResetVideo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await clearPersistentVideo('roofseal');
    setVideoSrc(defaultRoofsealVideo);
    setCustomVideoLoaded(false);
    setVideoFailed(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = defaultRoofsealVideo;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      id="home"
      className="relative bg-[#F8FAFC] border-b border-slate-200 overflow-hidden py-8 sm:py-16 lg:py-20"
    >
      {/* Hidden file input for uploading the user's video (Owner/Admin Only) */}
      {isAdmin && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/mp4,video/webm,video/quicktime,video/*"
          className="hidden"
          id="hero-video-uploader"
        />
      )}
      {/* Animated Architectural Waterproofing Background Image with Parallax Drift */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1.02, 1.08, 1.04, 1.08, 1.02],
            x: [0, -15, 10, -12, 0],
            y: [0, -8, 6, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute -inset-[6%] w-[112%] h-[112%]"
        >
          <img
            src={heroBgImage}
            alt="Professional terrace waterproofing coating application on rooftop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-[1.12] brightness-[1.02] contrast-[1.06]"
          />
        </motion.div>

        {/* Architectural Scrim Overlays: balanced to keep real waterproofing work clearly visible while ensuring crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/94 via-[#F8FAFC]/82 to-[#F8FAFC]/40 lg:from-[#F8FAFC]/92 lg:via-[#F8FAFC]/75 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/80 via-transparent to-[#F8FAFC]/90" />
        <div className="absolute inset-0 bg-[#0A2540]/3 mix-blend-multiply" />

        {/* Ambient Dynamic Water-Sheen Light Waves */}
        <motion.div
          animate={{
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-radial from-sky-400/30 via-blue-500/10 to-transparent blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            opacity: [0.18, 0.35, 0.18],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-28 -left-28 w-[500px] h-[500px] rounded-full bg-radial from-blue-300/25 via-sky-200/15 to-transparent blur-3xl pointer-events-none"
        />

        {/* Subtle Waterproofing Membrane Architectural Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#0A2540 1px, transparent 1px), linear-gradient(to right, #0A2540 1px, transparent 1px), linear-gradient(to bottom, #0A2540 1px, transparent 1px)`,
            backgroundSize: '32px 32px, 32px 32px, 32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Positioning, Messaging & Conversion CTAs */}
          <div className="md:col-span-7 lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Trust-Oriented Label Above Headline */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
                PROFESSIONAL WATERPROOFING SOLUTIONS
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFD700] text-[#0A2540] text-[10px] font-black uppercase tracking-wider rounded-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A2540]" />
                Dr. Fixit Applied Systems
              </span>
            </div>

            {/* Geometric Balance Accent Accent Rule */}
            <div className="w-12 h-1 bg-[#FFD700] rounded-xs" />

            {/* Primary Hero Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[50px] font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
              Reliable Waterproofing.{' '}
              <span className="block text-[#0A2540]/90">Built to Protect.</span>
            </h1>

            {/* Required Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
              Professional waterproofing solutions for terraces, roofs, walls, bathrooms and other moisture-prone areas.
            </p>

            {/* Genuine Structural Focus Areas (Zero Fake Claims or Numbers) */}
            <div className="pt-0.5">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1.5">
                Core Problem Areas Treated:
              </span>
              <div className="grid grid-cols-2 gap-1.5 xs:gap-2 text-[11px] sm:text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 border border-slate-200/90 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-sm shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A2540] shrink-0" />
                  <span className="truncate">Terrace & Roof Slabs</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 border border-slate-200/90 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-sm shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A2540] shrink-0" />
                  <span className="truncate">Wall Damp & Cracks</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 border border-slate-200/90 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-sm shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A2540] shrink-0" />
                  <span className="truncate">Basement Ingress</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 border border-slate-200/90 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-sm shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A2540] shrink-0" />
                  <span className="truncate">Bathrooms & Sunken</span>
                </div>
              </div>
            </div>

            {/* Conversion CTA Group: Primary & Secondary */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<Calendar className="w-4 h-4 text-white" />}
                onClick={onOpenInspectionModal}
                id="hero-get-inspection-cta"
                className="justify-center shadow-md shadow-[#0A2540]/10 h-11 sm:h-12"
              >
                Get Free Inspection
              </Button>

              <Button
                variant="secondary"
                size="lg"
                iconLeft={<Phone className="w-4 h-4 text-[#0A2540]" />}
                onClick={onCallNow}
                id="hero-call-now-cta"
                className="justify-center h-11 sm:h-12"
              >
                Call: 97114 94386
              </Button>
            </div>

            {/* Clear On-Site Assessment Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
              <Layers className="w-3.5 h-3.5 text-[#0A2540] shrink-0" />
              <span>Digital moisture diagnostics & on-site technical inspection before coating selection.</span>
            </div>

          </div>

          {/* Right Column: High-Quality Realistic Video Showcase (Side-by-side on tablet/desktop, stacked gracefully on mobile) */}
          <div className="md:col-span-5 lg:col-span-5 w-full">
            <div className="relative">
              
              {/* Geometric Construction Framing Elements */}
              <div className="absolute -top-2.5 -right-2.5 w-20 h-20 border-t-2 border-r-2 border-[#0A2540]/30 rounded-tr-sm pointer-events-none hidden sm:block" />
              <div className="absolute -bottom-2.5 -left-2.5 w-20 h-20 border-b-2 border-l-2 border-[#FFD700] rounded-bl-sm pointer-events-none hidden sm:block" />

              {/* Main Realistic Terrace Construction Video Player Container */}
              <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow-xl shadow-slate-900/20 group flex flex-col">
                
                {/* Top Media Bar: Title & Controls (Placed neatly above video so it never blocks video content) */}
                <div className="bg-[#0A2540] text-white px-3 sm:px-3.5 py-2 flex items-center justify-between border-b border-white/10 shrink-0 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Droplets className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white truncate">
                      Dr. Fixit Roofseal
                    </span>
                    <span className="hidden xs:inline-block px-1.5 py-0.5 bg-[#FFD700] text-[#0A2540] text-[9px] font-black uppercase rounded-xs shrink-0">
                      Terrace Demo
                    </span>
                  </div>

                  {/* Playback & Audio Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="h-6 sm:h-7 px-2 rounded-xs bg-white/15 hover:bg-white/25 text-white flex items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause Video' : 'Play Video'}
                      aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                      <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleMute}
                      className="h-6 sm:h-7 px-2 rounded-xs bg-white/15 hover:bg-white/25 text-white flex items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-3 h-3 text-slate-300" /> : <Volume2 className="w-3 h-3 text-[#FFD700]" />}
                      <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio'}</span>
                    </button>

                    {/* Admin / Owner Controls (Visible only to owner) */}
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

                {/* Video Container: Clean 16:9 Aspect Ratio with object-contain (100% visible, NEVER cropped) */}
                <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                  {videoFailed ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center text-white bg-slate-900">
                      <img
                        src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
                        alt="Terrace waterproofing"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className="w-12 h-12 rounded-full bg-[#FFD700] text-[#0A2540] flex items-center justify-center mb-2 shadow-lg cursor-pointer"
                          onClick={() => {
                            setVideoFailed(false);
                            setVideoSrc(defaultRoofsealVideo);
                            if (videoRef.current) {
                              videoRef.current.src = defaultRoofsealVideo;
                              videoRef.current.play().catch(() => {});
                            }
                          }}
                        >
                          <Play className="w-5 h-5 fill-current translate-x-0.5" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-black uppercase text-white">
                          Dr. Fixit Roofseal Video
                        </h4>
                        <p className="text-[10px] text-slate-300 max-w-xs mt-1">
                          PU Hybrid Technology • 7-Yr Warranty
                        </p>
                      </div>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      poster="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      onError={() => {
                        if (videoSrc !== defaultRoofsealVideo) {
                          setVideoSrc(defaultRoofsealVideo);
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

                {/* Bottom Technical Specification Bar: Cleanly below video, zero overlap */}
                <div className="bg-[#0A2540] text-white px-3 sm:px-3.5 py-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] shrink-0 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-bold text-slate-200 truncate">
                      PU Acrylic Hybrid • 7-Yr Warranty • 10°C Cooling
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded-xs border border-emerald-500/30 shrink-0">
                    Foot Trafficable
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
