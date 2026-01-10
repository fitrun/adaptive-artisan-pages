import { useState } from "react";
import { Menu, X, ArrowRight, ArrowLeft } from "lucide-react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { useLanguage, SUPPORTED_LANGUAGES, Language } from "@/hooks/use-language";
import { BlogNavigation } from "@/components/BlogNavigation";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { useParams } from "react-router-dom";

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

// Mock category data
const categoryData: Record<string, { name: string; description: string }> = {
  "nutrition": { name: "Nutrition", description: "Explore evidence-based nutrition advice, healthy eating tips, and dietary guidelines for optimal health." },
  "diets": { name: "Diets", description: "Discover popular diet plans, from keto to Mediterranean, and find the approach that works best for you." },
  "fitness": { name: "Fitness", description: "Get inspired with workout routines, exercise tips, and fitness strategies for all levels." },
  "weight-loss": { name: "Weight Loss", description: "Science-backed weight loss strategies, success stories, and practical tips for sustainable results." },
  "mental-health": { name: "Mental Health", description: "Resources for mental wellness, stress management, meditation, and mindfulness practices." },
  "corporate-wellness": { name: "Corporate Wellness", description: "Workplace wellness programs, employee health initiatives, and productivity tips." },
  "workouts": { name: "Workouts", description: "Effective workout routines for building strength, endurance, and flexibility." },
  "recipes": { name: "Recipes", description: "Healthy and delicious recipes for every meal, dietary preference, and skill level." },
  "healthy-eating": { name: "Healthy Eating", description: "Tips and guides for making nutritious food choices and building healthy eating habits." },
  "meal-plans": { name: "Meal Plans", description: "Structured meal plans to help you achieve your health and fitness goals." },
};

// Mock articles data
const allArticles = [
  {
    slug: "high-protein-lunch-ideas",
    category: "nutrition",
    title: "High Protein Lunch Box Ideas: 5 Quick Meals For On-The-Go",
    author: "Maja Petrushevska",
    date: "January 8, 2026",
    views: 1245,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    slug: "is-2-meals-a-day-enough",
    category: "nutrition",
    title: "Is 2 Meals A Day Enough? Everything You Should Know",
    author: "Shadrack Korir",
    date: "January 9, 2026",
    views: 4521,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
  {
    slug: "intermittent-fasting-guide",
    category: "diets",
    title: "The Complete Guide to Intermittent Fasting",
    author: "Maja Petrushevska",
    date: "January 7, 2026",
    views: 8932,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    slug: "keto-diet-beginners",
    category: "diets",
    title: "Keto Diet for Beginners: A Complete Guide",
    author: "Elena Rodriguez",
    date: "January 6, 2026",
    views: 12450,
    reviewer: "Dr. Mark Wilson",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
  },
  {
    slug: "mediterranean-diet-benefits",
    category: "diets",
    title: "10 Science-Backed Benefits of the Mediterranean Diet",
    author: "Shadrack Korir",
    date: "January 5, 2026",
    views: 6789,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
  },
  {
    slug: "home-workout-routine",
    category: "fitness",
    title: "30-Minute Home Workout Routine for Busy People",
    author: "Alex Thompson",
    date: "January 8, 2026",
    views: 9876,
    reviewer: "Dr. Sarah Mitchell",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
  },
  {
    slug: "strength-training-benefits",
    category: "fitness",
    title: "Why Strength Training is Essential for Everyone",
    author: "Michael Chen",
    date: "January 4, 2026",
    views: 5432,
    reviewer: "Dr. James Brown",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
  {
    slug: "yoga-for-beginners",
    category: "fitness",
    title: "Yoga for Beginners: Start Your Practice Today",
    author: "Lisa Park",
    date: "January 3, 2026",
    views: 7654,
    reviewer: "Dr. Emily White",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
  {
    slug: "sustainable-weight-loss",
    category: "weight-loss",
    title: "Sustainable Weight Loss: Tips That Actually Work",
    author: "Maja Petrushevska",
    date: "January 7, 2026",
    views: 11234,
    reviewer: "Kristen Fleming, RD",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    slug: "calorie-deficit-explained",
    category: "weight-loss",
    title: "Calorie Deficit Explained: The Key to Weight Loss",
    author: "Shadrack Korir",
    date: "January 2, 2026",
    views: 8765,
    reviewer: "Dr. Mark Wilson",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
  {
    slug: "meditation-for-beginners",
    category: "mental-health",
    title: "Meditation for Beginners: A Step-by-Step Guide",
    author: "Lisa Park",
    date: "January 6, 2026",
    views: 6543,
    reviewer: "Dr. Emily White",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  },
  {
    slug: "stress-management-techniques",
    category: "mental-health",
    title: "10 Effective Stress Management Techniques",
    author: "Elena Rodriguez",
    date: "January 1, 2026",
    views: 4321,
    reviewer: "Dr. Sarah Mitchell",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop",
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

const BlogCategory = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const { lang, setLang } = useLanguage();
  const { category } = useParams();

  const categorySlug = category || "nutrition";
  const categoryInfo = categoryData[categorySlug] || { name: categorySlug, description: "" };
  
  // Filter articles by category
  const filteredArticles = allArticles.filter(
    (article) => article.category === categorySlug
  );

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
            <PlaceholderLink className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Need Help?
            </PlaceholderLink>
            
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
        
        <BlogNavigation />
      </header>

      {/* Category Header */}
      <AnimatedSection animation="fade-up" className="py-12 px-6 md:px-10 lg:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <LocalizedLink to="/blog" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Blog
            </LocalizedLink>
            <span>/</span>
            <span>{categoryInfo.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{categoryInfo.name}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{categoryInfo.description}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredArticles.length} {filteredArticles.length === 1 ? "Article" : "Articles"}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Articles Grid */}
      <section className="py-12 px-6 md:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <AnimatedSection key={article.slug} animation="fade-up" delay={0.1 * (index % 6)}>
                  <LocalizedLink 
                    to={`/article/${article.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] overflow-hidden mb-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-muted mb-3">
                      {categoryInfo.name}
                    </span>
                    <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3 group-hover:text-muted-foreground transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>By <span className="underline">{article.author}</span></span>
                      <span>|</span>
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.views.toLocaleString()} views</span>
                    </div>
                  </LocalizedLink>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No articles found in this category.</p>
              <LocalizedLink 
                to="/blog"
                className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </LocalizedLink>
            </div>
          )}
        </div>
      </section>

      {/* Load More (placeholder) */}
      {filteredArticles.length >= 6 && (
        <div className="pb-12 px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto flex justify-center">
            <button className="flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Load More Articles
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12">
          <div className="flex flex-wrap items-center justify-between gap-8 pb-8 border-b border-border">
            <div className="flex flex-wrap items-center gap-6">
              {socialLinks.map((link) => (
                <PlaceholderLink
                  key={link.label}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </PlaceholderLink>
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
                <PlaceholderLink
                  key={link.label}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </PlaceholderLink>
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

export default BlogCategory;
