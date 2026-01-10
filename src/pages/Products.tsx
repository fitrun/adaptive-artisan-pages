import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";
import heroImage from "@/assets/hero-landing.jpg";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

const navLinks = [
  { label: "Продукти", href: "/products" },
  { label: "Для Бізнесу", href: "#" },
  { label: "Магазин", href: "#" },
  { label: "Політика конфіденційності", href: "#" },
];

const menuLinks = [
  { label: "Продукти", href: "/products" },
  { label: "Магазин", href: "#" },
  { label: "Про нас", href: "#" },
  { label: "Для Бізнесу", href: "#" },
  { label: "Блог", href: "#" },
  { label: "Партнерська програма", href: "#" },
  { label: "Кар'єра", href: "#" },
  { label: "Контакти", href: "#" },
];

const footerLinks = [
  { label: "Умови надання послуг", href: "#" },
  { label: "Умови підписки", href: "#" },
  { label: "Політика конфіденційності", href: "#" },
  { label: "Політика відшкодування", href: "#" },
  { label: "e-Privacy Settings", href: "#" },
];

const languages = [
  { code: "EN", label: "English" },
  { code: "UA", label: "Українська" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "ES", label: "Español" },
];

const healthCoachingPrograms = [
  {
    id: 1,
    title: "Wall Pilates",
    subtitle: "Sculpt your body in 28 days",
    image: heroImage,
  },
  {
    id: 2,
    title: "Calisthenics Workout",
    subtitle: "Build muscle using your body weight in 4 weeks",
    image: heroImage,
  },
  {
    id: 3,
    title: "Intermittent Fasting",
    subtitle: "Simplify your daily nutrition schedule",
    image: heroImage,
  },
];

const mentalHealthPrograms = [
  {
    id: 1,
    title: "Deep Sleep",
    subtitle: "Recharge your body and mind",
    image: heroImage,
  },
  {
    id: 2,
    title: "Guided Meditations",
    subtitle: "Find your inner balance",
    image: heroImage,
  },
];

const stats = [
  { value: "20", unit: "million", description: "BetterMe followers on social media" },
  { value: "65", unit: "million", description: "People are working out with Wall Pilates" },
  { value: "1.5", unit: "million", description: "Ratings of BetterMe: Health Coaching" },
  { value: "50+", unit: "", description: "Countries with active users" },
];

const testimonials = [
  {
    id: 1,
    date: "March 27, 2025",
    text: "I enjoyed this workout app it's given me better results in the past week than I have had in years.",
    rating: 5,
  },
  {
    id: 2,
    date: "March 25, 2025",
    text: "I love this app! I'm able to be consistent with my goals and work out. I'm so glad that I tried this app, now my kiddos like to watch and do the exercises!",
    rating: 5,
  },
  {
    id: 3,
    date: "March 25, 2025",
    text: "This app has made me feel very energetic throughout the day since I started doing it. Highly recommended!",
    rating: 5,
  },
];

const worldCards = [
  {
    id: 1,
    tag: "Fitness Essentials",
    title: "BetterMe Store",
    image: heroImage,
  },
  {
    id: 2,
    tag: "Corporate Wellness",
    title: "BetterMe For Business",
    image: heroImage,
  },
  {
    id: 3,
    tag: "Fitness Tracker",
    title: "BetterMe Band",
    image: heroImage,
  },
];

const Products = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 lg:px-12 bg-card transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-foreground">
            BetterMe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.href} 
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Login Button */}
            <Link
              to="/login"
              className="hidden md:flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Увійти
            </Link>

            {/* Language Selector */}
            <div 
              className="relative"
              onMouseEnter={() => setIsLangHovered(true)}
              onMouseLeave={() => setIsLangHovered(false)}
            >
              <button className="flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 py-1">
                {currentLang}
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                isLangHovered 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}>
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-px bg-border mb-3 transition-all duration-300 delay-100 ${
                    isLangHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`} />
                  <div className="flex flex-col items-center gap-2">
                    {languages
                      .filter(lang => lang.code !== currentLang)
                      .map((lang, index) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLang(lang.code)}
                          className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${
                            isLangHovered 
                              ? "opacity-100 translate-y-0" 
                              : "opacity-0 -translate-y-2"
                          }`}
                          style={{ transitionDelay: `${(index + 1) * 75}ms` }}
                        >
                          {lang.code}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition-all duration-200 hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section - Health Coaching */}
      <section className="relative h-screen w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-primary-foreground italic mb-6">
            BetterMe:<br />Health Coaching
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl">
            Effective Workouts. Balanced Meal Plans. Motivating Challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
              Download
            </button>
            <Link 
              to="/products/health-coaching"
              className="rounded-full border border-primary-foreground/50 bg-transparent px-10 py-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Programs - Health Coaching */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-center mb-12 md:mb-16">
            The most popular programs<br />in BetterMe: Health Coaching
          </h2>
          
          <div className="space-y-6">
            {healthCoachingPrograms.map((program, index) => (
              <div
                key={program.id}
                className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                
                <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary-foreground mb-2">
                    {index + 1}. {program.title}:
                  </h3>
                  <p className="text-base md:text-lg text-primary-foreground/80 mb-6">
                    {program.subtitle}
                  </p>
                  <button className="w-fit rounded-full bg-card px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
                    Get started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Hero Section - Mental Health */}
      <AnimatedSection className="relative py-16 md:py-24 px-6 bg-primary" animation="scale">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary-foreground italic mb-6">
                BetterMe:<br />Mental Health
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl">
                Guided Meditations. Breathing Exercises. Sleeping Sounds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
                  Download
                </button>
                <Link 
                  to="/products/mental-health"
                  className="rounded-full border border-primary-foreground/50 bg-transparent px-10 py-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Popular Programs - Mental Health */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-primary" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary-foreground text-center mb-12 md:mb-16">
            The most popular programs<br />in BetterMe: Mental Health
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mentalHealthPrograms.map((program, index) => (
              <div
                key={program.id}
                className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-medium text-primary-foreground mb-2">
                    {index + 1}. {program.title}:
                  </h3>
                  <p className="text-base text-primary-foreground/80 mb-6">
                    {program.subtitle}
                  </p>
                  <button className="w-fit rounded-full bg-card px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary" animation="slide-left">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-12 md:mb-16">
            Join the millions creating<br />happiness with BetterMe
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 md:p-8"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-2">
                  {stat.value} <span className="text-lg md:text-xl font-normal">{stat.unit}</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-center mb-4">
            What our clients say
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-12 md:mb-16">
            <span className="text-sm font-medium text-foreground">Excellent</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-emerald-500 flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">88,669 reviews on</span>
            <span className="text-sm font-medium text-foreground">★ Trustpilot</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-secondary rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-emerald-500 flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                </div>
                <p className="text-foreground">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Meet the BetterMe World */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="slide-right">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground text-center mb-12 md:mb-16">
            Meet the BetterMe World
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {worldCards.map((card) => (
              <div
                key={card.id}
                className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                  <span className="w-fit px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {card.tag}
                  </span>
                  
                  <div className="mt-auto">
                    <h3 className="text-xl md:text-2xl font-medium text-primary-foreground mb-4">
                      {card.title}
                    </h3>
                    <button className="rounded-full bg-card px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Social & Copyright */}
            <div className="lg:col-span-1">
              <div className="flex gap-3 mb-6">
                {["instagram", "tiktok", "facebook", "twitter", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-foreground mb-2">© 2026. BetterMe.</p>
              <p className="text-xs text-muted-foreground">
                Our website services, content and products are for informational purposes only. 
                BetterMe does not provide medical advice, diagnosis, or treatment
              </p>
            </div>
            
            {/* Links */}
            <div>
              <nav className="space-y-3">
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Products</a>
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">For Business</a>
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Affiliate Program</a>
              </nav>
            </div>
            
            <div>
              <nav className="space-y-3">
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">About Us</a>
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Careers</a>
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Blog</a>
              </nav>
            </div>
            
            <div>
              <nav className="space-y-3">
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Contacts</a>
                <a href="#" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Brand Assets</a>
              </nav>
            </div>
          </div>
          
          {/* Bottom Links */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="text-sm font-medium text-foreground">Need Help?</a>
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          {/* Desktop/Tablet: Split Layout */}
          <div className="hidden md:flex h-full">
            <div 
              className="w-1/2 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${heroImage})`,
                filter: "blur(2px) brightness(0.9)"
              }}
            />
            
            <div className="w-1/2 bg-card flex flex-col">
              <div className="flex items-center justify-end gap-4 px-8 py-6">
                <span className="text-sm text-muted-foreground">Потрібна допомога?</span>
                <Link
                  to="/login"
                  className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                >
                  Увійти
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
                <nav className="space-y-4">
                  {menuLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block text-2xl lg:text-3xl font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="px-8 py-8">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {footerLinks.slice(0, 4).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    e-Privacy Settings
                  </a>
                  
                  {/* Language Selector - Desktop Menu */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsMenuLangHovered(true)}
                    onMouseLeave={() => setIsMenuLangHovered(false)}
                  >
                    <button className="flex items-center justify-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200 px-2 py-1">
                      {currentLang}
                    </button>
                    
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-2 transition-all duration-300 ${
                      isMenuLangHovered 
                        ? "opacity-100 translate-y-0 pointer-events-auto" 
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center gap-2 mb-3">
                          {languages
                            .filter(lang => lang.code !== currentLang)
                            .map((lang, index) => (
                              <button
                                key={lang.code}
                                onClick={() => setCurrentLang(lang.code)}
                                className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${
                                  isMenuLangHovered 
                                    ? "opacity-100 translate-y-0" 
                                    : "opacity-0 translate-y-2"
                                }`}
                                style={{ transitionDelay: `${(languages.length - 2 - index) * 50}ms` }}
                              >
                                {lang.code}
                              </button>
                            ))}
                        </div>
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
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-sm text-muted-foreground">Потрібна допомога?</span>
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                >
                  Увійти
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-all duration-200 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6">
              <nav className="space-y-3">
                {menuLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-6 py-8">
              <div className="space-y-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
