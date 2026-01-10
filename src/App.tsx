import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { LanguageProvider, DEFAULT_LANGUAGE } from "@/hooks/use-language";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Products from "./pages/Products";
import HealthCoaching from "./pages/HealthCoaching";
import MentalHealth from "./pages/MentalHealth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirect root to default language */}
        <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
        
        {/* Language-prefixed routes */}
        <Route path="/:lang" element={<LanguageProvider><PageTransition><Index /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/login" element={<LanguageProvider><PageTransition><Login /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/products" element={<LanguageProvider><PageTransition><Products /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/products/health-coaching" element={<LanguageProvider><PageTransition><HealthCoaching /></PageTransition></LanguageProvider>} />
        <Route path="/:lang/products/mental-health" element={<LanguageProvider><PageTransition><MentalHealth /></PageTransition></LanguageProvider>} />
        
        {/* Catch-all for 404 */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
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
