import { useState, useEffect, useRef } from 'react';
import { Menu, X, Plus, Play, Mic, MessageSquare, Image as ImageIcon, FileText, Activity } from 'lucide-react';

// --- Custom SVGs ---
const Logo = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 5L35 20L20 35L5 20L20 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 20L20 12L28 20L20 28L12 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const BrandSpringfield = () => (
  <svg height="24" viewBox="0 0 120 30" fill="none" className="text-gray-500">
    <path d="M10 20C10 20 15 10 20 10C25 10 30 20 30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="35" y="22" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Springfield</text>
  </svg>
);

const BrandOrbitc = () => (
  <svg height="24" viewBox="0 0 100 30" fill="none" className="text-gray-500">
    <circle cx="15" cy="15" r="8" stroke="currentColor" strokeWidth="2"/>
    <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="2"/>
    <text x="30" y="22" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Orbitc</text>
  </svg>
);

const BrandCloud = () => (
  <svg height="24" viewBox="0 0 90 30" fill="none" className="text-gray-500">
    <path d="M25 18C27.7614 18 30 15.7614 30 13C30 10.2386 27.7614 8 25 8C24.4751 8 23.9692 8.0809 23.4984 8.22944C22.6953 5.81156 20.4496 4 17.75 4C14.0221 4 11 7.02208 11 10.75C11 10.9995 11.0135 11.2458 11.0396 11.4883C8.75053 11.8385 7 13.8055 7 16.1667C7 18.8364 9.16362 21 11.8333 21L25 21V18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <text x="35" y="22" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Cloud</text>
  </svg>
);

const BrandAmster = () => (
  <svg height="24" viewBox="0 0 100 30" fill="none" className="text-gray-500">
    <path d="M10 25L20 5L30 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 17H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="35" y="22" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Amster</text>
  </svg>
);

const BrandNexus = () => (
  <svg height="24" viewBox="0 0 100 30" fill="none" className="text-gray-500">
    <path d="M10 5L30 25M30 5L10 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="35" y="22" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Nexus</text>
  </svg>
);

const FadeInUp = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const currentRef = domRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Added a small timeout for staggered delays if needed
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px' }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const FaqItem = ({ question, answer, isOpen, onClick, isLast }) => {
  return (
    <div className={`${!isLast ? 'border-b border-white/10' : ''}`}>
      <button
        onClick={onClick}
        className="w-full py-6 px-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-base text-white font-medium group-hover:text-gray-300 transition-colors">
          {question}
        </span>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45 text-white' : 'text-gray-400'}`}>
          <Plus size={20} />
        </div>
      </button>
      <div 
        className="accordion-content"
        style={{ 
          display: 'grid', 
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 300ms ease-in-out'
        }}
      >
        <div className="overflow-hidden">
          <p className="text-gray-400 text-sm pb-6 px-6 m-0 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white/20">
      {/* Global Styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: #000;
        }
        
        /* Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 z-50">
            <Logo className="w-8 h-8 text-white" />
            <span className="text-xl font-bold tracking-tight">Plety</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button className="bg-[#1F1F22] hover:bg-[#2A2A2D] text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/5 transition-all shadow-sm">
              Get started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 origin-top overflow-hidden ${
            mobileMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0 py-0 border-transparent'
          }`}
        >
          <div className="flex flex-col px-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-gray-300 hover:text-white py-2"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-white text-black text-sm font-medium px-5 py-3 rounded-full mt-2 w-full">
              Get started
            </button>
          </div>
        </div>
      </header>

      {}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 relative z-0 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-90"
        >
          <source src="https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black -z-10"></div>

        <FadeInUp className="flex flex-col items-center w-full px-6">
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-sm shadow-xl flex items-center gap-2">
            <span>✨</span> Announcing API 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-center leading-tight">
            The intelligence layer <br className="hidden md:block" />
            for clear <span className="font-serif italic font-normal text-white/90">decisions.</span>
          </h1>
          
          <p className="text-[16px] text-gray-400 max-w-2xl text-center mb-10 leading-relaxed">
            Our platform integrates seamlessly into your stack to deliver real-time understanding, not just predictions.
          </p>
          
          <div className="flex flex-row gap-4 items-center justify-center w-full">
            <button className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-6 py-3 rounded-full transition-colors">
              Get started
            </button>
            <button className="bg-[#1F1F22] hover:bg-[#2A2A2D] text-white border border-white/5 text-sm font-medium px-6 py-3 rounded-full transition-colors">
              Learn more
            </button>
          </div>

          {/* Marquee Section */}
          <div className="w-full mt-24 max-w-7xl">
            <p className="text-sm text-gray-500 font-medium mb-8 text-center uppercase tracking-widest">
              Trusted by industry leaders
            </p>
            <div className="mask-edges overflow-hidden w-full relative">
              <div className="flex w-max animate-marquee items-center">
                {/* 
                  Create a duplicated set of logos to ensure a seamless infinite loop.
                  We render the block twice to cover the 0% to -50% translation.
                */}
                {[1, 2].map((set) => (
                  <div key={set} className="flex items-center">
                    {[
                      <BrandSpringfield key="1" />,
                      <BrandOrbitc key="2" />,
                      <BrandCloud key="3" />,
                      <BrandAmster key="4" />,
                      <BrandNexus key="5" />
                    ].map((Logo, idx) => (
                      <div key={`${set}-${idx}`} className="flex-shrink-0 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                        {Logo}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <FadeInUp>
            <div className="mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-yellow-400 mb-6 backdrop-blur-sm">
                <span>✨</span> AI chat
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight leading-tight">
                Where speed meets <br /> intelligent conversation.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                A conversational AI assistant that understands your questions, provides intelligent answers, and helps you get things done fast from casual chats to complex tasks.
              </p>
              <button className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-6 py-3 rounded-full transition-colors flex items-center gap-2">
                Get started
              </button>
            </div>
          </FadeInUp>

          {/* Mockup */}
          <FadeInUp delay={200}>
            <div className="rounded-3xl overflow-hidden p-6 md:p-8 border border-white/10 relative shadow-2xl bg-[#0A0A0A] aspect-square md:aspect-auto md:min-h-[500px] flex flex-col justify-end">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Floating UI Element */}
              <div className="relative z-10 w-full max-w-sm mx-auto mb-4">
                <div className="bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                      <ImageIcon size={14} /> Create image
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                      <FileText size={14} /> Summarize
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-black/50 border border-white/5 rounded-xl px-4 py-3">
                    <MessageSquare size={18} className="text-gray-500" />
                    <span className="text-gray-400 text-sm flex-1">Ask anything...</span>
                    <button className="text-white hover:text-gray-300 bg-white/10 p-1.5 rounded-md transition-colors">
                      <Mic size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

        </div>
      </section>

      {}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Mockup (Left on Desktop) */}
          <FadeInUp className="order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="rounded-3xl overflow-hidden p-6 md:p-8 border border-white/10 relative shadow-2xl bg-[#0A0A0A] aspect-square md:aspect-auto md:min-h-[500px] flex flex-col items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://cdn.sceneai.art/Hero%20Section%20Video/736fd4a0-70ac-4f44-9633-55769ead6aca.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Floating UI Element */}
              <div className="relative z-10 w-full max-w-sm mx-auto">
                <div className="bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <button className="bg-white text-black p-2 rounded-full pl-2.5">
                        <Play size={16} className="fill-current" />
                      </button>
                      <span className="text-sm font-medium text-white">11:06 AM – Chris</span>
                    </div>
                    <Activity size={20} className="text-gray-500" />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="h-3 bg-white/10 rounded-full w-full"></div>
                    <div className="h-3 bg-white/10 rounded-full w-5/6"></div>
                    <div className="h-3 bg-white/10 rounded-full w-4/6"></div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-green-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> Transcribing...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Text Content (Right on Desktop) */}
          <FadeInUp delay={200} className="order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-green-400 mb-6 backdrop-blur-sm">
                <span>✨</span> AI transcription
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight leading-tight">
                Turn speech into text <br /> with speed and precision.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                Automatically convert speech into accurate, editable text in real time. Perfect for meetings, interviews, voice notes, and more, powered by advanced speech recognition technology.
              </p>
              <button className="bg-[#1F1F22] hover:bg-[#2A2A2D] border border-white/5 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors flex items-center gap-2">
                Get started
              </button>
            </div>
          </FadeInUp>

        </div>
      </section>

      {}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-center tracking-tight">
              We've got answers
            </h2>
          </FadeInUp>

          <FadeInUp delay={200}>
            <div className="border border-white/10 rounded-xl bg-transparent">
              {[
                {
                  q: "Is my data safe and secure?",
                  a: "Yes, security is our top priority. We use enterprise-grade encryption for data in transit and at rest. We never train our baseline models on your private data without explicit consent."
                },
                {
                  q: "Can I integrate Plety with my existing tools?",
                  a: "Absolutely. Our platform is built API-first, meaning it seamlessly integrates with standard workflows, databases, and third-party tools you already use every day."
                },
                {
                  q: "What kind of support do you offer?",
                  a: "We offer 24/7 dedicated email support for all users, and priority Slack channel access for Enterprise customers to ensure you are never stuck."
                },
                {
                  q: "How accurate is the AI transcription?",
                  a: "Our transcription models achieve industry-leading accuracy rates, even with accents, background noise, or complex domain-specific terminology."
                },
                {
                  q: "Do you offer custom pricing for large volumes?",
                  a: "Yes, we provide tailored enterprise plans with volume discounts, dedicated infrastructure, and custom SLA agreements. Contact our sales team to learn more."
                }
              ].map((faq, index, array) => (
                <FaqItem
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                  isLast={index === array.length - 1}
                />
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {}
      <footer id="contact" className="relative z-0 pt-32 pb-10 px-6 border-t border-white/5 overflow-hidden">
        {/* Background Video (Re-used from Hero) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40"
        >
          <source src="https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4" type="video/mp4" />
        </video>
        {/* Strong Overlay for Footer Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black -z-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top CTA */}
          <FadeInUp className="flex flex-col items-center justify-center text-center mb-32">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
              Ready to automate <span className="font-serif italic font-normal text-white/90">everything?</span>
            </h2>
            <div className="flex flex-row gap-4">
              <button className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-8 py-3.5 rounded-full transition-colors shadow-lg">
                Get started
              </button>
              <button className="bg-[#1F1F22]/80 hover:bg-[#2A2A2D] text-white border border-white/10 backdrop-blur-md text-sm font-medium px-8 py-3.5 rounded-full transition-colors">
                Learn more
              </button>
            </div>
          </FadeInUp>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
            
            {/* Col 1: Brand */}
            <div className="flex flex-col items-start">
              <a href="#" className="flex items-center gap-2 mb-4">
                <Logo className="w-6 h-6 text-white" />
                <span className="text-xl font-bold tracking-tight">Plety</span>
              </a>
              <p className="text-sm text-gray-400 max-w-xs">
                Speed, scale, and smarts — deployed.
              </p>
            </div>

            {/* Col 2: Product */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-medium mb-2">Product</h4>
              {['About', 'Pricing', 'Changelog', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>

            {/* Col 3: Legal */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-medium mb-2">Legal</h4>
              {['Terms of service', 'Privacy policy', '404'].map(link => (
                <a key={link} href="#" className="text-sm text-gray-400 hover:text-white transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>

            {/* Col 4: Connect */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-medium mb-2">Connect</h4>
              {['Instagram', 'YouTube', 'LinkedIn', 'Twitter / X'].map(link => (
                <a key={link} href="#" className="text-sm text-gray-400 hover:text-white transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-8 pb-4">
            <p>
              © 2026 Plety. All rights reserved &bull; by <span className="text-gray-300">Re-text</span> &bull; Made in <span className="text-gray-300">Gemini</span>
            </p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}