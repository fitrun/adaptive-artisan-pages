import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import heroImage from "@/assets/hero-landing.jpg";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLanguage, SUPPORTED_LANGUAGES, Language } from "@/hooks/use-language";
import { PlaceholderLink } from "@/components/PlaceholderLink";

const navLinks = [
  { label: "Продукти", href: "/products" },
  { label: "Магазин", href: "#" },
  { label: "Політика конфіденційності", href: "#" },
];

const menuLinks = [
  { label: "Продукти", href: "/products" },
  { label: "Магазин", href: "#" },
  // { label: "Про нас", href: "#" },
  { label: "Блог", href: "/blog" },
  // { label: "Партнерська програма", href: "#" },
  // { label: "Кар'єра", href: "#" },
  { label: "Контакти", href: "#" },
];

const footerLinks = [
  { label: "Умови надання послуг", href: "#" },
  { label: "Умови підписки", href: "#" },
  { label: "Політика конфіденційності", href: "#" },
  // { label: "Політика відшкодування", href: "#" },
  { label: "e-Privacy Settings", href: "#" },
];

const slides = [
  {
    id: 1,
    title: "Ранкова зарядка: енергія на весь день",
    image: heroImage,
  },
  {
    id: 2,
    title: "Програма пілатесу біля стіни: низькоінтенсивні тренування для початківців",
    image: heroImage,
  },
  {
    id: 3,
    title: "Йога для початківців: базові вправи",
    image: heroImage,
  },
  {
    id: 4,
    title: "Медитація: знайди свій спокій",
    image: heroImage,
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

const languageLabels: Record<Language, string> = {
  en: "EN",
  ua: "UA",
  de: "DE",
  fr: "FR",
  es: "ES",
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const { lang, setLang } = useLanguage();

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeSlide) return;
    setIsTransitioning(true);
    setActiveSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, activeSlide]);

  const nextSlide = useCallback(() => {
    const next = (activeSlide + 1) % slides.length;
    goToSlide(next);
  }, [activeSlide, goToSlide]);

  // Auto-play effect
  useEffect(() => {
    if (isMenuOpen) return; // Pause when menu is open
    
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide, isMenuOpen]);

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden">
      {/* Background Images with Transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
            index === activeSlide ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-6 md:px-10 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <LocalizedLink to="" className="flex items-center">
            <img
              src="/fitrun_logo.png"
              alt="FitRun"
              className="h-8 md:h-10 w-auto"
            />
          </LocalizedLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <PlaceholderLink key={link.label} className="nav-link">
                {link.label}
              </PlaceholderLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Login Button - Desktop/Tablet */}
            <LocalizedLink
              to="login"
              className="hidden md:flex items-center justify-center rounded-full border border-primary-foreground/30 bg-transparent px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
            >
              Увійти
            </LocalizedLink>

            {/* Language Selector */}
            <div 
              className="relative"
              onMouseEnter={() => setIsLangHovered(true)}
              onMouseLeave={() => setIsLangHovered(false)}
            >
              <button className="flex items-center justify-center text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200 px-2 py-1">
                {languageLabels[lang]}
              </button>
              
              {/* Dropdown */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                isLangHovered 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}>
                <div className="flex flex-col items-center">
                  {/* Divider line */}
                  <div className={`w-5 h-px bg-primary-foreground/40 mb-3 transition-all duration-300 delay-100 ${
                    isLangHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`} />
                  
                  {/* Other languages */}
                  <div className="flex flex-col items-center gap-2">
                    {SUPPORTED_LANGUAGES
                      .filter(l => l !== lang)
                      .map((l, index) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={`text-sm font-medium text-primary-foreground/50 hover:text-primary-foreground transition-all duration-300 ${
                            isLangHovered 
                              ? "opacity-100 translate-y-0" 
                              : "opacity-0 -translate-y-2"
                          }`}
                          style={{ transitionDelay: `${(index + 1) * 75}ms` }}
                        >
                          {languageLabels[l]}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/30 bg-transparent text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10 lg:p-12">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Pagination Dots - Mobile (centered above content) */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? "bg-primary-foreground scale-110"
                    : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="lg:flex lg:items-end lg:justify-between">
          {/* Text Content */}
          <div className="max-w-2xl">
            <h1 
              key={activeSlide}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-primary-foreground leading-tight mb-6 lg:mb-8 animate-fade-in"
            >
              {slides[activeSlide].title}
            </h1>

            {/* CTA Button */}
            <button className="rounded-full bg-card px-8 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
              Завантажити
            </button>
          </div>

          {/* Desktop Pagination */}
          <div className="hidden lg:flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`pagination-dot transition-all duration-300 ${
                  index === activeSlide
                    ? "pagination-dot-active scale-110"
                    : "pagination-dot-inactive hover:scale-105"
                }`}
                aria-label={`Slide ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          {/* Desktop/Tablet: Split Layout */}
          <div className="hidden md:flex h-full">
            {/* Left Side - Blurred Image */}
            <div 
              className="w-1/2 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${heroImage})`,
                filter: "blur(2px) brightness(0.9)"
              }}
            />
            
            {/* Right Side - Menu */}
            <div className="w-1/2 bg-card flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-end gap-4 px-8 py-6">
                <span className="text-sm text-muted-foreground">Потрібна допомога?</span>
                <LocalizedLink
                  to="login"
                  className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                >
                  Увійти
                </LocalizedLink>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
                <nav className="space-y-4">
                  {menuLinks.map((link, index) => (
                    <LocalizedLink
                      key={link.label}
                      to={link.href}
                      className="block text-2xl lg:text-3xl font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.label}
                    </LocalizedLink>
                  ))}
                </nav>
              </div>

              {/* Footer Links */}
              <div className="px-8 py-8">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {footerLinks.slice(0, 2).map((link) => (
                    <PlaceholderLink
                      key={link.label}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </PlaceholderLink>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                  {footerLinks.slice(2, 4).map((link) => (
                    <PlaceholderLink
                      key={link.label}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </PlaceholderLink>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <PlaceholderLink className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    e-Privacy Settings
                  </PlaceholderLink>
                  
                  {/* Language Selector - Desktop Menu */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsMenuLangHovered(true)}
                    onMouseLeave={() => setIsMenuLangHovered(false)}
                  >
              <button className="flex items-center justify-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200 px-2 py-1">
                    {languageLabels[lang]}
                  </button>
                  
                  {/* Dropdown - expands upward */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-2 transition-all duration-300 ${
                      isMenuLangHovered 
                        ? "opacity-100 translate-y-0 pointer-events-auto" 
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}>
                      <div className="flex flex-col items-center">
                        {/* Other languages */}
                        <div className="flex flex-col items-center gap-2 mb-3">
                          {SUPPORTED_LANGUAGES
                            .filter(l => l !== lang)
                            .map((l, index) => (
                              <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${
                                  isMenuLangHovered 
                                    ? "opacity-100 translate-y-0" 
                                    : "opacity-0 translate-y-2"
                                }`}
                                style={{ transitionDelay: `${(SUPPORTED_LANGUAGES.length - 2 - index) * 50}ms` }}
                              >
                                {languageLabels[l]}
                              </button>
                            ))}
                        </div>
                        
                        {/* Divider line */}
                        <div className={`w-5 h-px bg-border transition-all duration-300 delay-100 ${
                          isMenuLangHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Full Screen Menu */}
          <div className="md:hidden h-full bg-card flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-sm text-muted-foreground">Потрібна допомога?</span>
              <div className="flex items-center gap-3">
                <LocalizedLink
                  to="login"
                  className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                >
                  Увійти
                </LocalizedLink>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-6">
              <nav className="space-y-3">
                {menuLinks.map((link) => (
                  <LocalizedLink
                    key={link.label}
                    to={link.href}
                    className="block text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </LocalizedLink>
                ))}
              </nav>
            </div>

            {/* Footer Links */}
            <div className="px-6 py-8">
              <div className="space-y-2">
                {footerLinks.map((link) => (
                  <PlaceholderLink
                    key={link.label}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </PlaceholderLink>
                ))}
              </div>
              {/* Language Selector - Mobile Menu */}
              <div className="flex justify-end mt-4">
                <div 
                  className="relative"
                  onMouseEnter={() => setIsMenuLangHovered(true)}
                  onMouseLeave={() => setIsMenuLangHovered(false)}
                >
                  <button className="flex items-center justify-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200 px-2 py-1">
                    {languageLabels[lang]}
                  </button>
                  
                  {/* Dropdown - expands upward */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-2 transition-all duration-300 ${
                    isMenuLangHovered 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                    <div className="flex flex-col items-center">
                      {/* Other languages */}
                      <div className="flex flex-col items-center gap-2 mb-3">
                        {SUPPORTED_LANGUAGES
                          .filter(l => l !== lang)
                          .map((l, index) => (
                            <button
                              key={l}
                              onClick={() => setLang(l)}
                              className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${
                                isMenuLangHovered 
                                  ? "opacity-100 translate-y-0" 
                                  : "opacity-0 translate-y-2"
                              }`}
                              style={{ transitionDelay: `${(SUPPORTED_LANGUAGES.length - 2 - index) * 50}ms` }}
                            >
                              {languageLabels[l]}
                            </button>
                          ))}
                      </div>
                      
                      {/* Divider line */}
                      <div className={`w-5 h-px bg-border transition-all duration-300 delay-100 ${
                        isMenuLangHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
