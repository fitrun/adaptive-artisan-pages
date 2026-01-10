import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { LanguageProvider, detectBrowserLanguage } from "@/hooks/use-language";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Products from "./pages/Products";
import HealthCoaching from "./pages/HealthCoaching";
import MentalHealth from "./pages/MentalHealth";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import BlogCategory from "./pages/BlogCategory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Helper component for redirecting paths with subpaths
const RedirectWithPath = ({ basePath }: { basePath: string }) => {
  const location = useLocation();
  const subPath = location.pathname.replace(basePath, "");
  return <Navigate to={`/${detectBrowserLanguage()}${basePath}${subPath}`} replace />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirect root to detected browser language */}
        <Route path="/" element={<Navigate to={`/${detectBrowserLanguage()}`} replace />} />
        
        {/* Redirects for routes without language prefix */}
        <Route path="/login" element={<Navigate to={`/${detectBrowserLanguage()}/login`} replace />} />
        <Route path="/products" element={<Navigate to={`/${detectBrowserLanguage()}/products`} replace />} />
        <Route path="/products/health-coaching" element={<Navigate to={`/${detectBrowserLanguage()}/products/health-coaching`} replace />} />
        <Route path="/products/mental-health" element={<Navigate to={`/${detectBrowserLanguage()}/products/mental-health`} replace />} />
        <Route path="/blog" element={<Navigate to={`/${detectBrowserLanguage()}/blog`} replace />} />
        <Route path="/blog/*" element={<RedirectWithPath basePath="/blog" />} />
        
        {/* Language-prefixed routes */}
        <Route path="/:lang" element={<LanguageProvider><PageTransition><Index /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/login" element={<LanguageProvider><PageTransition><Login /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/products" element={<LanguageProvider><PageTransition><Products /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/products/health-coaching" element={<LanguageProvider><PageTransition><HealthCoaching /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/products/mental-health" element={<LanguageProvider><PageTransition><MentalHealth /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/blog" element={<LanguageProvider><PageTransition><Blog /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/blog/:category" element={<LanguageProvider><PageTransition><BlogCategory /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/blog/:category/*" element={<LanguageProvider><PageTransition><BlogCategory /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/article/:slug" element={<LanguageProvider><PageTransition><BlogArticle /></PageTransition></LanguageProvider>} />
        
        {/* Catch-all for 404 */}
        <Route path="*" element={<LanguageProvider><PageTransition><NotFound /></PageTransition></LanguageProvider>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
