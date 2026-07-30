import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  quote: string;
  bullets: string[];
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Curated Selections',
    subtitle: 'Fashion, Beauty & Home Décor',
    desc: 'Curated selections of African fashion, beauty, accessories, and home décor. A Parisian storefront + global e-commerce reach.',
    image: '/Hero_Images/IMG_7148.jpg',
    quote: '"More Than a Store — A Destination."',
    bullets: [
      'Curated selections of African fashion, beauty, accessories, and home décor',
      'African designers featured in Vogue, LVMH Prize, Fashion Weeks',
      'Rising demand for cultural authenticity from Gen Z & diaspora',
    ],
  },
  {
    number: '02',
    title: 'Immersive Storytelling Zones',
    subtitle: 'Educate and Engage Shoppers',
    desc: 'Immersive storytelling zones to educate and engage shoppers. Unified showcase and storytelling space for African brands.',
    image: '/Paris_campaign/IMG_6688.jpg',
    quote: '"Fashion. Culture. Commerce. Reimagined."',
    bullets: [
      'Immersive storytelling zones to educate and engage shoppers',
      'Unified showcase and storytelling space for African brands',
      'Visuals: Store renderings and experience maps',
    ],
  },
  {
    number: '03',
    title: 'Events & Brand Activations',
    subtitle: 'Workshops and Pop-Ups',
    desc: 'Events, workshops, and pop-up brand activations. Successful proof of concept through pop-ups and trade events (e.g. Who’s Next Paris).',
    image: '/Paris_cocktail/IMG_7570.jpg',
    quote: '"Africa is not just rising — it’s redefining the future of fashion."',
    bullets: [
      'Events, workshops, and pop-up brand activations',
      'Successful proof of concept through pop-ups and trade events (e.g. Who’s Next Paris)',
      'Paris welcomes 30M+ tourists annually',
    ],
  },
];

export const ConceptAccordion: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="concept" className="py-16 md:py-24 bg-white border-t border-[#D8E5F2]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The ITURA Concept</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0A0A0A] leading-tight mb-8">
              More Than a Store — <em className="font-light not-italic text-[#18047b]">A Destination</em>
            </h2>
            <p className="text-lg text-[#324150] leading-[1.85] max-w-xl">
              Curated selections of African fashion, beauty, accessories, and home décor.
              Immersive storytelling zones to educate and engage shoppers.
            </p>
          </div>
        </div>

        {/* Dynamic Accordion Container */}
        <div className="flex flex-col lg:flex-row h-[920px] lg:h-[720px] gap-4">
          {PILLARS.map((pillar, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={pillar.number}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border border-[#D8E5F2] group ${
                  isActive
                    ? 'lg:flex-[3.5] flex-[3] shadow-2xl'
                    : 'lg:flex-[1] flex-[1] hover:lg:flex-[1.2]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                    isActive ? 'scale-100 brightness-[0.65]' : 'scale-110 brightness-[0.75] group-hover:scale-105'
                  }`}
                />

                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${
                  isActive
                    ? 'from-black/80 via-black/40 to-black/10'
                    : 'from-black/80 via-black/40 to-black/20'
                }`} />

                {/* Contracted View Content (When NOT active) */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between p-6 lg:p-8 text-white transition-opacity duration-500 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <span className="font-serif text-3xl font-light text-[#D4AF37] tracking-wider">
                    {pillar.number}
                  </span>
                  <div className="space-y-2">
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/60">
                      {pillar.subtitle}
                    </p>
                    <h3 className="font-serif text-2xl text-white leading-tight">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {/* Expanded View Content (When ACTIVE) */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between p-8 md:p-12 lg:p-14 text-white transition-all duration-700 ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/20 pb-5">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-4xl text-[#D4AF37]">{pillar.number}</span>
                      <div>
                        <span className="block text-xs font-mono tracking-[0.25em] uppercase text-white/70">
                          {pillar.subtitle}
                        </span>
                        <h3 className="font-serif text-2xl md:text-4xl text-white font-bold">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Middle Narrative */}
                  <div className="my-auto py-6 max-w-4xl space-y-6">
                    <p className="text-lg md:text-2xl text-white/90 leading-[1.8] font-light">
                      {pillar.desc}
                    </p>
                    <blockquote className="text-lg md:text-xl font-serif italic text-[#F0F8FF] border-l-2 border-[#D4AF37] pl-5 leading-relaxed py-1">
                      {pillar.quote}
                    </blockquote>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 border-t border-white/20 text-xs font-mono uppercase tracking-widest text-white/60">
                    <span>A Parisian Storefront + Global E-Commerce Reach</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
