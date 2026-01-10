import { createContext, useContext, ReactNode } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const SUPPORTED_LANGUAGES = ["en", "ua", "de", "fr", "es"] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];
export const DEFAULT_LANGUAGE: Language = "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const lang: Language = SUPPORTED_LANGUAGES.includes(urlLang as Language) 
    ? (urlLang as Language) 
    : DEFAULT_LANGUAGE;

  const setLang = (newLang: Language) => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    
    // Remove current lang if present
    if (SUPPORTED_LANGUAGES.includes(pathParts[0] as Language)) {
      pathParts.shift();
    }
    
    const newPath = `/${newLang}${pathParts.length > 0 ? "/" + pathParts.join("/") : ""}`;
    navigate(newPath);
  };

  const getLocalizedPath = (path: string) => {
    // Remove leading slash for consistency
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `/${lang}${cleanPath ? "/" + cleanPath : ""}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
