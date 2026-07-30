import React, { useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';

interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  subtitle: string;
  desc: string;
  detail: string;
}

interface Look {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  hotspots: Hotspot[];
}

const LOOKS: Look[] = [
  {
    id: 'look-01',
    number: 'Look // 01',
    title: 'Curated Selections of African Fashion, Beauty, Accessories & Home Décor',
    category: 'The ITURA Concept',
    image: '/Hero_Images/IMG_6799.jpg',
    hotspots: [
      {
        id: 'hs-1',
        top: '26%',
        left: '46%',
        title: 'Global Spotlight on African Creatives',
        subtitle: 'African designers featured in Vogue, LVMH Prize, Fashion Weeks',
        desc: 'Rising demand for cultural authenticity from Gen Z & diaspora.',
        detail: 'Africa is not just rising — it’s redefining the future of fashion.',
      },
      {
        id: 'hs-2',
        top: '52%',
        left: '58%',
        title: '$5.57B Fashion Market',
        subtitle: 'African fashion industry is valued at €5.57B in 2024',
        desc: 'Projected to grow by 9.73% annually till 2029 (Statista).',
        detail: 'Africa’s Creative Renaissance Meets Global Demand.',
      },
      {
        id: 'hs-3',
        top: '78%',
        left: '42%',
        title: 'A Parisian Storefront + Global E-Commerce Reach',
        subtitle: 'Fashion. Culture. Commerce. Reimagined.',
        desc: 'Connecting African designers with global consumers while supporting international growth.',
        detail: 'To be the global gateway for African creativity.',
      },
    ],
  },
  {
    id: 'look-02',
    number: 'Look // 02',
    title: 'Immersive Storytelling Zones to Educate & Engage Shoppers',
    category: 'The Opportunity & Solution',
    image: '/Paris_campaign/IMG_6720.jpg',
    hotspots: [
      {
        id: 'hs-201',
        top: '38%',
        left: '52%',
        title: 'No Premium Retail Access Solved',
        subtitle: 'Gap in premium retail channels for independent African brands in Europe',
        desc: 'ITURA provides a unified showcase and storytelling space for African brands.',
        detail: 'More Than a Store — A Destination.',
      },
      {
        id: 'hs-202',
        top: '64%',
        left: '44%',
        title: 'Disconnected from Global Markets Solved',
        subtitle: 'Visibility & logistics barriers block global scale',
        desc: 'We bridge the gap through our Parisian permanent concept store and e-commerce reach.',
        detail: 'Visuals: Store renderings and experience maps.',
      },
    ],
  },
  {
    id: 'look-03',
    number: 'Look // 03',
    title: 'Events, Workshops, and Pop-Up Brand Activations',
    category: 'Market Validation',
    image: '/Paris_cocktail/IMG_7581.jpg',
    hotspots: [
      {
        id: 'hs-301',
        top: '32%',
        left: '48%',
        title: 'Successful Proof of Concept',
        subtitle: 'Through pop-ups and trade events (e.g. Who’s Next Paris)',
        desc: 'Paris welcomes 30M+ tourists annually with a surge in interest in African fashion.',
        detail: 'A Global Market Ready for ITURA.',
      },
    ],
  },
];

export const InteractiveLookbook: React.FC = () => {
  const [activeLookIdx, setActiveLookIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(
    LOOKS[0].hotspots[0]
  );

  const currentLook = LOOKS[activeLookIdx];

  const handleLookSelect = (idx: number) => {
    setActiveLookIdx(idx);
    setActiveHotspot(LOOKS[idx].hotspots[0] || null);
  };

  return (
    <section className="py-24 md:py-36 bg-[#0A0A0A] text-white border-t border-white/10 select-none overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.08] text-white">
              The ITURA <em className="font-light not-italic text-[#F0F8FF]">Concept</em> Showcase
            </h2>
          </div>

          {/* Look Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => handleLookSelect(idx)}
                className={`px-5 py-3 text-xs tracking-[0.15em] uppercase font-mono transition-all border ${
                  activeLookIdx === idx
                    ? 'bg-white text-[#0A0A0A] border-white font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-transparent text-white/60 border-white/20 hover:border-white/60 hover:text-white'
                }`}
              >
                {look.number}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Visual with Hotspots (Cols 1-7) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative overflow-hidden border border-white/15 bg-[#141414] aspect-[3/4] max-h-[780px] mx-auto">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                draggable={false}
                className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

              {/* Look Overlay Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono tracking-widest uppercase text-white/80">
                {currentLook.category}
              </div>

              {/* Interactive Hotspots */}
              {currentLook.hotspots.map((hs) => {
                const isSelected = activeHotspot?.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    onMouseEnter={() => setActiveHotspot(hs)}
                    style={{ top: hs.top, left: hs.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/btn focus:outline-none transition-transform duration-300 ${
                      isSelected ? 'scale-125' : 'scale-100 hover:scale-110'
                    }`}
                    aria-label={`Inspect ${hs.title}`}
                  >
                    {/* Pulsing Outer Ring */}
                    <span
                      className={`absolute inset-0 -m-3 rounded-full animate-ping opacity-60 ${
                        isSelected ? 'bg-[#18047b]' : 'bg-white/40'
                      }`}
                    />
                    {/* Hotspot Center Pill */}
                    <span
                      className={`relative flex items-center justify-center w-9 h-9 rounded-full border shadow-2xl transition-colors ${
                        isSelected
                          ? 'bg-[#18047b] border-white text-white'
                          : 'bg-black/80 border-white/70 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <Plus className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'rotate-45' : ''}`} />
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/50">
                <span>{currentLook.title}</span>
              </div>
            </div>
          </div>

          {/* Specification Card / Popover Panel (Cols 8-12) */}
          <div className="lg:col-span-5">
            {activeHotspot ? (
              <div key={activeHotspot.id} className="bg-[#141414] border border-white/15 p-8 md:p-10 relative animate-fade-in shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Details</span>
                  </div>
                  <span className="text-xs font-mono text-white/40">{currentLook.number}</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-tight">
                  {activeHotspot.title}
                </h3>
                <p className="text-sm font-mono text-[#D4AF37] uppercase tracking-wider mb-6">
                  {activeHotspot.subtitle}
                </p>

                <p className="text-lg text-white/80 leading-[1.85] mb-8">
                  {activeHotspot.desc}
                </p>

                <div className="p-5 bg-white/[0.03] border-l-2 border-[#18047b]">
                  <p className="text-sm font-serif italic text-[#F0F8FF] leading-relaxed">
                    "{activeHotspot.detail}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-white/20 p-12 text-center text-white/40 font-mono text-sm">
                Select a look and click a node [+] to view exact client specifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
