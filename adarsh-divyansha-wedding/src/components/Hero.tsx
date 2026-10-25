import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';

const GOLD_ROD =
  'linear-gradient(90deg, #7a4c0e 0%, #f7d98b 45%, #c08a2e 62%, #6b400c 100%)';

const Finial: React.FC = () => (
  <div
    className="relative w-7 h-7 rounded-full shadow-[0_0_12px_rgba(245,190,80,0.45)]"
    style={{ background: 'radial-gradient(circle at 35% 30%, #fff3c4, #d4a03a 55%, #7a4c0e)' }}
  >
    <div className="absolute inset-[30%] rounded-full bg-[#7f1d1d]" />
  </div>
);

const Tassel: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-px h-5 bg-amber-400/80" />
    <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
    <div
      className="w-5 h-11 rounded-b-full"
      style={{ background: 'linear-gradient(180deg,#9b1c1c,#4a0b0b)' }}
    />
  </div>
);

const Rod: React.FC<{ tassels?: boolean }> = ({ tassels = false }) => (
  <div className="relative w-full h-8 flex items-center justify-center">
    <div
      className="absolute inset-x-[-6%] top-1/2 -translate-y-1/2 h-3 rounded-full"
      style={{ background: GOLD_ROD }}
    />
    <div className="absolute left-[-9%] top-1/2 -translate-y-1/2">
      <Finial />
    </div>
    <div className="absolute right-[-9%] top-1/2 -translate-y-1/2">
      <Finial />
    </div>
    {tassels && (
      <>
        <div className="absolute left-[-1%] top-full">
          <Tassel />
        </div>
        <div className="absolute right-[-1%] top-full">
          <Tassel />
        </div>
      </>
    )}
  </div>
);

export const Hero: React.FC = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });

  // The scroll unrolls: the parchment grows from a small roll to a full panel.
  const scrollHeight = useTransform(p, [0, 0.6], ['30vh', '66vh']);
  const contentOpacity = useTransform(p, [0.45, 0.85], [0, 1]);
  const contentY = useTransform(p, [0.45, 0.85], [24, 0]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);

  const { couple, eventDetails, hero } = weddingData;
  const dateText = eventDetails.weddingDateDisplay || weddingData.weddingDateDisplay;

  return (
    <section ref={wrapRef} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.p
          style={{ opacity: cueOpacity }}
          className="absolute top-[12vh] text-amber-300 text-xs uppercase tracking-[0.3em] font-serif"
        >
          You&rsquo;re cordially invited
        </motion.p>

        <motion.div
          className="relative w-[min(86vw,25rem)] flex flex-col"
          style={{ height: scrollHeight }}
        >
          <Rod tassels />

          <div
            className="relative flex-1 mx-3 overflow-hidden border border-amber-500/60 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
            style={{
              background:
                'radial-gradient(ellipse at center, #8b1e1e 0%, #5c0f12 70%, #3d0a0c 100%)',
            }}
          >
            <div className="absolute inset-3 border border-amber-400/40 pointer-events-none" />

            <motion.div
              style={{ opacity: contentOpacity, y: contentY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-8"
            >
              <div className="w-32 sm:w-40 aspect-[4/5] p-1.5 bg-[#FAF3E3] rotate-[-2deg] shadow-lg">
                <img
                  src={couple.coupleImage}
                  alt={`${couple.groom} & ${couple.bride}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-amber-200/90 font-serif">
                {couple.hashtag}
              </p>

              <h1 className="mt-2 text-3xl sm:text-4xl font-serif text-amber-100 leading-tight">
                {couple.groom} <span className="text-amber-400">&amp;</span> {couple.bride}
              </h1>

              <p className="mt-2 text-amber-100/80 font-serif italic text-xs sm:text-sm">
                &ldquo;{eventDetails.blessingText}&rdquo;
              </p>

              <div className="mt-4 px-4 py-1.5 rounded-full border border-amber-400/60 text-amber-200 font-serif text-sm">
                {dateText}
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-amber-100/85">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>
                  {hero.locationName}, {hero.locationCity}
                </span>
              </p>
            </motion.div>
          </div>

          <Rod />
        </motion.div>

        <motion.p
          style={{ opacity: cueOpacity }}
          className="absolute bottom-[8vh] text-amber-200/70 text-[11px] uppercase tracking-[0.3em] font-serif"
        >
          Scroll to open
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
