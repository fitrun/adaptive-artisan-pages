import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Check, Moon, Sun, Cloud, Heart } from "lucide-react";
import heroImage from "@/assets/hero-landing.jpg";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLanguage, SUPPORTED_LANGUAGES, Language } from "@/hooks/use-language";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "For Business", href: "#" },
  { label: "Store", href: "#" },
  { label: "Privacy policy", href: "#" },
];

const menuLinks = [
  { label: "Products", href: "/products" },
  { label: "Store", href: "#" },
  { label: "About Us", href: "#" },
  { label: "For Business", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Affiliate Program", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contacts", href: "#" },
];

const footerLinks = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Editorial Process and Standards", href: "#" },
  { label: "Master Service Agreement", href: "#" },
  { label: "e-Privacy Settings", href: "#" },
];

const languageLabels: Record<Language, string> = {
  en: "EN",
  ua: "UA",
  de: "DE",
  fr: "FR",
  es: "ES",
};

const appFeatures = [
  "Guided meditations for all levels",
  "Sleep sounds and stories",
  "Breathing exercises",
  "Daily affirmations",
  "Mood tracking",
  "Personalized wellness plans",
];

const programs = [
  {
    id: 1,
    title: "Deep Sleep",
    description: "Fall asleep faster with calming sounds and guided sleep meditations designed to quiet your mind.",
    icon: Moon,
  },
  {
    id: 2,
    title: "Stress Relief",
    description: "Release tension and find calm with breathing exercises and relaxation techniques.",
    icon: Cloud,
  },
  {
    id: 3,
    title: "Daily Meditation",
    description: "Start each day with intention through guided meditations tailored to your goals.",
    icon: Sun,
  },
  {
    id: 4,
    title: "Self-Love Journey",
    description: "Build confidence and self-compassion with affirmations and mindfulness practices.",
    icon: Heart,
  },
];

const stats = [
  { value: "4.8", unit: "stars", description: "in App Store" },
  { value: "2", unit: "million", description: "Active users" },
  { value: "500+", unit: "", description: "Guided meditations" },
];

const testimonials = [
  {
    id: 1,
    text: "This app has completely transformed my sleep. I used to lie awake for hours, but now I fall asleep within minutes. The sleep stories are magical!",
    author: "Sarah M.",
    date: "Dec 15, 2024",
    isImage: false,
  },
  {
    id: 2,
    text: "The meditation sessions are perfect for my busy schedule. Even 5 minutes makes a difference in my stress levels.",
    author: "James K.",
    date: "Jan 02, 2025",
    isImage: false,
  },
  {
    id: 3,
    text: "I've tried many meditation apps, but BetterMe Mental Health truly understands what I need. The personalized recommendations are spot on!",
    author: "Emily R.",
    date: "Dec 28, 2024",
    isImage: false,
  },
  {
    id: 4,
    text: "My anxiety has decreased significantly since I started using this app daily. Highly recommend for anyone struggling with stress.",
    author: "Michael T.",
    date: "Jan 05, 2025",
    isImage: false,
  },
];

const featuredIn = [
  {
    name: "Psychology Today",
    quote: "A comprehensive approach to mental wellness",
  },
  {
    name: "Mindful Magazine",
    quote: "The perfect companion for your meditation journey",
  },
  {
    name: "Wellness Weekly",
    quote: "Accessible mental health support at your fingertips",
  },
];

const MentalHealth = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 lg:px-12 bg-card transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <LocalizedLink to="" className="text-xl md:text-2xl font-bold text-foreground">
            BetterMe
          </LocalizedLink>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <LocalizedLink 
                key={link.label} 
                to={link.href.startsWith("/") ? link.href.slice(1) : link.href} 
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                {link.label}
              </LocalizedLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LocalizedLink
              to="login"
              className="hidden md:flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Log in
            </LocalizedLink>

            <div 
              className="relative"
              onMouseEnter={() => setIsLangHovered(true)}
              onMouseLeave={() => setIsLangHovered(false)}
            >
              <button className="flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 py-1">
                {languageLabels[lang]}
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
                    {SUPPORTED_LANGUAGES
                      .filter(l => l !== lang)
                      .map((l, index) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${
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

      {/* Hero Section */}
      <section className="relative h-screen w-full bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="mb-8">
            <Moon className="w-16 h-16 text-primary-foreground/80 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-4">
            Find Your Inner Peace
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl">
            Discover BetterMe: Mental Health — Your personal guide to meditation, better sleep, and emotional wellness
          </p>
          <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
            Download
          </button>
        </div>
      </section>

      {/* Programs Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="fade-up">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Programs designed for<br />your mental wellness
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16">
            Whether you're looking to improve sleep, reduce stress, or build mindfulness habits, we have a program for you.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div key={program.id} className="bg-secondary rounded-3xl p-8 text-left hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <program.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground text-sm">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* App Features Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-primary" animation="slide-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-8">
              Everything you need<br />in one app
            </h2>
            <ul className="space-y-4">
              {appFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-primary-foreground text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-10 rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
              Start Free Trial
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-64 h-[500px] rounded-3xl bg-card/20 overflow-hidden shadow-2xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Sleep Section */}
      <section className="relative py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Moon className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Sleep better tonight
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Our sleep sounds, bedtime stories, and guided sleep meditations help you drift off to dreamland faster and wake up feeling refreshed.
          </p>
          <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
            Explore Sleep Programs
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2">
                  {stat.value}
                  {stat.unit && <span className="text-2xl md:text-3xl font-normal ml-2">{stat.unit}</span>}
                </div>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16">
            Real stories from<br />real people
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-secondary rounded-3xl p-6 md:p-8">
                <p className="text-foreground mb-6">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{testimonial.author}</span>
                  <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured In Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-muted" animation="slide-left">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12">
            Featured In
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredIn.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-xl font-bold text-foreground mb-3">{item.name}</p>
                <p className="text-muted-foreground italic">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-primary" animation="scale">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Start your wellness<br />journey today
          </h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join millions of people who have transformed their mental health with BetterMe. Your path to inner peace starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
              Download for iOS
            </button>
            <button className="rounded-full border border-primary-foreground/50 bg-transparent px-10 py-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10">
              Download for Android
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Disclaimer */}
      <div className="py-8 px-6 bg-background border-t border-border">
        <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto">
          DISCLAIMER: BetterMe: Mental Health is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xl font-bold text-foreground">
                BetterMe
              </Link>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 BetterMe. All Rights Reserved.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6">
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
      </footer>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-card" />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-12">
            <Link to="/" className="text-xl md:text-2xl font-bold text-foreground" onClick={() => setIsMenuOpen(false)}>
              BetterMe
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition-all duration-200 hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row px-6 md:px-10 lg:px-12 py-8 overflow-auto">
            <div className="flex-1 flex flex-col justify-center">
              <nav className="space-y-4 md:space-y-6">
                {menuLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl md:text-4xl lg:text-5xl font-medium text-foreground hover:text-muted-foreground transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-8 lg:mt-0 lg:ml-16 flex flex-col justify-center">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted w-fit mb-6"
              >
                Log in
              </Link>
              
              <div 
                className="relative inline-block"
                onMouseEnter={() => setIsMenuLangHovered(true)}
                onMouseLeave={() => setIsMenuLangHovered(false)}
              >
                <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {languages.find(l => l.code === currentLang)?.label}
                </button>
                
                <div className={`absolute bottom-full left-0 pb-2 transition-all duration-300 ${
                  isMenuLangHovered 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}>
                  <div className="flex flex-col gap-2 bg-card rounded-lg p-2 shadow-lg border border-border">
                    {languages
                      .filter(lang => lang.code !== currentLang)
                      .map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setCurrentLang(lang.code)}
                          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left px-3 py-1.5 rounded hover:bg-muted"
                        >
                          {lang.label}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
