import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Check } from "lucide-react";
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
  "4000+ diverse home workouts",
  "Over 20 meal plans with hundreds of recipes",
  "Water and calorie trackers",
  "Intermittent fasting plans",
  "Self-care challenges",
  "And so much more!",
];

const coaches = [
  {
    id: 1,
    name: "Stefan",
    title: "ISSA Master Trainer",
    quote: "I'll be here to support, motivate, and guide you with patience, while helping you unlock your full potential. Together, we'll build a strong partnership on your journey.",
  },
  {
    id: 2,
    name: "Maria",
    title: "Certified Nutrition Coach",
    quote: "Your health journey is unique, and I'm here to create a personalized plan that fits your lifestyle and goals. Let's make sustainable changes together.",
  },
];

const stats = [
  { value: "4.7", unit: "stars", description: "in App Store" },
  { value: "1.5", unit: "million", description: "App ratings" },
  { value: "In top", unit: "10", description: "Weight loss apps according to Forbes" },
];

const testimonials = [
  {
    id: 1,
    text: "I have completed day 15! I have more energy and increased endurance on each training. I have not lost any weight, but rather centimeters and recommend this app to young and old! 50 never felt this good!",
    author: "E.",
    date: "Jan 09, 2024",
    isImage: false,
  },
  {
    id: 2,
    text: "",
    author: "@yavuz.ozan",
    subtitle: "BetterMe Ambassador",
    isImage: true,
  },
  {
    id: 3,
    text: "Love the BetterMe! I absolutely love the BetterMe app, the exercises for seniors are perfect and I look forward to it every day ❤️",
    author: "C.",
    date: "May 05, 2024",
    isImage: false,
  },
  {
    id: 4,
    text: "I'm 58 and I'm very happy that I discovered you! Believe my life is much nicer with this App. I recommend BetterMe everyday.",
    author: "T.",
    date: "June 25, 2024",
    isImage: false,
  },
  {
    id: 5,
    text: "",
    author: "@nazashevchuk",
    subtitle: "BetterMe Ambassador",
    isImage: true,
  },
  {
    id: 6,
    text: "BetterMe has made a huge difference in my life. it was very encouraging and extremely helpful. I am a very committed fan and love the coaches whose help was so valuable. Thank you!",
    author: "M.",
    date: "June 27, 2024",
    isImage: false,
  },
];

const featuredIn = [
  {
    name: "Forbes",
    quote: "Easy-to-follow exercises you can do anywhere",
  },
  {
    name: "COSMOPOLITAN",
    quote: "The BetterMe Health Coaching app is a companion for implementing a healthier lifestyle.",
  },
  {
    name: "Healthnews",
    quote: "Navigating the app is easy, and the overall push from the app is gentle and firm at the same time.",
  },
];

const HealthCoaching = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentCoach, setCurrentCoach] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
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

  const nextCoach = () => setCurrentCoach((prev) => (prev + 1) % coaches.length);
  const prevCoach = () => setCurrentCoach((prev) => (prev - 1 + coaches.length) % coaches.length);
  const nextFeature = () => setCurrentFeature((prev) => (prev + 1) % 3);
  const prevFeature = () => setCurrentFeature((prev) => (prev - 1 + 3) % 3);

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
      <section className="relative h-screen w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-4">
            Body & Mind Wellness<br />Plans for Real Change
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10">
            Discover BetterMe: Health Coaching App
          </p>
          <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
            Download
          </button>
        </div>
      </section>

      {/* All-in-one App Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="fade-up">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 md:mb-16">
            All-in-one app for<br />a healthy lifestyle
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hidden md:block w-48 h-[400px] rounded-3xl bg-muted overflow-hidden opacity-50 transform -rotate-6">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
            </div>
            <div className="w-64 h-[500px] rounded-3xl bg-muted overflow-hidden shadow-2xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
            </div>
            <div className="hidden md:block w-48 h-[400px] rounded-3xl bg-muted overflow-hidden opacity-50 transform rotate-6">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay hydrated and track your steps with ease. Leave the math to BetterMe and focus on your health & body goals
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={prevFeature}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextFeature}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Fitness Tracker Section */}
      <section className="relative py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Go further with<br />BetterMe Fitness Tracker
          </h2>
        </div>
      </section>

      {/* Tracker Details Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="slide-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-secondary rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-6">
              <div className="w-64 h-[450px] rounded-3xl bg-muted overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroImage})` }}
                />
              </div>
              <div className="w-32 h-64 rounded-2xl bg-foreground" />
            </div>
          </div>
          
          <div>
            <p className="text-primary font-medium mb-4">BetterMe Fitness Tracker</p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Track & Transform<br />your body
            </h3>
            <p className="text-muted-foreground mb-8">
              <span className="font-semibold text-foreground">BetterMe Fitness Tracker</span> works in sync with the{" "}
              <span className="font-semibold text-foreground">Health Coaching App</span> and tracks your heart rate, steps, and sleep stats.
            </p>
            <button className="rounded-full bg-destructive px-10 py-4 text-sm font-medium text-destructive-foreground transition-all duration-200 hover:bg-destructive/90 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Find Your Coach Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Find your<br />perfect coach
            </h2>
            <p className="text-muted-foreground">
              Get daily chat support and help from a certified coach for faster progress.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-3xl p-8 md:p-12">
              <div className="text-6xl text-muted-foreground/30 mb-6">"</div>
              <p className="text-lg md:text-xl text-foreground mb-8">
                {coaches[currentCoach].quote}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${heroImage})` }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{coaches[currentCoach].name}</p>
                    <p className="text-sm text-muted-foreground">{coaches[currentCoach].title}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevCoach}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextCoach}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className="relative z-10 flex flex-col justify-end h-full min-h-[400px] p-6">
                <div className="space-y-2">
                  <div className="bg-destructive text-destructive-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-[250px] ml-auto">
                    <p className="text-sm">I slipped and ate fast food yesterday :(</p>
                    <p className="text-xs text-destructive-foreground/70 text-right mt-1">1:10 PM ✓✓</p>
                  </div>
                  <div className="bg-card text-foreground rounded-2xl rounded-bl-sm px-4 py-3 max-w-[280px]">
                    <p className="text-sm">Don't stress! It's about progress, not perfection. Let's start fresh with a balanced meal today!</p>
                    <p className="text-xs text-muted-foreground mt-1">1:10 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Trust Stats Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary" animation="scale">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Your trusted<br />wellness companion
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-muted rounded-2xl p-8"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {stat.value} <span className="text-2xl md:text-3xl font-normal">{stat.unit}</span>
                </div>
                <div className="h-px bg-border mb-4" />
                <p className="text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Real Results Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary" animation="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Real Results.<br />Real Voices.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.slice(0, 4).map((testimonial) => (
              <div
                key={testimonial.id}
                className={`rounded-2xl overflow-hidden ${
                  testimonial.isImage ? "row-span-2" : "bg-card p-6"
                }`}
              >
                {testimonial.isImage ? (
                  <div className="relative h-full min-h-[300px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${heroImage})` }}
                    />
                    <div className="absolute bottom-4 left-4 text-primary-foreground">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm opacity-80">{testimonial.subtitle}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground mb-6">{testimonial.text}</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured In Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="slide-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              As featured in
            </h2>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredIn.map((item, index) => (
              <div
                key={index}
                className="border border-border rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-foreground">{item.name}</p>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="h-px bg-border mb-4" />
                <p className="text-muted-foreground mb-4">{item.quote}</p>
                <a href="#" className="text-foreground font-medium underline">Read Now</a>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* App Download Section */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-background" animation="fade-up">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden h-[500px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute bottom-8 left-8 w-48 h-[350px] rounded-3xl bg-card overflow-hidden shadow-2xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              BetterMe:<br />Health Coaching
            </h3>
            
            <div className="space-y-3 mb-8">
              {appFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-destructive-foreground" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="rounded-full bg-destructive px-10 py-4 text-sm font-medium text-destructive-foreground transition-all duration-200 hover:bg-destructive/90 hover:scale-105">
              Download
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Store CTA Section */}
      <section className="relative py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/60" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-primary-foreground font-medium mb-4">BetterMe Store</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground italic mb-8">
            Find your perfect<br />workout set
          </h2>
          <button className="rounded-full bg-card px-10 py-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/90 hover:scale-105">
            View BetterMe Store
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="py-6 px-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="font-semibold text-foreground mb-1">Important disclaimers</p>
          <p className="text-sm text-muted-foreground">
            Content and other visuals may vary and are subject to change.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex gap-3 mb-6">
                {["instagram", "tiktok", "facebook", "x", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
              <p className="text-sm font-medium text-foreground mb-2">© 2026. BetterMe.</p>
              <p className="text-xs text-muted-foreground">
                Our website services, content and products are for informational purposes only. BetterMe does not provide medical advice, diagnosis, or treatment
              </p>
            </div>
            
            <div className="space-y-3">
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">Products</a>
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">For Business</a>
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">Affiliate Program</a>
            </div>
            
            <div className="space-y-3">
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">About Us</a>
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">Careers</a>
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">Blog</a>
            </div>
            
            <div className="space-y-3">
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">Contacts</a>
              <a href="#" className="block text-foreground hover:text-muted-foreground transition-colors">Brand Assets</a>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="text-destructive hover:text-destructive/80 transition-colors">Need Help?</a>
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-card transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-6 md:px-10 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <LocalizedLink to="" className="text-xl md:text-2xl font-bold text-foreground">
              BetterMe
            </LocalizedLink>
            
            <div className="flex items-center gap-3">
              <div 
                className="relative"
                onMouseEnter={() => setIsMenuLangHovered(true)}
                onMouseLeave={() => setIsMenuLangHovered(false)}
              >
                <button className="flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 py-1">
                  {languageLabels[lang]}
                </button>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                  isMenuLangHovered 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-px bg-border mb-3 transition-all duration-300 delay-100 ${
                      isMenuLangHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`} />
                    <div className="flex flex-col items-center gap-2">
                      {SUPPORTED_LANGUAGES
                        .filter(l => l !== lang)
                        .map((l, index) => (
                          <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${
                              isMenuLangHovered 
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
                onClick={() => setIsMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition-all duration-200 hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-4">
              {menuLinks.map((link, index) => (
                <li key={link.label}>
                  <LocalizedLink
                    to={link.href.startsWith("/") ? link.href.slice(1) : link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground hover:text-muted-foreground transition-colors duration-200 block"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {link.label}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center justify-between pt-8 border-t border-border">
            <LocalizedLink
              to="login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Log in
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCoaching;
