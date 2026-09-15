import React, { useState, useEffect, useRef } from 'react';
import {
  PenTool,
  Layers,
  Monitor,
  Share2,
  ArrowRight,
  ArrowUpRight,
  Check,
  Quote,
  Plus,
  Minus,
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Menu,
  X,
  Sparkles,
  Heart,
  Zap,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA & CONSTANTS (Strictly per user requirements)
// ═══════════════════════════════════════════════════════════════

interface PortfolioItem {
  id: string;
  category: 'GRAPHIC DESIGN' | 'BRANDING' | 'WEB DESIGN';
  title: string;
  subtitle: string;
  image: string;
  url?: string;
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'p1',
    category: 'BRANDING',
    title: 'Brand Identity',
    subtitle: 'Clothing Brand',
    image: '/public/portfolio-branding-01.jpg',
    url: '#',
  },
  {
    id: 'p2',
    category: 'BRANDING',
    title: 'Brand Identity',
    subtitle: 'Clothing Brand',
    image: '/public/portfolio-branding-02.jpg',
    url: '#',
  },
  {
    id: 'p3',
    category: 'WEB DESIGN',
    title: 'Website Design',
    subtitle: 'Business Company',
    image: '/public/portfolio-web-01.jpg',
    url: 'https://www.foxablegroup.co.th/',
  },
  {
    id: 'p4',
    category: 'WEB DESIGN',
    title: 'Website Design',
    subtitle: 'Café Business',
    image: '/public/portfolio-web-02.jpg',
    url: 'https://www.finebymebakery.com/',
  },
  {
    id: 'p5',
    category: 'GRAPHIC DESIGN',
    title: 'Social Media Design',
    subtitle: 'Skincare Brand',
    image: '/public/portfolio-graphic-01.jpg',
    url: '#',
  },
  {
    id: 'p6',
    category: 'GRAPHIC DESIGN',
    title: 'Packaging Design',
    subtitle: 'Food Brand',
    image: '/public/portfolio-graphic-02.jpg',
    url: '#',
  },
];

const SERVICES_DATA = [
  {
    id: 'graphic-design',
    title: 'GRAPHIC DESIGN',
    icon: PenTool,
    description:
      'Creative graphic design that turns information and ideas into clear, engaging, and on-brand visuals.',
    bullets: [
      'Social Media Design',
      'Advertising Design',
      'Poster & Banner Design',
      'Marketing Materials',
      'Presentation Design',
      'Print Design',
    ],
  },
  {
    id: 'branding',
    title: 'BRANDING',
    icon: Layers,
    description:
      'Building clear and distinctive brand identities that stay consistent across every touchpoint.',
    bullets: [
      'Logo Design',
      'Brand Identity',
      'Visual Identity',
      'Brand Guidelines',
      'Mascot / Character Design',
      'Social Media Identity',
    ],
  },
  {
    id: 'web-design',
    title: 'WEB DESIGN',
    icon: Monitor,
    description:
      'Modern, responsive websites designed to look great, communicate clearly, and support real business goals.',
    bullets: [
      'Business Website',
      'Portfolio Website',
      'Landing Page',
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    description:
      'Understanding your brand and goals. We start by getting to know your business, goals, target audience, desired style, and project scope.',
  },
  {
    step: '02',
    title: 'DEFINE',
    description:
      'Setting the direction. We analyze everything and shape the Creative Direction — defining the concept, mood & tone, and the right direction for your brand.',
  },
  {
    step: '03',
    title: 'DESIGN',
    description:
      'Turning ideas into design. We develop the concept into real design work, refining details until it\'s beautiful, clear, and functional.',
  },
  {
    step: '04',
    title: 'DELIVER',
    description:
      'Review and handoff. We check everything carefully, prepare files ready for use, and deliver work that\'s ready to launch.',
  },
];

const WHY_CHOOSE_US_DATA = [
  {
    icon: Heart,
    title: 'Brand-First Approach',
    description:
      'We understand your brand before we design, so the work truly fits your goals and identity.',
  },
  {
    icon: Sparkles,
    title: 'Purposeful Design',
    description:
      'Every element has a reason — beautiful and functional at the same time.',
  },
  {
    icon: Zap,
    title: 'Tailored For You',
    description:
      'No cookie-cutter templates — every project is designed specifically for your brand.',
  },
  {
    icon: Layers,
    title: 'Full-Service Studio',
    description:
      'Graphic, Branding, and Web all in one place for a consistent brand image.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description:
      'A structured process that keeps you informed and able to track progress easily.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Grow',
    description:
      'Design that\'s ready to scale and support your brand\'s future growth.',
  },
];

const TESTIMONIALS_DATA = [
  {
    category: 'Graphic Design',
    quote:
      'เข้าใจโจทย์เร็ว งานออกแบบตรงกับภาพที่ต้องการ และช่วยให้งานดูเป็นมืออาชีพขึ้นมาก',
    name: 'Sarah Lim',
    role: 'Founder, Bloom Co.',
    business: 'Client Name / Business',
  },
  {
    category: 'Branding',
    quote:
      'จากไอเดียที่ยังไม่ชัด กลายเป็นภาพลักษณ์แบรนด์ที่มีตัวตนและน่าจดจำมากขึ้น',
    name: 'James Tan',
    role: 'CEO, Solara Tech',
    business: 'Client Name / Brand',
  },
  {
    category: 'Web Design',
    quote:
      'เว็บไซต์ออกมาสวย ใช้งานง่าย และภาพรวมดูเป็นแบรนด์เดียวกันมากขึ้น',
    name: 'Emily Chen',
    role: 'Marketing Manager, PureLife',
    business: 'Client Name / Company',
  },
];

const FAQ_DATA = [
  {
    question: 'เริ่มต้นจ้างงานอย่างไร?',
    answer:
      'ส่งรายละเอียดงาน เป้าหมาย และตัวอย่างสไตล์ที่ต้องการมาให้เราเพื่อประเมินงานและเสนอแนวทาง',
  },
  {
    question: 'ราคางานออกแบบเริ่มต้นเท่าไหร่?',
    answer: 'ราคาขึ้นอยู่กับประเภท ขอบเขต และความซับซ้อนของแต่ละโปรเจกต์',
  },
  {
    question: 'ใช้เวลาทำงานกี่วัน?',
    answer:
      'ระยะเวลาขึ้นอยู่กับขนาดของงาน โดยจะแจ้ง Timeline ให้ทราบก่อนเริ่มโปรเจกต์',
  },
  {
    question: 'สามารถแก้ไขงานได้หรือไม่?',
    answer:
      'ได้ โดยจำนวนรอบการแก้ไขจะระบุไว้อย่างชัดเจนในรายละเอียดของแต่ละแพ็กเกจ',
  },
  {
    question: 'ต้องเตรียมข้อมูลอะไรบ้างก่อนเริ่มงาน?',
    answer:
      'ข้อมูลธุรกิจ เนื้อหา รูปภาพ โลโก้เดิม และ Reference ที่ชอบ จะช่วยให้เราเข้าใจทิศทางได้เร็วขึ้น',
  },
  {
    question: 'รับทำเว็บไซต์พร้อมใช้งานหรือเฉพาะออกแบบ?',
    answer:
      'สามารถให้บริการได้ทั้งงานออกแบบและเว็บไซต์พร้อมใช้งาน ขึ้นอยู่กับขอบเขตของโปรเจกต์',
  },
  {
    question: 'สามารถจ้างหลายบริการพร้อมกันได้ไหม?',
    answer:
      'ได้ เช่น Branding + Graphic Design + Website เพื่อให้ภาพลักษณ์ของแบรนด์ไปในทิศทางเดียวกัน',
  },
  {
    question: 'หลังส่งมอบงานมีดูแลต่อหรือไม่?',
    answer:
      'ขึ้นอยู่กับประเภทบริการและแพ็กเกจ โดยรายละเอียดการดูแลหลังส่งมอบจะแจ้งก่อนเริ่มงาน',
  },
];

// ═══════════════════════════════════════════════════════════════
// REUSABLE SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

/**
 * Image component with graceful fallback to a rounded rectangle with soft gradient
 * from #FF6A00 to #FFF4E9, strictly adhering to the prompt requirements.
 */
interface StudioImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
}

function StudioImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackLabel,
  ...props
}: StudioImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasTriedAlt, setHasTriedAlt] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasTriedAlt(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    // If /public/... path failed in browser, try root /... as secondary attempt
    if (!hasTriedAlt && currentSrc.startsWith('/public/')) {
      setHasTriedAlt(true);
      setCurrentSrc(currentSrc.replace(/^\/public/, ''));
    } else {
      // Missing or invalid image: swap to graceful soft gradient fallback
      setHasError(true);
    }
  };

  // If error occurs or file is missing, show graceful fallback:
  // a rounded rectangle div with a soft gradient from #FF6A00 to #FFF4E9
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center relative overflow-hidden rounded-[20px] ${className}`}
        style={{
          background: 'linear-gradient(135deg, #FF6A00 0%, #FFF4E9 100%)',
          minHeight: '100px',
        }}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-4 select-none">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/40 flex items-center justify-center text-[#FF6A00] shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs text-[#1E1E1E]/80 tracking-wider uppercase block">
            {fallbackLabel || alt || 'MD FOXABLE STUDIO'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      {...props}
    />
  );
}

/**
 * Scroll Reveal Component using IntersectionObserver
 */
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Section Header Badge
 */
function SectionBadge({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] font-bold text-xs tracking-wider uppercase mb-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
      {label}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APPLICATION COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function App() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Portfolio Filter Tab State
  const [portfolioTab, setPortfolioTab] = useState<
    'ALL' | 'GRAPHIC DESIGN' | 'BRANDING' | 'WEB DESIGN'
  >('ALL');

  // FAQ Accordion Open State (item index or null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Graphic Design',
    budget: '10,000–30,000 THB',
    details: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Sticky Navbar listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Filtered portfolio items
  const filteredPortfolio =
    portfolioTab === 'ALL'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === portfolioTab);

  // Contact form submission via Web3Forms
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic client-side validation for required fields: Name, Email, Phone
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!formState.name.trim()) {
      errors.name = 'Please enter your name';
    }
    if (!formState.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formState.phone.trim()) {
      errors.phone = 'Please enter your phone number';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'be5d4be6-10c2-44f0-91fd-89eb820e145b',
          name: formState.name.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim(),
          service: formState.service,
          budget: formState.budget,
          message: formState.details.trim(),
          subject: 'New project inquiry from ' + formState.name.trim(),
          from_name: 'MD FOXABLE STUDIO Website',
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success === true) {
        setFormSubmitted(true);
        setFormError(null);
        setFormState({
          name: '',
          email: '',
          phone: '',
          service: 'Graphic Design',
          budget: '10,000–30,000 THB',
          details: '',
        });
        setFieldErrors({});
        setTimeout(() => {
          setFormSubmitted(false);
        }, 6000);
      } else {
        setFormError(
          result.message ||
            'Something went wrong. Please try again or contact us directly via email or LINE.'
        );
      }
    } catch (err) {
      setFormError(
        'Something went wrong. Please try again or contact us directly via email or LINE.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFF4E9] text-[#1E1E1E]">
      {/* ─────────────────────────────────────────────────────────────
          1. STICKY NAVBAR
      ───────────────────────────────────────────────────────────── */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#FFF4E9]/95 backdrop-blur-md shadow-md border-b border-[#1E1E1E]/5'
            : 'py-5 bg-[#FFF4E9]'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-[14px] bg-[#FF6A00] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <StudioImage
                src="/public/logo.png"
                alt="MD FOXABLE STUDIO logo"
                className="w-full h-full object-contain"
                fallbackLabel="MD"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#1E1E1E] leading-none">
                MD FOXABLE STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Services', id: 'services' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-semibold text-sm text-[#1E1E1E]/80 hover:text-[#FF6A00] tracking-wide transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA Button & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-hover-effect hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#FF6A00] text-white font-bold text-xs tracking-wider uppercase shadow-md cursor-pointer hover:bg-[#ff7b1a]"
            >
              START A PROJECT
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#1E1E1E] hover:bg-[#FF6A00]/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1E1E1E]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1E1E1E]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF4E9] border-b border-[#1E1E1E]/10 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-4">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left font-bold text-lg text-[#1E1E1E] hover:text-[#FF6A00] py-2 border-b border-[#1E1E1E]/5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-3 py-3.5 rounded-full bg-[#FF6A00] text-white font-extrabold text-sm tracking-wide uppercase text-center shadow-md"
              >
                START A PROJECT
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (id="home", cream background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="pt-32 pb-16 sm:pt-40 sm:pb-24 bg-[#FFF4E9] relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Text Column */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              {/* Small handwritten orange accent text */}
              <div className="hero-slide-in hero-delay-1 inline-block mb-3 font-handwriting text-[#FF6A00] text-2xl sm:text-3xl font-bold -rotate-3 select-none">
                Good Design Brighter Tomorrow ✦
              </div>

              {/* Two line headline */}
              <div className="hero-slide-in hero-delay-2 w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.08] text-[#1E1E1E] mb-4">
                  Creative ideas <br />
                  <span className="text-[#FF6A00]">made possible.</span>
                </h1>
              </div>

              {/* Services summary line & subtext */}
              <div className="hero-slide-in hero-delay-3 w-full">
                <p className="text-lg sm:text-xl font-medium text-[#1E1E1E] mb-2 tracking-tight">
                  Graphic Design · Branding · Web Design
                </p>
                <p className="text-base sm:text-lg text-[#1E1E1E]/70 max-w-xl mb-8 leading-relaxed">
                  Build a brighter brand with smart, sincere, and memorable
                  design.
                </p>
              </div>

              {/* Row of 4 small icon items with labels separated by thin vertical dividers */}
              <div className="hero-slide-in hero-delay-4 w-full">
                <div className="w-full bg-white/70 backdrop-blur-sm border border-[#1E1E1E]/8 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x sm:divide-[#1E1E1E]/10">
                    <div className="flex items-center gap-2.5 sm:justify-center">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#1E1E1E]">
                        Logo Design
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:justify-center sm:pl-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#1E1E1E]">
                        Brand Identity
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:justify-center sm:pl-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#1E1E1E]">
                        Website Design
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:justify-center sm:pl-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#1E1E1E]">
                        Social Media Design
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two buttons */}
              <div className="hero-slide-in hero-delay-5">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollToSection('portfolio')}
                    className="btn-hover-effect inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF6A00] text-white font-extrabold text-sm tracking-wide shadow-md cursor-pointer hover:bg-[#ff7b1a]"
                  >
                    VIEW OUR WORK <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="btn-hover-effect inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#1E1E1E] text-[#1E1E1E] font-bold text-sm tracking-wide hover:border-[#FF6A00] hover:text-[#FF6A00] cursor-pointer bg-transparent transition-colors"
                  >
                    START A PROJECT <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Mascot Column */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <Reveal delay={200} className="w-full max-w-[440px]">
                <div className="relative">
                  {/* Decorative background glow & subtle organic circle */}
                  <div className="absolute inset-0 bg-[#FF6A00]/15 rounded-full filter blur-3xl transform scale-90 -z-10"></div>

                  {/* Sparkle decorative icons */}
                  <div className="absolute -top-4 right-10 text-[#FF6A00] animate-bounce">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="absolute top-1/3 -left-4 text-[#FF6A00] animate-pulse">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-16 -right-2 text-[#FF6A00]">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  {/* Handwritten note near mascot */}
                  <div className="absolute -top-2 right-4 sm:-right-4 font-handwriting text-2xl font-bold text-[#FF6A00] rotate-6 flex flex-col items-center select-none z-20">
                    <span>Same Foxable Mindset</span>
                    <span className="text-xl">~🦊~</span>
                  </div>

                  {/* 3D Mascot Image with continuous floating animation */}
                  <div className="animate-float relative z-10 flex justify-center">
                    <StudioImage
                      src="/public/mascot-hero.png"
                      alt="MD FOXABLE Fox Mascot in black hoodie"
                      className="w-full max-w-[380px] h-auto object-contain drop-shadow-xl select-none"
                      fallbackLabel="Fox Mascot"
                    />
                  </div>

                  {/* Floating badge below mascot */}
                  <div className="absolute -bottom-4 left-6 sm:left-10 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#1E1E1E]/5 flex items-center gap-3 z-20">
                    <div className="w-3 h-3 rounded-full bg-[#FF6A00] animate-ping" />
                    <span className="text-xs font-bold text-[#1E1E1E]">
                      Ready to create with you!
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ABOUT US SECTION (id="about", cream background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-20 sm:py-28 bg-[#FFF4E9] border-t border-[#1E1E1E]/5 relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7">
              <Reveal>
                <SectionBadge label="ABOUT US" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] mb-6 leading-tight">
                  Good Ideas Deserve Better Design.
                </h2>
                <p className="text-base sm:text-lg text-[#1E1E1E]/80 leading-relaxed font-normal mb-8">
                  We're MD FOXABLE STUDIO, a creative design studio that believes
                  every idea has potential. We help turn our clients' thoughts
                  into clear, distinctive, and memorable designs through Graphic
                  Design, Branding, and Web Design. We focus on understanding the
                  brand before we start designing, so every piece not only looks
                  good but also tells a story, creates distinction, and delivers
                  real business results.
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="btn-hover-effect inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#1E1E1E] text-[#1E1E1E] font-bold text-sm tracking-wide hover:border-[#FF6A00] hover:text-[#FF6A00] cursor-pointer bg-transparent transition-colors"
                  >
                    LEARN MORE ABOUT US <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right content: Stats card + Mascot icon accent */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-end">
              <Reveal delay={200} className="w-full max-w-[400px]">
                {/* Mascot Icon Accent */}
                <div className="flex items-center gap-4 mb-4 justify-end">
                  <div className="font-handwriting text-2xl text-[#FF6A00] font-bold -rotate-3 text-right select-none">
                    Small Studio, <br /> Big Possibilities ♡
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/20 p-2 shadow-sm flex items-center justify-center animate-float">
                    <StudioImage
                      src="/public/mascot-icon.png"
                      alt="Fox Mascot Icon"
                      className="w-full h-full object-contain"
                      fallbackLabel="🦊"
                    />
                  </div>
                </div>

                {/* Small stats card replacing a separate stats bar */}
                <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-[#1E1E1E]/8">
                  <div className="space-y-6 divide-y divide-[#1E1E1E]/8">
                    <div className="pt-2 first:pt-0 flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#1E1E1E]/60 font-bold block mb-1">
                          Brands
                        </span>
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E]">
                          50+
                        </span>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="pt-6 flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#1E1E1E]/60 font-bold block mb-1">
                          Happy Clients
                        </span>
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#FF6A00]">
                          100+
                        </span>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <Heart className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="pt-6 flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#1E1E1E]/60 font-bold block mb-1">
                          Years of Experience
                        </span>
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E]">
                          10+
                        </span>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-[#FF6A00]/10 flex items-center justify-center text-[#FF6A00]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SERVICES SECTION (id="services", light-gray background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-20 sm:py-28 bg-[#E5E5E5] relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <Reveal>
              <SectionBadge label="OUR SERVICES" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] mb-3">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-[#1E1E1E]/70 max-w-xl">
                Creative solutions for a brighter tomorrow.
              </p>
            </Reveal>

            {/* Handwritten accent text near this section */}
            <Reveal delay={150}>
              <div className="font-handwriting text-2xl sm:text-3xl text-[#FF6A00] font-bold rotate-2 mt-4 md:mt-0 select-none">
                Design with Purpose ✦
              </div>
            </Reveal>
          </div>

          {/* Three cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service, index) => {
              const IconComp = service.icon;
              return (
                <Reveal key={service.id} delay={index * 120} className="h-full">
                  <div className="card-hover-effect bg-white rounded-[24px] p-7 sm:p-8 flex flex-col justify-between h-full shadow-sm relative group">
                    <div>
                      {/* Service Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-[#FF6A00] text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <IconComp className="w-7 h-7" />
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E1E1E] tracking-tight mb-3">
                        {service.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-sm text-[#1E1E1E]/75 leading-relaxed mb-6 font-normal">
                        {service.description}
                      </p>

                      {/* Bullet points */}
                      <ul className="space-y-2.5 mb-8">
                        {service.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#1E1E1E]/90"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Circular arrow button at bottom right scrolling to contact */}
                    <div className="pt-4 border-t border-[#1E1E1E]/8 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
                        Inquire Service
                      </span>
                      <button
                        onClick={() => scrollToSection('contact')}
                        className="w-10 h-10 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center group-hover:bg-[#FF6A00] group-hover:rotate-45 transition-all shadow-sm cursor-pointer"
                        aria-label={`Inquire about ${service.title}`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PORTFOLIO SECTION (id="portfolio", cream background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="portfolio"
        className="py-20 sm:py-28 bg-[#FFF4E9] relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <Reveal>
              <SectionBadge label="OUR PORTFOLIO" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] mb-4">
                Our Work
              </h2>
            </Reveal>
          </div>

          {/* Filter Tabs (Functional with React State) */}
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
              {(
                ['ALL', 'GRAPHIC DESIGN', 'BRANDING', 'WEB DESIGN'] as const
              ).map((tab) => {
                const isActive = portfolioTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setPortfolioTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF6A00] text-white shadow-md scale-105'
                        : 'bg-transparent border border-[#1E1E1E]/20 text-[#1E1E1E]/80 hover:border-[#FF6A00] hover:text-[#FF6A00]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Grid of 6 portfolio items (responsive: 3 cols desktop, 2 cols tablet, 1 col mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPortfolio.map((item) => {
              const isClickable = Boolean(item.url && item.url !== '#' && item.url.trim() !== '');

              const cardNode = (
                <div
                  className={`bg-white rounded-[24px] overflow-hidden p-4 shadow-sm flex flex-col transition-all duration-300 ${
                    isClickable
                      ? 'card-hover-effect cursor-pointer group hover:shadow-md'
                      : 'cursor-default'
                  }`}
                >
                  {/* Image container with rounded corners and gradient fallback */}
                  <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden relative bg-[#FFF4E9] mb-4 group">
                    <StudioImage
                      src={item.image}
                      alt={`${item.title} - ${item.subtitle}`}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isClickable ? 'group-hover:scale-105' : ''
                      }`}
                      fallbackLabel={item.title}
                    />
                    <div className="absolute top-3 left-3 bg-[#1E1E1E]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase">
                      {item.category}
                    </div>
                  </div>

                  {/* Title and subtitle below */}
                  <div className="px-2 pb-2">
                    <h4 className="font-extrabold text-lg sm:text-xl text-[#1E1E1E] tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium text-[#1E1E1E]/60 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );

              if (isClickable) {
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-[24px]"
                  >
                    {cardNode}
                  </a>
                );
              }

              return (
                <div key={item.id}>
                  {cardNode}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. HOW IT WORKS SECTION (id="process", charcoal dark background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="process"
        className="py-20 sm:py-28 bg-[#1E1E1E] text-[#FFF4E9] relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] font-bold text-xs tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
                OUR PROCESS
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFF4E9] mb-3">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-[#FFF4E9]/70 max-w-xl">
                A simple process. A better result.
              </p>
            </Reveal>

            {/* Handwritten accent text */}
            <Reveal delay={150}>
              <div className="font-handwriting text-2xl sm:text-3xl text-[#FF6A00] font-bold -rotate-3 mt-4 md:mt-0 select-none">
                From Ideas to Impact ✦
              </div>
            </Reveal>
          </div>

          {/* Horizontal 4-step timeline connected by a line */}
          <div className="relative">
            {/* Connecting horizontal line for desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-[#FFF4E9]/15 -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <Reveal key={step.step} delay={idx * 120}>
                  <div className="flex flex-col items-start">
                    {/* Numbered circle */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-base mb-6 shadow-md transition-transform hover:scale-110 ${
                        idx === 0
                          ? 'bg-[#FF6A00] text-white ring-4 ring-[#FF6A00]/30'
                          : 'bg-[#292929] border-2 border-[#FFF4E9]/30 text-[#FFF4E9]'
                      }`}
                    >
                      {step.step}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#FFF4E9] mb-2.5">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-[#FFF4E9]/75 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. WHY CHOOSE US SECTION (id="why-us", cream background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="why-us"
        className="py-20 sm:py-28 bg-[#FFF4E9] relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <Reveal>
              <SectionBadge label="WHY US" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] mb-3">
                Why Choose Us
              </h2>
              <p className="text-base sm:text-lg text-[#1E1E1E]/70">
                More than design. A partner for your growth.
              </p>
            </Reveal>
          </div>

          {/* Grid of 6 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE_US_DATA.map((item, index) => {
              const IconComp = item.icon;
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <div className="card-hover-effect bg-white rounded-[24px] p-7 sm:p-8 h-full shadow-sm flex flex-col justify-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1E1E] tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1E1E1E]/70 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. TESTIMONIALS SECTION (id="testimonials", light-gray background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-20 sm:py-28 bg-[#E5E5E5] relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <Reveal>
              <SectionBadge label="TESTIMONIALS" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] mb-2">
                What Our Clients Say
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#1E1E1E]/70">
                เสียงจากลูกค้าที่เคยร่วมงานกับเรา
              </p>
            </Reveal>
          </div>

          {/* Three cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <Reveal key={t.category} delay={idx * 120} className="h-full">
                <div className="card-hover-effect bg-white rounded-[24px] p-7 sm:p-8 h-full shadow-sm flex flex-col justify-between">
                  <div>
                    {/* Orange Quote Mark Icon */}
                    <div className="w-10 h-10 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center mb-4">
                      <Quote className="w-5 h-5 fill-[#FF6A00]" />
                    </div>

                    <div className="inline-block px-2.5 py-1 rounded-md bg-[#1E1E1E]/5 text-[#1E1E1E] text-[11px] font-bold uppercase tracking-wider mb-4">
                      {t.category}
                    </div>

                    <p className="text-base sm:text-lg text-[#1E1E1E] leading-relaxed font-medium mb-6">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1E1E1E]/8">
                    <p className="font-extrabold text-sm text-[#1E1E1E]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#1E1E1E]/60 font-medium mt-0.5">
                      {t.business}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FAQ SECTION (id="faq", cream background)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-20 sm:py-28 bg-[#FFF4E9] relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Header info & Mascot working */}
            <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
              <Reveal>
                <SectionBadge label="FAQ" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-base text-[#1E1E1E]/70 mb-8">
                  Got another question? Feel free to contact us anytime!
                </p>

                {/* Mascot working image and handwritten note */}
                <div className="relative mt-2 p-6 bg-white/70 backdrop-blur-sm rounded-[24px] border border-[#1E1E1E]/8 shadow-sm w-full max-w-[340px]">
                  <div className="font-handwriting text-2xl text-[#FF6A00] font-bold -rotate-3 mb-2 select-none">
                    Curious Minds, <br /> Brighter Brands ♡
                  </div>
                  <div className="animate-float relative z-10 flex justify-center">
                    <StudioImage
                      src="/public/mascot-working.png"
                      alt="Fox mascot thinking/working"
                      className="w-full max-w-[220px] h-auto object-contain select-none"
                      fallbackLabel="Curious Fox"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right side: 8 Accordion Items */}
            <div className="lg:col-span-7 space-y-4">
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <Reveal key={index} delay={index * 60}>
                    <div
                      className={`rounded-[20px] transition-all duration-200 border ${
                        isOpen
                          ? 'bg-white shadow-sm border-[#FF6A00]/40 ring-1 ring-[#FF6A00]/20'
                          : 'bg-white/80 hover:bg-white border-[#1E1E1E]/8'
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : index)
                        }
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-base sm:text-lg text-[#1E1E1E]">
                          {index + 1}. {faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-[#FF6A00] text-white'
                              : 'bg-[#1E1E1E]/5 text-[#1E1E1E]'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {/* Smooth expanding container */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#1E1E1E]/75 leading-relaxed font-normal border-t border-[#1E1E1E]/5">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. CONTACT / FINAL CTA SECTION (id="contact", charcoal dark)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 sm:py-28 bg-[#1E1E1E] text-[#FFF4E9] relative"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Contact details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] font-bold text-xs tracking-wider uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
                  LET'S WORK TOGETHER
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFF4E9] mb-4 leading-tight">
                  You bring the idea. <br />
                  <span className="text-[#FF6A00]">We make it possible.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#FFF4E9]/75 mb-10 leading-relaxed">
                  Have a project in mind? Fill out the form and let's create
                  something amazing together.
                </p>

                {/* Contact Information List */}
                <div className="space-y-6 mb-10">
                  <a
                    href="mailto:md.foxable@gmail.com"
                    className="flex items-center gap-4 text-sm sm:text-base text-[#FFF4E9]/85 hover:text-[#FF6A00] transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#292929] border border-[#FFF4E9]/10 flex items-center justify-center text-[#FF6A00] group-hover:bg-[#FF6A00] group-hover:text-white group-hover:scale-105 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#FFF4E9]/50 block">Email</span>
                      <span className="font-semibold">md.foxable@gmail.com</span>
                    </div>
                  </a>

                  <a
                    href="https://line.me/ti/p/@md.foxable"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-sm sm:text-base text-[#FFF4E9]/85 hover:text-[#FF6A00] transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#292929] border border-[#FFF4E9]/10 flex items-center justify-center text-[#FF6A00] group-hover:bg-[#FF6A00] group-hover:text-white group-hover:scale-105 transition-all">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#FFF4E9]/50 block">LINE</span>
                      <span className="font-semibold">@md.foxable</span>
                    </div>
                  </a>

                  <a
                    href="https://facebook.com/mdfoxablestudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-sm sm:text-base text-[#FFF4E9]/85 hover:text-[#FF6A00] transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#292929] border border-[#FFF4E9]/10 flex items-center justify-center text-[#FF6A00] group-hover:bg-[#FF6A00] group-hover:text-white group-hover:scale-105 transition-all">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#FFF4E9]/50 block">Facebook</span>
                      <span className="font-semibold">MD FOXABLE STUDIO</span>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/mdfoxable.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-sm sm:text-base text-[#FFF4E9]/85 hover:text-[#FF6A00] transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#292929] border border-[#FFF4E9]/10 flex items-center justify-center text-[#FF6A00] group-hover:bg-[#FF6A00] group-hover:text-white group-hover:scale-105 transition-all">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#FFF4E9]/50 block">Instagram</span>
                      <span className="font-semibold">@mdfoxable.studio</span>
                    </div>
                  </a>

                  <a
                    href="tel:0933541773"
                    className="flex items-center gap-4 text-sm sm:text-base text-[#FFF4E9]/85 hover:text-[#FF6A00] transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#292929] border border-[#FFF4E9]/10 flex items-center justify-center text-[#FF6A00] group-hover:bg-[#FF6A00] group-hover:text-white group-hover:scale-105 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#FFF4E9]/50 block">Phone</span>
                      <span className="font-semibold">093-354-1773</span>
                    </div>
                  </a>
                </div>

                {/* Handwritten accent near form */}
                <div className="font-handwriting text-2xl sm:text-3xl text-[#FF6A00] font-bold rotate-2 select-none">
                  Good Ideas Start Here ✦
                </div>
              </Reveal>
            </div>

            {/* Right Column: Functional Contact Form */}
            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="bg-[#262626] border border-[#FFF4E9]/10 rounded-[28px] p-7 sm:p-10 shadow-2xl relative">
                  {formSubmitted && (
                    <div className="mb-6 p-4 rounded-2xl bg-[#FF6A00]/20 border border-[#FF6A00] text-[#FFF4E9] flex items-center gap-3 animate-in fade-in duration-300">
                      <CheckCircle2 className="w-6 h-6 text-[#FF6A00] shrink-0" />
                      <div>
                        <p className="font-bold text-sm sm:text-base">
                          Thank you! We'll get back to you soon.
                        </p>
                        <p className="text-xs text-[#FFF4E9]/70">
                          Our team will review your project details and reach out within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {formError && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/50 text-[#FFF4E9] flex items-center gap-3 animate-in fade-in duration-300">
                      <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
                      <div>
                        <p className="font-bold text-sm sm:text-base text-red-200">
                          Notice
                        </p>
                        <p className="text-xs text-[#FFF4E9]/85 mt-0.5">
                          {formError}
                        </p>
                      </div>
                    </div>
                  )}

                  <form noValidate onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#FFF4E9]/70 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formState.name}
                          onChange={(e) => {
                            setFormState({ ...formState, name: e.target.value });
                            if (fieldErrors.name) {
                              setFieldErrors((prev) => ({ ...prev, name: undefined }));
                            }
                          }}
                          placeholder="Your name"
                          className={`w-full px-4 py-3.5 rounded-xl bg-[#1E1E1E] border ${
                            fieldErrors.name
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-[#FFF4E9]/15 focus:border-[#FF6A00] focus:ring-[#FF6A00]'
                          } text-[#FFF4E9] placeholder-[#FFF4E9]/30 text-sm focus:outline-none focus:ring-1 transition-colors`}
                        />
                        {fieldErrors.name && (
                          <p className="text-xs text-red-400 mt-1.5 font-medium">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#FFF4E9]/70 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formState.email}
                          onChange={(e) => {
                            setFormState({ ...formState, email: e.target.value });
                            if (fieldErrors.email) {
                              setFieldErrors((prev) => ({ ...prev, email: undefined }));
                            }
                          }}
                          placeholder="your@example.com"
                          className={`w-full px-4 py-3.5 rounded-xl bg-[#1E1E1E] border ${
                            fieldErrors.email
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-[#FFF4E9]/15 focus:border-[#FF6A00] focus:ring-[#FF6A00]'
                          } text-[#FFF4E9] placeholder-[#FFF4E9]/30 text-sm focus:outline-none focus:ring-1 transition-colors`}
                        />
                        {fieldErrors.email && (
                          <p className="text-xs text-red-400 mt-1.5 font-medium">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#FFF4E9]/70 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) => {
                            setFormState({ ...formState, phone: e.target.value });
                            if (fieldErrors.phone) {
                              setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                            }
                          }}
                          placeholder="093-354-1773"
                          className={`w-full px-4 py-3.5 rounded-xl bg-[#1E1E1E] border ${
                            fieldErrors.phone
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-[#FFF4E9]/15 focus:border-[#FF6A00] focus:ring-[#FF6A00]'
                          } text-[#FFF4E9] placeholder-[#FFF4E9]/30 text-sm focus:outline-none focus:ring-1 transition-colors`}
                        />
                        {fieldErrors.phone && (
                          <p className="text-xs text-red-400 mt-1.5 font-medium">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Service Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#FFF4E9]/70 mb-2">
                          Service
                        </label>
                        <select
                          value={formState.service}
                          onChange={(e) =>
                            setFormState({ ...formState, service: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E1E] border border-[#FFF4E9]/15 text-[#FFF4E9] text-sm focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors"
                        >
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Branding">Branding</option>
                          <option value="Web Design">Web Design</option>
                          <option value="Multiple Services">Multiple Services</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget Dropdown */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#FFF4E9]/70 mb-2">
                        Budget
                      </label>
                      <select
                        value={formState.budget}
                        onChange={(e) =>
                          setFormState({ ...formState, budget: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E1E] border border-[#FFF4E9]/15 text-[#FFF4E9] text-sm focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors"
                      >
                        <option value="Under 10,000 THB">Under 10,000 THB</option>
                        <option value="10,000–30,000 THB">10,000–30,000 THB</option>
                        <option value="30,000–100,000 THB">30,000–100,000 THB</option>
                        <option value="Above 100,000 THB">Above 100,000 THB</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#FFF4E9]/70 mb-2">
                        Project Details
                      </label>
                      <textarea
                        rows={4}
                        value={formState.details}
                        onChange={(e) =>
                          setFormState({ ...formState, details: e.target.value })
                        }
                        placeholder="Tell us about your brand, goals, or timeline..."
                        className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E1E] border border-[#FFF4E9]/15 text-[#FFF4E9] placeholder-[#FFF4E9]/30 text-sm focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-hover-effect w-full py-4 rounded-full bg-[#FF6A00] text-white font-extrabold text-sm tracking-wider uppercase shadow-lg hover:bg-[#ff7b1a] flex items-center justify-center gap-2 mt-4 transition-all ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          START A PROJECT <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FOOTER (charcoal background)
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#181818] text-[#FFF4E9] py-14 border-t border-[#FFF4E9]/8">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#FFF4E9]/10">
            {/* Brand details */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#FF6A00] p-1.5 flex items-center justify-center">
                  <StudioImage
                    src="/public/logo.png"
                    alt="MD FOXABLE STUDIO"
                    className="w-full h-full object-contain"
                    fallbackLabel="MD"
                  />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  MD FOXABLE STUDIO
                </span>
              </div>
              <p className="text-xs text-[#FF6A00] font-bold tracking-wider uppercase mb-1">
                Graphic Design · Branding · Web Design
              </p>
              <p className="text-xs text-[#FFF4E9]/60">
                Creative ideas made possible.
              </p>
            </div>

            {/* Menu Links */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-bold tracking-wider uppercase">
              {[
                { label: 'HOME', id: 'home' },
                { label: 'ABOUT', id: 'about' },
                { label: 'SERVICES', id: 'services' },
                { label: 'PORTFOLIO', id: 'portfolio' },
                { label: 'CONTACT', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-[#FF6A00] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/mdfoxablestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#242424] text-[#FFF4E9] flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mdfoxable.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#242424] text-[#FFF4E9] flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://line.me/ti/p/@md.foxable"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#242424] text-[#FFF4E9] flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all"
                aria-label="LINE"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:md.foxable@gmail.com"
                className="w-10 h-10 rounded-full bg-[#242424] text-[#FFF4E9] flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:0933541773"
                className="w-10 h-10 rounded-full bg-[#242424] text-[#FFF4E9] flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom Copyright Line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF4E9]/50">
            <p>© 2026 MD FOXABLE STUDIO. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5 font-medium">
              <span>A Brighter Tomorrow, Together.</span>
              <span>🦊</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
