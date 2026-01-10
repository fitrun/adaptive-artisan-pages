import { useState } from "react";
import { Menu, X, ArrowLeft, Clock, Eye, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
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

// Mock article data - in a real app this would come from an API
const articleData = {
  category: "Nutrition",
  title: "Is 2 Meals A Day Enough? Everything You Should Know",
  subtitle: "Discover the science behind meal frequency and how it affects your metabolism, energy levels, and overall health.",
  author: {
    name: "Shadrack Korir",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "Health & Nutrition Writer",
    bio: "Shadrack is a certified nutritionist with over 8 years of experience in health journalism. He specializes in evidence-based nutrition advice and has helped thousands of readers achieve their health goals through practical dietary guidance.",
  },
  reviewer: {
    name: "Kristen Fleming, RD",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    credentials: "Registered Dietitian",
  },
  date: "January 9, 2026",
  readTime: "8 min read",
  views: 4521,
  image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop",
  content: [
    {
      type: "paragraph",
      text: "The question of how many meals you should eat per day has been debated for decades. While traditional wisdom suggests three square meals, many people are now experimenting with eating just two meals a day. But is this approach healthy, and can it help you achieve your fitness goals?"
    },
    {
      type: "heading",
      text: "Understanding Meal Frequency"
    },
    {
      type: "paragraph",
      text: "Meal frequency refers to how often you eat throughout the day. The concept has evolved significantly over the years, with various eating patterns gaining popularity, from the classic three meals to six small meals, and more recently, intermittent fasting approaches that often involve eating just two meals."
    },
    {
      type: "paragraph",
      text: "Research suggests that the total amount of calories and nutrients you consume matters more than how you distribute them throughout the day. However, meal timing can affect factors like hunger levels, energy, and adherence to your diet."
    },
    {
      type: "heading",
      text: "Benefits of Eating Two Meals a Day"
    },
    {
      type: "list",
      items: [
        "Simplified meal planning and preparation",
        "Potential benefits for blood sugar regulation",
        "May support intermittent fasting goals",
        "Can help reduce overall calorie intake",
        "More time between meals for proper digestion"
      ]
    },
    {
      type: "paragraph",
      text: "Many people find that eating two larger meals helps them feel more satisfied compared to eating smaller, more frequent meals. This can be particularly beneficial for those who struggle with portion control or constant snacking."
    },
    {
      type: "heading",
      text: "Potential Drawbacks to Consider"
    },
    {
      type: "paragraph",
      text: "While two meals a day can work for many people, it's not suitable for everyone. Athletes with high energy demands, pregnant women, people with certain medical conditions, and those prone to blood sugar fluctuations may need more frequent eating."
    },
    {
      type: "quote",
      text: "The best eating pattern is one that you can maintain consistently while meeting your nutritional needs and supporting your lifestyle.",
      author: "Dr. Sarah Mitchell, Nutritional Scientist"
    },
    {
      type: "heading",
      text: "How to Make Two Meals Work"
    },
    {
      type: "paragraph",
      text: "If you decide to try eating two meals a day, it's crucial to ensure each meal is nutritionally complete. Focus on including adequate protein, healthy fats, complex carbohydrates, and plenty of vegetables. Stay hydrated between meals, and listen to your body's hunger and fullness cues."
    },
    {
      type: "paragraph",
      text: "Consider working with a registered dietitian to ensure you're meeting all your nutritional needs, especially if you have specific health goals or conditions to manage."
    },
    {
      type: "heading",
      text: "The Bottom Line"
    },
    {
      type: "paragraph",
      text: "Eating two meals a day can be a viable approach for many people, but it's not a one-size-fits-all solution. The key is finding an eating pattern that supports your health goals, fits your lifestyle, and provides adequate nutrition. Whether you eat two, three, or more meals, focus on the quality of your food choices and total daily nutrient intake."
    }
  ]
};

const relatedArticles = [
  {
    slug: "intermittent-fasting-guide",
    category: "Nutrition",
    title: "The Complete Guide to Intermittent Fasting",
    author: "Maja Petrushevska",
    date: "January 7, 2026",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    slug: "protein-requirements",
    category: "Nutrition",
    title: "How Much Protein Do You Really Need?",
    author: "Shadrack Korir",
    date: "January 5, 2026",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    slug: "meal-timing-myths",
    category: "Diets",
    title: "5 Meal Timing Myths You Need to Stop Believing",
    author: "Elena Rodriguez",
    date: "January 3, 2026",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
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

const BlogArticle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuLangHovered, setIsMenuLangHovered] = useState(false);
  const { lang, setLang } = useLanguage();
  const { slug } = useParams();

  const article = articleData; // In a real app, fetch based on slug

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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-12">
        {/* Breadcrumb */}
        <AnimatedSection animation="fade-up">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <LocalizedLink to="/blog" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Blog
            </LocalizedLink>
            <span>/</span>
            <span>{article.category}</span>
          </div>
        </AnimatedSection>

        {/* Article Header */}
        <AnimatedSection animation="fade-up" delay={0.1}>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-muted mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            {article.subtitle}
          </p>
        </AnimatedSection>

        {/* Article Meta */}
        <AnimatedSection animation="fade-up" delay={0.2}>
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border mb-8">
            <div className="flex items-center gap-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">{article.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {article.views.toLocaleString()} views
              </span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Share">
                <Share2 className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Bookmark">
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Featured Image */}
        <AnimatedSection animation="fade-up" delay={0.3}>
          <div className="aspect-[2/1] overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>

        {/* Reviewer Credit */}
        <AnimatedSection animation="fade-up" delay={0.4}>
          <div className="flex items-center gap-3 p-4 bg-muted/50 mb-8">
            <img 
              src={article.reviewer.avatar} 
              alt={article.reviewer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-muted-foreground">
                Medically reviewed by <span className="font-medium text-foreground">{article.reviewer.name}</span>
              </p>
              <p className="text-xs text-muted-foreground">{article.reviewer.credentials}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Article Body */}
        <AnimatedSection animation="fade-up" delay={0.5}>
          <div className="prose prose-lg max-w-none">
            {article.content.map((block, index) => {
              switch (block.type) {
                case "heading":
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">
                      {block.text}
                    </h2>
                  );
                case "paragraph":
                  return (
                    <p key={index} className="text-foreground/80 leading-relaxed mb-6">
                      {block.text}
                    </p>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-foreground/80">
                      {block.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-8 bg-muted/30">
                      <p className="text-lg italic text-foreground mb-2">"{block.text}"</p>
                      {block.author && (
                        <cite className="text-sm text-muted-foreground not-italic">— {block.author}</cite>
                      )}
                    </blockquote>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </AnimatedSection>

        {/* Share Section */}
        <AnimatedSection animation="fade-up" delay={0.6}>
          <div className="flex items-center gap-4 py-8 border-y border-border mt-8">
            <span className="text-sm font-medium text-foreground">Share this article:</span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Share on Facebook">
                <Facebook className="h-5 w-5 text-foreground" />
              </button>
              <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Share on Twitter">
                <Twitter className="h-5 w-5 text-foreground" />
              </button>
              <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Share on LinkedIn">
                <Linkedin className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Author Bio */}
        <AnimatedSection animation="fade-up" delay={0.7}>
          <div className="py-8 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">About the Author</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-medium text-foreground">{article.author.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{article.author.role}</p>
                <p className="text-foreground/80 leading-relaxed">{article.author.bio}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </article>

      {/* Related Articles */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Articles</h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((related, index) => (
              <AnimatedSection key={related.slug} animation="fade-up" delay={0.1 * (index + 1)}>
                <LocalizedLink 
                  to={`/article/${related.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-muted mb-2">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    <span>By {related.author}</span>
                    <span className="mx-2">|</span>
                    <span>{related.date}</span>
                  </div>
                </LocalizedLink>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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

export default BlogArticle;
