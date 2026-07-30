import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  X,
  Menu,
} from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { ConceptAccordion } from './components/ConceptAccordion';
import { InteractiveLookbook } from './components/InteractiveLookbook';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'investor' | 'rsvp'>('investor');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [modalWebsiteUrl, setModalWebsiteUrl] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactFirm, setContactFirm] = useState('');
  const [contactNotes, setContactNotes] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactWebsiteUrl, setContactWebsiteUrl] = useState('');

  const [heroIdx, setHeroIdx] = useState(0);

  // Drag carousel refs & state
  const campaignRef = useRef<HTMLDivElement>(null);
  const cocktailRef = useRef<HTMLDivElement>(null);
  const [isDraggingCampaign, setIsDraggingCampaign] = useState(false);
  const [campaignStartX, setCampaignStartX] = useState(0);
  const [campaignScrollLeft, setCampaignScrollLeft] = useState(0);
  const [isDraggingCocktail, setIsDraggingCocktail] = useState(false);
  const [cocktailStartX, setCocktailStartX] = useState(0);
  const [cocktailScrollLeft, setCocktailScrollLeft] = useState(0);

  /* ── DATA ─────────────────────────────────────────── */

  const heroSlides = [
    { img: '/Hero_Images/IMG_7148.jpg' },
    { img: '/Hero_Images/IMG_7377.jpg' },
    { img: '/Hero_Images/IMG_7503.jpg' },
    { img: '/Hero_Images/IMG_7584.jpg' },
    { img: '/Hero_Images/IMG_7657.jpg' },
    { img: '/Hero_Images/IMG_7701.jpg' },
    { img: '/Hero_Images/IMG_7785.jpg' },
    { img: '/Hero_Images/IMG_7830.jpg' },
  ];

  const campaignSlides = [
    { img: '/Paris_campaign/IMG_6688.jpg' },
    { img: '/Paris_campaign/IMG_6720.jpg' },
    { img: '/Paris_campaign/IMG_6766.jpg' },
    { img: '/Paris_campaign/IMG_6984.jpg' },
    { img: '/Paris_campaign/IMG_7008.jpg' },
    { img: '/Paris_campaign/IMG_7233.jpg' },
    { img: '/Paris_campaign/IMG_7323.jpg' },
    { img: '/Paris_campaign/IMG_7351.jpg' },
    { img: '/Paris_campaign/IMG_7455.jpg' },
    { img: '/Paris_campaign/IMG_7524.jpg' },
  ];

  const cocktailSlides = [
    { img: '/Paris_cocktail/IMG_7570.jpg' },
    { img: '/Paris_cocktail/IMG_7581.jpg' },
    { img: '/Paris_cocktail/IMG_7583.jpg' },
    { img: '/Paris_cocktail/IMG_7594.jpg' },
    { img: '/Paris_cocktail/IMG_7652.jpg' },
    { img: '/Paris_cocktail/IMG_7676.jpg' },
    { img: '/Paris_cocktail/IMG_7769.jpg' },
    { img: '/Paris_cocktail/IMG_7803.jpg' },
    { img: '/Paris_cocktail/IMG_7908.jpg' },
    { img: '/Paris_cocktail/IMG_7969-2.jpg' },
  ];

  const previousPopUps: Record<string, { title: string; subtitle: string; images: string[] }> = {
    'paris-spring': {
      title: 'Paris Spring Pop-Up',
      subtitle: 'Spring 2025 — Le Marais, Paris',
      images: [
        '/Paris_Spring/Paris_Spring (1).jpg',
        '/Paris_Spring/Paris_Spring (2).jpg',
        '/Paris_Spring/Paris_Spring (3).jpg',
        '/Paris_Spring/Paris_Spring (4).jpg',
        '/Paris_Spring/Paris_Spring (5).jpg',
        '/Paris_Spring/Paris_Spring (6).jpg',
        '/Paris_Spring/Paris_Spring (7).jpg',
        '/Paris_Spring/Paris_Spring (8).jpg',
        '/Paris_Spring/Paris_Spring (9).jpg',
        '/Paris_Spring/Paris_Spring (10).jpg',
      ],
    },
    'fete-musique': {
      title: 'Paris F\u00eate de la Musique',
      subtitle: 'June 2025 — F\u00eate de la Musique, Paris',
      images: [
        '/Paris_Fete/Paris_Fete 1 (1).jpeg',
        '/Paris_Fete/Paris_Fete 1 (2).jpeg',
        '/Paris_Fete/Paris_Fete 1 (3).jpeg',
        '/Paris_Fete/Paris_Fete 1 (4).jpeg',
        '/Paris_Fete/Paris_Fete 1 (5).jpeg',
        '/Paris_Fete/Paris_Fete 1 (6).jpeg',
        '/Paris_Fete/Paris_Fete 1 (7).jpeg',
        '/Paris_Fete/Paris_Fete 1 (8).jpeg',
        '/Paris_Fete/Paris_Fete 1 (9).jpeg',
        '/Paris_Fete/Paris_Fete 1 (10).jpeg',
      ],
    },
  };

  const navLinks = [
    { label: 'Opportunity', href: '#about' },
    { label: 'Concept', href: '#concept' },
    { label: 'Archive', href: '#archive' },
    { label: 'Events', href: '#popup' },
    { label: 'Invest', href: '#invest' },
  ];

  /* ── EFFECTS ──────────────────────────────────────── */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || isModalOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, isModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  /* ── CAROUSEL HELPERS ─────────────────────────────── */

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.6;
    ref.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const handleCampaignMouseDown = (e: React.MouseEvent) => {
    if (!campaignRef.current) return;
    setIsDraggingCampaign(true);
    setCampaignStartX(e.pageX - campaignRef.current.offsetLeft);
    setCampaignScrollLeft(campaignRef.current.scrollLeft);
  };
  const handleCampaignMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCampaign || !campaignRef.current) return;
    e.preventDefault();
    const x = e.pageX - campaignRef.current.offsetLeft;
    campaignRef.current.scrollLeft = campaignScrollLeft - (x - campaignStartX) * 1.6;
  };

  const handleCocktailMouseDown = (e: React.MouseEvent) => {
    if (!cocktailRef.current) return;
    setIsDraggingCocktail(true);
    setCocktailStartX(e.pageX - cocktailRef.current.offsetLeft);
    setCocktailScrollLeft(cocktailRef.current.scrollLeft);
  };
  const handleCocktailMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCocktail || !cocktailRef.current) return;
    e.preventDefault();
    const x = e.pageX - cocktailRef.current.offsetLeft;
    cocktailRef.current.scrollLeft = cocktailScrollLeft - (x - cocktailStartX) * 1.6;
  };

  /* ── FORM HANDLERS (Nodemailer + Honeypot) ────────── */

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactName.trim()) return;
    setIsContactSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, firm: contactFirm, notes: contactNotes, website_url: contactWebsiteUrl, source: 'General Inquiry' }),
      });
      if (res.ok) {
        setContactSubmitted(true);
        setTimeout(() => { setContactSubmitted(false); setContactName(''); setContactEmail(''); setContactFirm(''); setContactNotes(''); setContactWebsiteUrl(''); }, 5000);
      } else { alert('Failed to send message. Please try again.'); }
    } catch (err) { alert('Network error. Please try again.'); }
    finally { setIsContactSubmitting(false); }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !nameInput.trim()) return;
    setIsModalSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameInput, email: emailInput, website_url: modalWebsiteUrl, source: modalType === 'investor' ? 'Investor Inquiry' : 'RSVP Guest' }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setIsModalOpen(false); setEmailInput(''); setNameInput(''); setModalWebsiteUrl(''); setModalType('investor'); }, 3000);
      } else { alert('Failed to send request. Please try again.'); }
    } catch (err) { alert('Network error. Please try again.'); }
    finally { setIsModalSubmitting(false); }
  };

  /* ── RENDER ───────────────────────────────────────── */

  return (
    <>
      <CustomCursor />

      {/* ── VIP MODAL ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-menu"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-[#0A0A0A] border border-white/15 p-8 md:p-10 max-w-md w-full relative text-white">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            {submitted ? (
              <div className="text-center py-8 animate-fade-in">
                <h3 className="font-serif text-2xl mb-3">
                  {modalType === 'investor' ? 'Request Received' : 'RSVP Confirmed'}
                </h3>
                <p className="text-base text-white/60 leading-relaxed">
                  Thank you, <strong className="text-white">{nameInput}</strong>.
                  {modalType === 'investor'
                    ? ' We will send you the investor materials shortly.'
                    : ' You are on the guest list. See you at the opening!'}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  {modalType === 'investor' ? 'Investor Information Request' : 'RSVP for Opening Night'}
                </h3>
                <p className="text-sm text-white/60 mb-8 leading-relaxed">
                  {modalType === 'investor'
                    ? 'Request investor materials, deck, and partnership details.'
                    : 'Reserve your spot as a guest at our upcoming pop-up launch event.'}
                </p>
                <form onSubmit={handleModalSubmit} className="space-y-6">
                  <input type="text" name="website_url" value={modalWebsiteUrl} onChange={(e) => setModalWebsiteUrl(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Full Name *</label>
                    <input type="text" required value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Full Name" className="fashion-input" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">
                      {modalType === 'investor' ? 'Work Email *' : 'Email Address *'}
                    </label>
                    <input type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" className="fashion-input" />
                  </div>
                  <button type="submit" disabled={isModalSubmitting} className="btn-fashion w-full justify-center py-4 mt-4 text-xs">
                    <span>{isModalSubmitting ? 'Processing\u2026' : modalType === 'investor' ? 'Submit Request' : 'Confirm RSVP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 animate-menu">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" aria-label="Close Menu">
            <X className="w-7 h-7" />
          </button>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-white text-2xl font-serif tracking-wider hover:text-[#D4AF37] transition-colors">
              {link.label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); setModalType('investor'); setIsModalOpen(true); }} className="btn-fashion mt-8">
            <span>Investor Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => { setMenuOpen(false); setModalType('rsvp'); setIsModalOpen(true); }} className="btn-outline-fashion mt-3 text-white border-white/30 hover:bg-white hover:text-[#0A0A0A]">
            <span>RSVP as Guest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="z-10">
            <img src={scrolled ? '/ituracolor.png' : '/iturawhite.png'} alt="ITURA" className="h-8 sm:h-12 transition-all" />
          </a>
          <div className={`hidden lg:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${scrolled ? 'text-[#0A0A0A]' : 'text-white'}`}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => { setModalType('investor'); setIsModalOpen(true); }} className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#18047b] hover:bg-[#2d16b3] text-white text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.15em] px-4 md:px-6 py-2 md:py-2.5 transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(24,4,123,0.25)] whitespace-nowrap">
              <span>Investor Access</span>
              <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </button>
            <button onClick={() => setMenuOpen(true)} className={`lg:hidden transition-colors ${scrolled ? 'text-[#0A0A0A]' : 'text-white'}`} aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO — Full-bleed cinematic crossfade
          ══════════════════════════════════════════════════ */}
      <header className="relative h-screen flex items-end overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <img
            key={slide.img}
            src={slide.img}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: heroIdx === idx ? 1 : 0,
              transform: heroIdx === idx ? 'scale(1.05)' : 'scale(1)',
              transition: 'opacity 1.5s ease-in-out, transform 7s ease-out',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 sm:pb-24 w-full">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 mb-5 font-light">
            Investing in ITURA &mdash; Paris
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,7rem)] text-white leading-[0.95] mb-5 max-w-5xl">
            Africa&rsquo;s Creative<br />Powerhouse in Paris.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 font-light tracking-wide">
            Fashion. Culture. Commerce. <span className="text-[#D4AF37] italic">Reimagined.</span>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button onClick={() => { setModalType('investor'); setIsModalOpen(true); }} className="btn-fashion">
              <span>Investor Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#about" className="text-white text-xs tracking-[0.2em] uppercase hover:text-[#D4AF37] transition-colors border-b border-white/30 pb-1">
              Explore Opportunity
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 md:left-12 flex items-center gap-2 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIdx(idx)}
              className={`rounded-full transition-all duration-300 ${heroIdx === idx ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </header>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-[#0A0A0A] py-4 overflow-hidden border-y border-white/10">
        <div className="marquee-track whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="inline-block text-white/50 text-[11px] tracking-[0.4em] uppercase mx-6">
              Fashion &middot; Culture &middot; Commerce &middot; Reimagined &middot; Paris &middot; London &middot; Lagos &middot; Dakar &middot; Marrakech &middot;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          THE OPPORTUNITY — Editorial stats
          ══════════════════════════════════════════════════ */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="scroll-reveal">
              <p className="text-xs tracking-[0.3em] uppercase text-[#18047b] mb-6 font-medium">The Opportunity</p>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#0A0A0A] leading-tight mb-8">
                Africa is experiencing an unprecedented creative renaissance.
              </h2>
              <p className="text-lg text-[#324150] leading-[1.85] mb-6">
                African designers are featured in Vogue, LVMH Prize, and global Fashion Weeks. Rising demand for cultural authenticity from Gen Z and the diaspora.
              </p>
              <p className="text-lg text-[#324150] leading-[1.85] mb-12">
                Yet there is a gap in premium retail channels for independent African brands in Europe. ITURA provides a unified showcase and storytelling space for African brands.
              </p>

              {/* Stats moved to the left side under description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#0A0A0A]/10 pt-10">
                <div>
                  <p className="font-serif text-5xl text-[#18047b] font-light leading-none">&euro;5.57B</p>
                  <p className="text-sm text-[#324150] mt-2 tracking-wide">African fashion industry valuation, 2024</p>
                </div>
                <div>
                  <p className="font-serif text-5xl text-[#18047b] font-light leading-none">9.73%</p>
                  <p className="text-sm text-[#324150] mt-2 tracking-wide">Projected annual growth rate till 2029</p>
                </div>
                <div className="sm:col-span-2 mt-2">
                  <p className="font-serif text-5xl text-[#18047b] font-light leading-none">30M+</p>
                  <p className="text-sm text-[#324150] mt-2 tracking-wide">Annual tourists in Paris &mdash; prime retail foot traffic</p>
                </div>
              </div>
            </div>

            <div className="scroll-reveal h-full w-full">
              <div className="aspect-[3/4] overflow-hidden group">
                <img
                  src="/second section.jpg"
                  alt="ITURA Experience"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VISION & MISSION — Dedicated Stylish Section
          ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-t border-[#EAEAEA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <div className="scroll-reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#18047b]"></div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#18047b] font-medium">Our Vision</p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0A0A0A] leading-[1.3] font-light">
                To be the global gateway for <em className="italic font-normal text-[#18047b]">African creativity.</em>
              </h2>
            </div>
            <div className="scroll-reveal stagger-1 md:border-l md:border-[#0A0A0A]/10 md:pl-16 lg:pl-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#D4AF37]"></div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium">Our Mission</p>
              </div>
              <p className="text-xl sm:text-2xl text-[#324150] leading-[1.75] font-light">
                To become a recognized cultural hub that connects African designers with global consumers while supporting the international growth of African creative industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THE ITURA CONCEPT — Accordion
          ══════════════════════════════════════════════════ */}
      <ConceptAccordion />

      {/* ══════════════════════════════════════════════════
          INTERACTIVE LOOKBOOK — Hotspot Showcase
          ══════════════════════════════════════════════════ */}
      <div id="archive">
        <InteractiveLookbook />
      </div>

      {/* ══════════════════════════════════════════════════
          PARIS CAMPAIGN SHOOT — Drag-to-scroll gallery
          ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <div className="flex items-end justify-between scroll-reveal">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#18047b] mb-3 font-medium">Campaign Archive</p>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#0A0A0A]">Paris Campaign Shoot</h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button onClick={() => scrollCarousel(campaignRef, 'left')} className="w-12 h-12 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-all" aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollCarousel(campaignRef, 'right')} className="w-12 h-12 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-all" aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={campaignRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar px-6 md:px-12 lg:px-20 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleCampaignMouseDown}
          onMouseMove={handleCampaignMouseMove}
          onMouseUp={() => setIsDraggingCampaign(false)}
          onMouseLeave={() => setIsDraggingCampaign(false)}
        >
          {campaignSlides.map((slide, idx) => (
            <div key={idx} className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[32vw] aspect-[3/4] overflow-hidden group">
              <img
                src={slide.img}
                alt={`Paris Campaign ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FORTHCOMING POP-UP — Editorial split
          ══════════════════════════════════════════════════ */}
      <section id="popup" className="py-24 sm:py-36 bg-[#F0F8FF]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="scroll-reveal">
              <p className="text-xs tracking-[0.3em] uppercase text-[#18047b] mb-6 font-medium">Forthcoming Pop-Up</p>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#0A0A0A] leading-tight mb-8">
                Next Destination:<br /><span className="italic font-light">The ITURA Pop-Up Experience</span>
              </h2>
              <p className="text-lg text-[#324150] leading-[1.85] mb-10">
                Catch the creative renaissance live. We are bringing Africa&rsquo;s premium design vanguard to the global stage with our upcoming exclusive retail activation.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#18047b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#0A0A0A] text-base">London, UK</p>
                    <p className="text-base text-[#324150] mt-1">Curated showroom, exclusive designer meet-and-greets, and sensory storytelling zones.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-[#18047b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#0A0A0A] text-base">Autumn / Q3 2026</p>
                    <p className="text-base text-[#324150] mt-1">Global collectors, luxury consumers, and prospective investment partners.</p>
                  </div>
                </div>
              </div>

              <p className="text-base text-[#324150] italic leading-[1.85] border-l-2 border-[#18047b] pl-6 mb-10">
                This forthcoming pop-up acts as our immediate market validation gate. It allows investors to see our brand curation, operational flow, and consumer demand firsthand before the permanent flagship concept store launch.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => { setModalType('investor'); setIsModalOpen(true); }} className="btn-fashion text-xs">
                  <span>Investor Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => { setModalType('rsvp'); setIsModalOpen(true); }} className="btn-outline-fashion text-xs">
                  <span>RSVP as Guest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="scroll-reveal aspect-[3/4] overflow-hidden">
              <img src="/london_popup.jpeg" alt="ITURA Pop-Up" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PREVIOUS POP-UPS — Fashion editorial cards
          ══════════════════════════════════════════════════ */}
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-16 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between mb-14 scroll-reveal">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3 font-medium">Previous Events</p>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">Past Pop-Up Experiences</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {Object.entries(previousPopUps).map(([key, popup]) => (
              <button
                key={key}
                onClick={() => { setGalleryOpen(key); setGalleryIdx(0); }}
                className="group text-left scroll-reveal relative overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  {popup.images.length > 0 ? (
                    <img
                      src={popup.images[0]}
                      alt={popup.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <p className="text-sm text-white/30 tracking-[0.2em] uppercase font-medium">Gallery Coming Soon</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{popup.title}</h3>
                    <p className="text-sm text-white/60 tracking-wide">{popup.subtitle}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span>View Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIOUS POP-UP GALLERY MODAL — Horizontal carousel ── */}
      {galleryOpen && previousPopUps[galleryOpen] && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm animate-menu flex flex-col"
          onClick={(e) => e.target === e.currentTarget && setGalleryOpen(null)}
        >
          <div className="flex items-center justify-between px-6 md:px-12 pt-6 pb-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white">{previousPopUps[galleryOpen].title}</h3>
              <p className="text-xs text-white/40 tracking-wide mt-1">{previousPopUps[galleryOpen].subtitle}</p>
            </div>
            <button onClick={() => setGalleryOpen(null)} className="text-white/50 hover:text-white transition-colors" aria-label="Close Gallery">
              <X className="w-7 h-7" />
            </button>
          </div>

          {previousPopUps[galleryOpen].images.length > 0 ? (
            <div className="flex-1 flex items-center relative">
              {/* Left arrow */}
              <button
                onClick={() => setGalleryIdx((prev) => Math.max(0, prev - 1))}
                className={`absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all ${galleryIdx === 0 ? 'opacity-20 pointer-events-none' : ''}`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Carousel track */}
              <div className="w-full overflow-hidden px-16 md:px-24">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${galleryIdx * (100 / Math.min(previousPopUps[galleryOpen!].images.length, 3))}%)` }}
                >
                  {previousPopUps[galleryOpen].images.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full sm:w-[48%] lg:w-[32%] aspect-[3/4] overflow-hidden">
                      <img
                        src={img}
                        alt={`${previousPopUps[galleryOpen!].title} ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={() => setGalleryIdx((prev) => Math.min(previousPopUps[galleryOpen!].images.length - 1, prev + 1))}
                className={`absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all ${galleryIdx >= previousPopUps[galleryOpen!].images.length - 1 ? 'opacity-20 pointer-events-none' : ''}`}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-white/30 text-lg tracking-[0.15em] uppercase">Gallery images coming soon</p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          PARIS COCKTAIL & VIP SALONS — Drag-to-scroll
          ══════════════════════════════════════════════════ */}
      <section id="cocktail-events" className="pt-10 sm:pt-16 pb-24 sm:pb-32 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10">
          <div className="flex items-end justify-between scroll-reveal">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3 font-medium">VIP Salons</p>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">Paris Cocktail &amp; VIP Events</h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button onClick={() => scrollCarousel(cocktailRef, 'left')} className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-all" aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollCarousel(cocktailRef, 'right')} className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-all" aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={cocktailRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar px-6 md:px-12 lg:px-20 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleCocktailMouseDown}
          onMouseMove={handleCocktailMouseMove}
          onMouseUp={() => setIsDraggingCocktail(false)}
          onMouseLeave={() => setIsDraggingCocktail(false)}
        >
          {cocktailSlides.map((slide, idx) => (
            <div key={idx} className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[32vw] aspect-[3/4] overflow-hidden group">
              <img
                src={slide.img}
                alt={`Paris Cocktail ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>



      {/* ══════════════════════════════════════════════════
          FOOTER & CONTACT — Dark editorial
          ══════════════════════════════════════════════════ */}
      <footer id="invest" className="bg-[#0A0A0A] text-white py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="scroll-reveal">
              <img src="/iturawhite.png" alt="ITURA" className="h-12 mb-8" />
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-6">
                To be the global gateway for African creativity.
              </h2>
              <p className="text-base text-white/60 leading-[1.85] mb-10">
                More Than a Store &mdash; A Destination. A Parisian storefront + global e-commerce reach. Connecting African designers with global consumers while supporting international growth.
              </p>
              <div className="space-y-3 text-base text-white/50">
                <p>info@ituraafrica.com</p>
                <p>Paris, France</p>
                <p>
                  <a href="https://instagram.com/itura_paris" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Instagram: @itura_paris
                  </a>
                </p>
              </div>
            </div>

            <div className="scroll-reveal">
              <h3 className="font-serif text-2xl mb-8">Get in Touch</h3>
              {contactSubmitted ? (
                <div className="py-12 text-center animate-fade-in">
                  <p className="font-serif text-2xl mb-3">Message Sent</p>
                  <p className="text-white/60">Thank you, {contactName}. We will be in touch.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <input type="text" name="website_url" value={contactWebsiteUrl} onChange={(e) => setContactWebsiteUrl(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Full Name" className="fashion-input" />
                  <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email Address" className="fashion-input" />
                  <input type="text" value={contactFirm} onChange={(e) => setContactFirm(e.target.value)} placeholder="Company / Firm (Optional)" className="fashion-input" />
                  <textarea value={contactNotes} onChange={(e) => setContactNotes(e.target.value)} placeholder="Your Message" rows={3} className="fashion-input resize-none" />
                  <button type="submit" disabled={isContactSubmitting} className="btn-fashion w-full justify-center py-4">
                    <span>{isContactSubmitting ? 'Sending\u2026' : 'Send Message'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider">
            <p className="text-white/30">&copy; 2026 ITURA. All rights reserved.</p>
            <p className="text-white/50 uppercase">
              Designed by <a href="http://www.ideasites.com" target="_blank" rel="noreferrer" className="text-white hover:underline">Ideastosites</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
