import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLanguage, SUPPORTED_LANGUAGES, Language } from "@/hooks/use-language";
import { BlogNavigation } from "@/components/BlogNavigation";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

const menuLinks = [
  { label: "Products", href: "/products" },
  { label: "Store", href: "#" },
  { label: "About Us", href: "#" },
  { label: "For Business", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Affiliate Program", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contacts", href: "#" },
];

const languageLabels: Record<Language, string> = {
  en: "EN",
  ua: "UA",
  de: "DE",
  fr: "FR",
  es: "ES",
};

const categories = [
  { name: "Nutrition", articles: 494, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop" },
  { name: "Diets", articles: 494, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop" },
  { name: "Weight Loss", articles: 287, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop" },
  { name: "Fitness", articles: 490, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop" },
  { name: "Workouts", articles: 412, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" },
  { name: "Mental Health", articles: 69, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop" },
  { name: "Recipes", articles: 828, image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop" },
  { name: "Healthy Eating", articles: 104, image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop" },
  { name: "Meal Plans", articles: 438, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop" },
];

const featuredArticles = [
  {
    slug: "high-protein-lunch-box-ideas",
    category: "Meal Ideas",
    title: "High Protein Lunch Box Ideas: 5 Quick Meals For On-The-Go",
    author: "Maja Petrushevska",
    date: "January 8, 2026",
    views: 1,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    slug: "is-2-meals-a-day-enough",
    category: "Nutrition",
    title: "Is 2 Meals A Day Enough? Everything You Should Know",
    author: "Shadrack Korir",
    date: "January 9, 2026",
    views: 4,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const footerNavLinks = [
  { label: "Products", href: "/products" },
  { label: "For Business", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Contacts", href: "#" },
];

const footerBottomLinks = [
  { label: "Need Help?", href: "#" },
  { label: "Editorial Policy", href: "#" },
  { label: "Editorial Team", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "e-Privacy Settings", href: "#" },
];

const Blog = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-12">
          <div className="flex items-center gap-4">
            <LocalizedLink to="/" className="text-xl md:text-2xl font-bold text-foreground">
              BetterMe
            </LocalizedLink>
            <span className="text-xl md:text-2xl font-light text-muted-foreground">Blog</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Need Help?
            </a>
            
            <LocalizedLink
              to="/login"
              className="hidden md:inline-flex items-center justify-center rounded-full border border-border bg-transparent px-6 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Log In
            </LocalizedLink>
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition-all duration-200 hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Blog Navigation */}
        <BlogNavigation />
      </header>

      {/* Featured Section */}
      <AnimatedSection animation="fade-up" className="py-12 px-6 md:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Diets</h1>
            <button className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              All Diets
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <LocalizedLink 
                key={index} 
                to={`/article/${article.slug}`}
                className="group cursor-pointer block"
              >
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-muted rounded-full mb-3">
                  {article.category}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-muted-foreground transition-colors">
                  {article.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>By <span className="underline">{article.author}</span></span>
                  <span>|</span>
                  <span>{article.date}</span>
                  <span>|</span>
                  <span>{article.views} views</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-muted" />
                  <span>Reviewed by <span className="underline">{article.reviewer}</span></span>
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Categories Grid */}
      <AnimatedSection animation="fade-up" delay={0.2} className="py-12 px-6 md:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <LocalizedLink
                key={category.name}
                to={`/blog/${category.name.toLowerCase().replace(" ", "-")}`}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.articles} Articles</p>
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12">
          {/* Social & Nav Links */}
          <div className="flex flex-wrap items-center justify-between gap-8 pb-8 border-b border-border">
            <div className="flex flex-wrap items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {footerNavLinks.map((link) => (
                <LocalizedLink
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </LocalizedLink>
              ))}
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="flex flex-wrap items-start justify-between gap-8 pt-8">
            <div className="max-w-md">
              <p className="text-sm text-muted-foreground mb-2">© 2026. BetterMe</p>
              <p className="text-xs text-muted-foreground">
                Our website services, content and products are for informational purposes only. 
                BetterMe does not provide medical advice, diagnosis, or treatment
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {footerBottomLinks.map((link) => (
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

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-card" />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-12">
            <div className="flex items-center gap-4">
              <LocalizedLink to="/" className="text-xl md:text-2xl font-bold text-foreground" onClick={() => setIsMenuOpen(false)}>
                BetterMe
              </LocalizedLink>
              <span className="text-xl md:text-2xl font-light text-muted-foreground">Blog</span>
            </div>
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
                  <LocalizedLink
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl md:text-4xl lg:text-5xl font-medium text-foreground hover:text-muted-foreground transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </LocalizedLink>
                ))}
              </nav>
            </div>

            <div className="mt-8 lg:mt-0 lg:ml-16 flex flex-col justify-center">
              <LocalizedLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted w-fit mb-6"
              >
                Log in
              </LocalizedLink>
              
              <div 
                className="relative inline-block"
                onMouseEnter={() => setIsMenuLangHovered(true)}
                onMouseLeave={() => setIsMenuLangHovered(false)}
              >
                <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {languageLabels[lang]}
                </button>
                
                <div className={`absolute bottom-full left-0 pb-2 transition-all duration-300 ${
                  isMenuLangHovered 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}>
                  <div className="flex flex-col gap-2 bg-card rounded-lg p-2 shadow-lg border border-border">
                    {SUPPORTED_LANGUAGES
                      .filter(l => l !== lang)
                      .map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left px-3 py-1.5 rounded hover:bg-muted"
                        >
                          {languageLabels[l]}
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

export default Blog;
