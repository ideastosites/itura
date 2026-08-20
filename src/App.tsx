import DraggableMarquee from './components/DraggableMarquee';
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

const brands = [
  { name: 'Cute-Saint', bio: 'Cute-Saint is a contemporary African fashion brand rooted in culture, sustainability, and soulful design. we craft pieces that reflect the rhythm of Africa while speaking a global design language.', founder: 'Femi Ajose', country: 'Nigeria/France', productType: 'Clothing', website: 'http://www.cutesaint.com', image: '/Brands_Images/Itura brands 1.png' },
  { name: 'MÁADÁN', bio: 'Máadán is an African skincare brand dedicated to promoting total well- being by redefining "GLOW" as an inner experience. Drawing inspiration from the Yoruba term "Adúmáradán," meaning "one who shines through their dark complexion.', founder: 'Adeitan Fisher', country: 'Nigeria', productType: 'Beauty/Skincare', website: null, image: '/Brands_Images/Itura brands 11.png' },
  { name: 'FIA', bio: 'Founded in 2015, FIA is a contemporary womenswear brand exploring artisanal possibilities by Funke(F),Ijeoma(I) and Abisose(A), a dynamic female trio. FIA is strongly inspired by the totality of the woman and the societal narratives that translate to her life experiences to craft modern, eclectic, artsy and quirky garments that will continue to push boundaries and liberate women all over the world.', founder: 'Olufunke Ola, Ijeoma Jibunoh and Abisose Ola', country: 'Nigeria', productType: 'Clothing', website: 'http://www.fiafactory.com', image: '/Brands_Images/Itura brands 12.png' },
  { name: 'Maliko', bio: 'Maliko is a Lagos-based artisanal footwear and accessory label founded in 2018 by self-taught designer Ebuka Omaliko. Rooted in culture yet globally minded, the brand fuses indigenous craftsmanship with contemporary design to create timeless pieces defined by refined luxury aesthetics.', founder: 'Ebuka Omaliko', country: 'Nigeria', productType: 'Accessories', website: null, image: '/Brands_Images/Itura brands 13.png' },
  { name: 'Jacques Logoh', bio: 'Jacques Logoh Couture is a luxury fashion house of Togolese origin, founded by designer Jacques Logoh. Operating between Lomé and Paris, the brand stands out for its unique approach that blends African heritage, artisanal craftsmanship, and contemporary aesthetics.', founder: 'Jacques logoh', country: 'Togo/france', productType: 'Clothing', website: 'http://www.jacqueslogohcouture.com', image: '/Brands_Images/Itura brands 14.png' },
  { name: 'Ruru', bio: 'Ruru emerged from our founder’s personal journey to discover clothing that embodies a timeless and effortless style. Ruru is a lifestyle brand that creates designs using premium natural fibres that reflect balance and ease. Each garment is thoughtfully crafted to prioritise comfort, quality, and precision, empowering women to feel confident and engaged.', founder: 'Ruth Obih', country: 'Nigeria', productType: 'Clothing', website: 'http://www.republicofruru.com', image: '/Brands_Images/Itura brands 15.png' },
  { name: "O'saunders", bio: "O'saunders is a unisex brand that you can represents modern day men/ women", founder: 'Olabisi Saunders', country: 'Nigeria', productType: 'Accessories, Clothing', website: 'mailto:Osaunders.designer@gmail.com', image: '/Brands_Images/Itura brands 16.png' },
  { name: 'Izoduuwa', bio: 'Izoduuwa is an Afro-contemporary fashion brand blending African heritage, handcrafted techniques, and modern design. Through linen, denim, and traditional Nigerian textiles such as Aso Oke, we create timeless pieces that celebrate culture, craftsmanship, and identity. Through compelling visuals, storytelling, and creative expression, we bring these narratives to life, connecting African heritage with a global audience.', founder: 'Perry Aigbovbiosa', country: 'Nigeria', productType: 'Clothing, Lifestyle Products', website: 'http://www.izoduuwa.com.ng', image: '/Brands_Images/Itura brands 17.png' },
  { name: 'Vicy and Lawrence', bio: 'VICY & LAWRENCE is a bold Nigerian fashion brand reshaping urban style through a futuristic lens. Guided by the ethos “Tradition changes, culture is who we are,” the brand merges deep-rooted heritage with fearless innovation', founder: 'Obiora Victor', country: 'Nigeria', productType: 'Clothing', website: 'https://ananse.com/en/vicy&lawrence', image: '/Brands_Images/Itura brands 18.png' },
  { name: 'Dear Ketandu', bio: 'Dear Ketandu is a repair-focused body and scalp care brand rooted in restorative living. We create effective care rituals for dry, stressed skin and scalp while building a softer, more intentional way of living.', founder: 'Oluchi C. Ekeruche', country: 'Nigeria', productType: 'Beauty/Skincare', website: 'http://www.dearketandu.com', image: '/Brands_Images/Itura brands 19.png' },
  { name: 'LOHIJE', bio: "LOHIJE is a contemporary African lifestyle brand from Lagos, Nigeria, inspired by the spirit of exploration. Made for the adventurer in soul, spirit and body, LOHIJE explores Africa's rich heritage, craftsmanship, and cultural stories, transforming them into thoughtfully designed pieces for modern living.", founder: 'Gift Olohije', country: 'Nigeria', productType: 'Clothing', website: 'http://www.lohije.com', image: '/Brands_Images/Itura brands 10.png' },
  { name: 'DESTOM', bio: 'Destom is a fluid fashion label rooted in inheritance — named after a grandmother, shaped by the codes of Caribbean cultural blending, expressed in the cuts, the fabrics, the way things are worn and felt.', founder: 'Belair kevin', country: 'France', productType: 'Clothing', website: 'https://www.instagram.com/destomofficial', image: '/Brands_Images/Itura brands 9.png' },
  { name: 'NoahbyWMA', bio: 'NOAH is the signature luxury product range of Woven Market Africa, a Nigerian textile company shaping the future of African weaving through design, innovation, and craft. Developed within the Woven Market Africa ecosystem, NOAH transforms Nigerian-grown cotton into heirloom-quality textiles for fashion and interiors.', founder: 'Faika Philips', country: 'Nigeria', productType: 'Clothing, Accessories', website: 'http://www.noahbywma.com', image: '/Brands_Images/Itura brands 8.png' },
  { name: 'ÀÁDÚN & Co', bio: 'ÀÁDÙN & Co. is a contemporary, fragrance-powered wellness brand rooted in West African botanical traditions. We craft clean, alcohol-free perfume oils & botanical teas designed around intentional living and rich storytelling. Each scent is named in Yoruba and carries its own cultural narrative, transforming a simple daily routine into a grounding self-care ritual.', founder: 'Samira Bello', country: 'Nigeria', productType: 'Lifestyle Products', website: 'http://www.aadun.co', image: '/Brands_Images/Itura brands 7.png' },
  { name: 'Austine Mali', bio: "There's a seam on every Austine Mali piece that most people will never look for, and that's exactly the point. We build clothes the way tailors used to before speed became the industry's only metric: hand-finished, deliberate, made to outlast the season they were made for.", founder: 'Uche Onyemali', country: 'United Kingdom', productType: 'Clothing', website: 'http://www.austinemali.com', image: '/Brands_Images/Itura brands 6.png' },
  { name: 'RENIKEJI', bio: 'RENIKEJI celebrates the power of jewelry to anchor us to the world and all that it means. We create pieces that inspire curiosity and attentiveness to our home, Nigeria. At the heart of our craft is a commitment to materials with resonance, from brass to the gemstones of Nigerian origin. Each piece is crafted by hand- honouring centuries of Nigerian jewelry design and craftsmanship.', founder: 'Oluwakemi Agbato', country: 'Nigeria', productType: 'Accessories', website: 'http://www.renikeji.com', image: '/Brands_Images/Itura brands 5.png' },
  { name: 'Isaleekofromderin', bio: 'Isaleekofromderin is a made to measure fashion brand based in Lagos, Nigeria. Founded in 2023 by Nigerian fashion lifestyle influencer Aderinola Odugbesan. Isaleekofromderin creates comfort-first, all size friendly pieces designed for women who value ease, confidence, and effortless style. Inspired by the vibrancy of Lagos.', founder: 'Aderinola Odugbesan', country: 'Nigeria', productType: 'Clothing', website: 'http://isaleekofromderin.com', image: '/Brands_Images/Itura brands 4.png' },
  { name: 'AfroWema', bio: 'AfroWema is a Kenya-based sustainable fashion brand redefining African luxury through conscious design. Founded by Portuguese biologist and sustainability advocate Tatiana Teixeira, AfroWema transforms discarded denim, locally sourced textiles, and reclaimed materials into timeless, handcrafted pieces created by artisans in Kibera, Nairobi', founder: 'Tatiana Teixeira', country: 'Kenya', productType: 'Clothing', website: 'http://www.afrowema.com', image: '/Brands_Images/Itura brands 3.png' },
  { name: 'Studio Lola', bio: 'Studio Lola is a women-led, ethical design atelier that celebrates heritage craft techniques through meticulously hand-crafted timeless creations.', founder: 'Sarah Saleheen', country: 'Kenya', productType: 'Clothing, Accessories', website: 'http://www.studiolola.design', image: '/Brands_Images/Itura brands 2.png' },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [modalCompany, setModalCompany] = useState('');
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

  const [detailedModalType, setDetailedModalType] = useState<'investor_deck' | 'join_itura' | null>(null);
  const [detName, setDetName] = useState('');
  const [detCompany, setDetCompany] = useState('');
  const [detJob, setDetJob] = useState('');
  const [detEmail, setDetEmail] = useState('');
  const [detPhone, setDetPhone] = useState('');
  const [detCountry, setDetCountry] = useState('');
  const [detInvestType, setDetInvestType] = useState('');
  const [detSubmitted, setDetSubmitted] = useState(false);
  const [isDetSubmitting, setIsDetSubmitting] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<{ name: string; bio: string; founder: string; country: string; productType: string; website: string | null; image: string | null } | null>(null);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (galleryOpen !== null || isModalOpen || detailedModalType !== null || selectedBrand !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [galleryOpen, isModalOpen, detailedModalType, selectedBrand]);


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
    { img: '/Hero_Images/IMG_7148.webp' },
    { img: '/Hero_Images/IMG_7377.webp' },
    { img: '/Hero_Images/IMG_7503.webp' },
    { img: '/Hero_Images/IMG_7584.webp' },
    { img: '/Hero_Images/IMG_7657.webp' },
    { img: '/Hero_Images/IMG_7701.webp' },
    { img: '/Hero_Images/IMG_7785.webp' },
    { img: '/Hero_Images/IMG_7830.webp' },
  ];

  const campaignSlides = [
    { img: '/Paris_campaign/IMG_6688.webp' },
    { img: '/Paris_campaign/IMG_6720.webp' },
    { img: '/Paris_campaign/IMG_6766.webp' },
    { img: '/Paris_campaign/IMG_6984.webp' },
    { img: '/Paris_campaign/IMG_7008.webp' },
    { img: '/Paris_campaign/IMG_7233.webp' },
    { img: '/Paris_campaign/IMG_7323.webp' },
    { img: '/Paris_campaign/IMG_7351.webp' },
    { img: '/Paris_campaign/IMG_7455.webp' },
    { img: '/Paris_campaign/IMG_7524.webp' },
  ];

  const cocktailSlides = [
    { img: '/Paris_cocktail/IMG_7570.webp' },
    { img: '/Paris_cocktail/IMG_7581.webp' },
    { img: '/Paris_cocktail/IMG_7583.webp' },
    { img: '/Paris_cocktail/IMG_7594.webp' },
    { img: '/Paris_cocktail/IMG_7652.webp' },
    { img: '/Paris_cocktail/IMG_7676.webp' },
    { img: '/Paris_cocktail/IMG_7769.webp' },
    { img: '/Paris_cocktail/IMG_7803.webp' },
    { img: '/Paris_cocktail/IMG_7908.webp' },
    { img: '/Paris_cocktail/IMG_7969-2.webp' },
  ];

  const previousPopUps: Record<string, { title: string; subtitle: string; images: string[] }> = {
    'paris-spring': {
      title: 'Paris Spring Pop-Up',
      subtitle: 'Spring 2025 — Le Marais, Paris',
      images: [
        '/Paris_Spring/Paris_Spring (1).webp',
        '/Paris_Spring/Paris_Spring (2).webp',
        '/Paris_Spring/Paris_Spring (3).webp',
        '/Paris_Spring/Paris_Spring (4).webp',
        '/Paris_Spring/Paris_Spring (5).webp',
        '/Paris_Spring/Paris_Spring (6).webp',
        '/Paris_Spring/Paris_Spring (7).webp',
        '/Paris_Spring/Paris_Spring (8).webp',
        '/Paris_Spring/Paris_Spring (9).webp',
        '/Paris_Spring/Paris_Spring (10).webp',
      ],
    },
    'fete-musique': {
      title: 'Paris F\u00eate de la Musique',
      subtitle: 'June 2025 — F\u00eate de la Musique, Paris',
      images: [
        '/Paris_Fete/Paris_Fete 1 (1).webp',
        '/Paris_Fete/Paris_Fete 1 (2).webp',
        '/Paris_Fete/Paris_Fete 1 (3).webp',
        '/Paris_Fete/Paris_Fete 1 (4).webp',
        '/Paris_Fete/Paris_Fete 1 (5).webp',
        '/Paris_Fete/Paris_Fete 1 (6).webp',
        '/Paris_Fete/Paris_Fete 1 (7).webp',
        '/Paris_Fete/Paris_Fete 1 (8).webp',
        '/Paris_Fete/Paris_Fete 1 (9).webp',
        '/Paris_Fete/Paris_Fete 1 (10).webp',
      ],
    },
  };

  const navLinks = [
    { label: 'Opportunity', href: '#about' },
    { label: 'Concept', href: '#concept' },
    { label: 'Archive', href: '#archive' },
    { label: 'Events', href: '#popup' },
    { label: 'Brands', href: '#brands' },
    { label: 'Join Us', href: '#join-us' },
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
      } else { const errData = await res.json().catch(()=>({})); alert('Error: ' + (errData.message || 'Failed to send message.')); }
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
        body: JSON.stringify({ name: nameInput, email: emailInput, firm: modalCompany, website_url: modalWebsiteUrl, source: 'Investor Inquiry' }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setIsModalOpen(false); setEmailInput(''); setNameInput(''); setModalCompany(''); setModalWebsiteUrl(''); }, 3000);
      } else { const errData = await res.json().catch(()=>({})); alert('Error: ' + (errData.message || 'Failed to send request.')); }
    } catch (err) { alert('Network error. Please try again.'); }
    finally { setIsModalSubmitting(false); }
  };

  const handleDetailedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detEmail.trim() || !detName.trim()) return;
    setIsDetSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: detName, 
          email: detEmail, 
          firm: detCompany,
          job_title: detJob,
          phone: detPhone,
          country: detCountry,
          investment_type: detInvestType,
          source: detailedModalType === 'investor_deck' ? 'Investor Deck Request' : 'Brand Participation (Join ITURA)' 
        }),
      });
      if (res.ok) {
        setDetSubmitted(true);
        setTimeout(() => { 
          setDetSubmitted(false); 
          setDetailedModalType(null); 
          setDetName(''); setDetCompany(''); setDetJob(''); setDetEmail(''); setDetPhone(''); setDetCountry(''); setDetInvestType(''); 
        }, 3000);
      } else { const errData = await res.json().catch(()=>({})); alert('Error: ' + (errData.message || 'Failed to send request.')); }
    } catch (err) { alert('Network error. Please try again.'); }
    finally { setIsDetSubmitting(false); }
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
                <h3 className="font-serif text-2xl mb-3">Request Received</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  Thank you, <strong className="text-white">{nameInput}</strong>. We will send you the investor materials shortly.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl mb-2">Investor Information Request</h3>
                <p className="text-sm text-white/60 mb-8 leading-relaxed">
                  Request investor materials, deck, and partnership details.
                </p>
                <form onSubmit={handleModalSubmit} className="space-y-6">
                  <input type="text" name="website_url" value={modalWebsiteUrl} onChange={(e) => setModalWebsiteUrl(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Full Name *</label>
                    <input type="text" required value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Full Name" className="fashion-input" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Company Name</label>
                    <input type="text" value={modalCompany} onChange={(e) => setModalCompany(e.target.value)} placeholder="Company Name" className="fashion-input" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Work Email *</label>
                    <input type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Work Email" className="fashion-input" />
                  </div>
                  <button type="submit" disabled={isModalSubmitting} className="btn-fashion w-full justify-center py-4 mt-4 text-xs">
                    <span>{isModalSubmitting ? 'Processing\u2026' : 'Submit Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── DETAILED MODAL (Join Us / Invest) ── */}
      {detailedModalType && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-menu overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setDetailedModalType(null)}
        >
          <div className="bg-[#0A0A0A] border border-white/15 p-8 md:p-10 max-w-lg w-full relative text-white my-8 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <button onClick={() => setDetailedModalType(null)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            {detSubmitted ? (
              <div className="text-center py-8 animate-fade-in">
                <h3 className="font-serif text-2xl mb-3">Request Received</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  Thank you, <strong className="text-white">{detName}</strong>.
                  {detailedModalType === 'investor_deck'
                    ? ' We will send you the investor materials shortly.'
                    : ' Our team will be in touch with you soon regarding brand participation.'}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  {detailedModalType === 'investor_deck' ? "Request Investor's Deck" : 'Join ITURA'}
                </h3>
                <p className="text-sm text-white/60 mb-8 leading-relaxed">
                  {detailedModalType === 'investor_deck'
                    ? 'Please provide your details below to receive our growth strategy, financial projections, and investment opportunities.'
                    : 'Interested in brand participation or partnership? Let us know more about you.'}
                </p>
                <form onSubmit={handleDetailedSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Full Name *</label>
                      <input type="text" required value={detName} onChange={(e) => setDetName(e.target.value)} placeholder="Full Name" className="fashion-input" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Company / Org</label>
                      <input type="text" value={detCompany} onChange={(e) => setDetCompany(e.target.value)} placeholder="Company" className="fashion-input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Job Title</label>
                      <input type="text" value={detJob} onChange={(e) => setDetJob(e.target.value)} placeholder="Job Title" className="fashion-input" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Email Address *</label>
                      <input type="email" required value={detEmail} onChange={(e) => setDetEmail(e.target.value)} placeholder="Email Address" className="fashion-input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Phone Number</label>
                      <input type="tel" value={detPhone} onChange={(e) => setDetPhone(e.target.value)} placeholder="Phone Number" className="fashion-input" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Country</label>
                      <input type="text" value={detCountry} onChange={(e) => setDetCountry(e.target.value)} placeholder="Country" className="fashion-input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-1">Investment Type</label>
                    <input type="text" value={detInvestType} onChange={(e) => setDetInvestType(e.target.value)} placeholder="e.g. Angel, VC, Family Office, Corporate" className="fashion-input" />
                  </div>
                  <button type="submit" disabled={isDetSubmitting} className="btn-fashion w-full justify-center py-4 mt-2 text-xs">
                    <span>{isDetSubmitting ? 'Processing\u2026' : detailedModalType === 'investor_deck' ? "Request Investor's Deck" : 'Join ITURA'}</span>
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
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-fashion mt-8 text-center flex items-center justify-center gap-2 px-8 py-3 w-48">
            <span>Reach Out</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="z-10">
            <img src={scrolled ? '/ituracolor.webp' : '/iturawhite.webp'} alt="ITURA" className="h-8 sm:h-12 transition-all" />
          </a>
          <div className={`hidden lg:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${scrolled ? 'text-[#0A0A0A]' : 'text-white'}`}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#18047b] hover:bg-[#2d16b3] text-white text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.15em] px-4 md:px-6 py-2 md:py-2.5 transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(24,4,123,0.25)] whitespace-nowrap">
              <span>Reach Out</span>
              <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </a>
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
            <button onClick={() => setIsModalOpen(true)} className="btn-fashion">
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
                <img src="/second section.webp"
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
                <button onClick={() => setIsModalOpen(true)} className="btn-fashion text-xs flex justify-center items-center gap-2">
                  <span>Investor Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a href="https://luma.com/scic6wj2" target="_blank" rel="noopener noreferrer" className="btn-outline-fashion text-xs flex justify-center items-center gap-2 border-[#18047b] text-[#18047b] hover:bg-[#18047b] hover:text-white">
                  <span>RSVP as Guest</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="scroll-reveal aspect-[3/4] overflow-hidden">
              <img src="/london_popup.webp" alt="ITURA Pop-Up" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PARTICIPATION - Scrolling marquee + modal */}
      <section id="brands" className="pt-20 sm:pt-28 pb-4 sm:pb-8 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-16 scroll-reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">Participating Brands</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-white">The Brands of ITURA</h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">A curated selection of Africa's most compelling independent fashion and lifestyle labels — click any name to learn more.</p>
        </div>
        <DraggableMarquee speed={1.2} direction="left">
            {brands.map((brand, idx) => (
              <button key={`top-${idx}`} onClick={() => setSelectedBrand(brand)} className="flex-shrink-0 mx-4 px-8 py-6 group focus:outline-none hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 rounded-sm">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white/50 group-hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wide">{brand.name}</span>
              </button>
            ))}
        </DraggableMarquee>
        <div className="mt-8">
          <DraggableMarquee speed={1.2} direction="right">
            {brands.map((brand, idx) => (
              <button key={`bot-${idx}`} onClick={() => setSelectedBrand(brand)} className="flex-shrink-0 mx-4 px-8 py-6 group focus:outline-none hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 rounded-sm">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white/50 group-hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wide">{brand.name}</span>
              </button>
            ))}
          </DraggableMarquee>
        </div>
      </section>

      {selectedBrand && (
        <div className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && setSelectedBrand(null)}>
          <div className="relative bg-[#0F0F0F] border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedBrand(null)} className="absolute top-4 right-4 z-10 text-white/40 hover:text-white transition-colors" aria-label="Close"><X className="w-6 h-6" /></button>
            
            {/* Promotional image (500x500 px placeholder layout) */}
            <div className="w-full aspect-square bg-white/5 flex items-center justify-center border-b border-white/10">
              {selectedBrand.image ? (
                <img src={selectedBrand.image} alt={selectedBrand.name} className="w-full h-full object-cover"  />
              ) : (
                <div className="text-center px-8">
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white/30 text-2xl font-serif">{selectedBrand.name.charAt(0)}</span>
                  </div>
                  <p className="text-white/20 text-xs tracking-[0.2em] uppercase">Promotional Image</p>
                  <p className="text-white/10 text-xs mt-1">500 x 500 px</p>
                </div>
              )}
            </div>
            
            <div className="p-8">
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 mb-5">{selectedBrand.productType}</span>
              <h3 className="font-serif text-3xl text-white mb-4">{selectedBrand.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{selectedBrand.bio}</p>
              
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm"><span className="text-white/30 tracking-[0.1em] uppercase text-xs">Founder</span><span className="text-white/80 text-right max-w-[60%]">{selectedBrand.founder}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/30 tracking-[0.1em] uppercase text-xs">Country</span><span className="text-white/80">{selectedBrand.country}</span></div>
                {selectedBrand.website && (<div className="flex justify-between text-sm"><span className="text-white/30 tracking-[0.1em] uppercase text-xs">Website</span><a href={selectedBrand.website} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline underline-offset-2 text-right max-w-[55%] break-all">{selectedBrand.website.replace(/^https?:\/\/(www\.)?/, '')}</a></div>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          PREVIOUS POP-UPS — Fashion editorial cards
          ══════════════════════════════════════════════════ */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-16 bg-[#0A0A0A] overflow-hidden">
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
          JOIN US / INVEST — New detailed section
          ══════════════════════════════════════════════════ */}
      <section id="join-us" className="bg-[#FAFAFA] py-24 sm:py-32 border-t border-[#0A0A0A]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* LEFT COLUMN: Pitch & CTA */}
            <div className="lg:col-span-7 scroll-reveal">
              <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6 font-semibold">Join ITURA</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] mb-10 leading-[1.1] tracking-tight">
                Invest in the Future <br className="hidden sm:block" />of African Retail
              </h2>
              
              <div className="text-[#0A0A0A]/70 space-y-6 text-lg sm:text-xl leading-relaxed font-light mb-12 max-w-2xl">
                <p>
                  <strong className="font-medium text-[#0A0A0A]">ITURA is redefining how the world discovers African creativity.</strong>
                </p>
                <p>
                  We are building Europe's leading destination for premium African fashion, beauty, accessories,
                  homeware, and cultural experiences—connecting exceptional independent brands with a global
                  audience through immersive retail, curated events, and strategic partnerships.
                </p>
                <p>
                  Our vision extends beyond a concept store. ITURA is creating an ecosystem where African creativity is
                  commercially successful, culturally celebrated, and globally accessible.
                </p>
                <p>
                  As we expand our retail footprint, launch new experiential concepts, and scale across major
                  international cities, we are seeking investors and strategic partners who share our long-term vision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <button onClick={() => setDetailedModalType('investor_deck')} className="w-full sm:w-auto bg-[#18047b] hover:bg-[#2d16b3] text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-10 py-5 transition-all hover:-translate-y-1 shadow-[0_10px_40px_rgba(24,4,123,0.3)] flex items-center justify-center gap-3">
                  <span>Request Investor's Deck</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => setDetailedModalType('join_itura')} className="w-full sm:w-auto bg-transparent border border-[#0A0A0A]/20 text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-10 py-5 transition-all flex items-center justify-center gap-3">
                  <span>Join ITURA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Target Partners Card */}
            <div className="lg:col-span-5 scroll-reveal">
              <div className="bg-[#0A0A0A] text-white p-10 sm:p-14 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#18047b] rounded-full blur-[100px] opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-10 pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
                
                <h3 className="font-serif text-2xl sm:text-3xl mb-10 pb-6 border-b border-white/10 relative z-10">We welcome conversations with:</h3>
                
                <ul className="space-y-6 text-white/80 text-base sm:text-lg tracking-wide font-light relative z-10">
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Angel Investors</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Venture Capital Firms</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Family Offices</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Strategic Corporate Partners</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Retail &amp; Real Estate Partners</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>Impact Investors</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>High-Net-Worth Individuals</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER & CONTACT — Dark editorial
          ══════════════════════════════════════════════════ */}
      <footer id="contact" className="bg-[#0A0A0A] text-white py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="scroll-reveal">
              <img  src="/iturawhite.webp" alt="ITURA" className="h-12 mb-8" />
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-6">
                To be the global gateway for African creativity.
              </h2>
              <p className="text-base text-white/60 leading-[1.85] mb-10">
                More Than a Store &mdash; A Destination. A Parisian storefront + global e-commerce reach. Connecting African designers with global consumers while supporting international growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 text-sm text-white/50 border-t border-white/10 pt-10">
                <div>
                  <a href="mailto:info@ituraafrica.com" className="text-white hover:text-[#D4AF37] transition-colors block text-base mb-1">info@ituraafrica.com</a>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">General Enquiries</span>
                </div>
                <div>
                  <a href="mailto:brands@ituraafrica.com" className="text-white hover:text-[#D4AF37] transition-colors block text-base mb-1">brands@ituraafrica.com</a>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Brand Participation</span>
                </div>
                <div>
                  <a href="mailto:press@ituraafrica.com" className="text-white hover:text-[#D4AF37] transition-colors block text-base mb-1">press@ituraafrica.com</a>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Press Enquiries</span>
                </div>
                <div>
                  <p className="text-white text-base mb-1">Paris, France</p>
                  <a href="https://instagram.com/ituraafrique" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#D4AF37] transition-colors block text-[10px] tracking-widest uppercase">
                    IG: @ituraafrique
                  </a>
                </div>
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
