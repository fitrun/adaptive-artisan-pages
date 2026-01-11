import { useState } from "react";
import { HelpCircle, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-login.jpg";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PlaceholderLink } from "@/components/PlaceholderLink";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate magic link sending
    setTimeout(() => {
      setIsLoading(false);
      setMagicLinkSent(true);
      console.log("Magic link sent to:", email);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
  };

  const isFormValid = email.length > 0;

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-card">
      {/* Left Side - Image (Desktop/Tablet only) */}
      <div className="hidden md:block md:w-1/2 relative p-4 pr-0">
        <div className="relative h-full w-full rounded-3xl overflow-hidden bg-betterme-light">
          {/* Logo */}
          <div className="absolute top-6 left-6 z-10">
            <LocalizedLink to="/" className="text-xl font-bold text-foreground">
              FitRun
            </LocalizedLink>
          </div>

          {/* Hero Image with Watermark */}
          <div className="relative h-full flex items-center justify-center overflow-hidden">
            <img
              src={heroImage}
              alt="Fitness pose"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Large Watermark Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[12vw] font-bold text-card/30 whitespace-nowrap select-none">
                FitRun
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden w-full bg-card border-b border-border px-6 py-4">
        <LocalizedLink to="/" className="text-xl font-bold text-foreground flex justify-center">
          FitRun
        </LocalizedLink>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-card flex flex-col min-h-screen md:min-h-0">
        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 md:px-12 lg:px-16 xl:px-24">
          <motion.div 
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
              Log In
            </h1>

            {magicLinkSent ? (
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-betterme-light flex items-center justify-center">
                  <Mail className="w-8 h-8 text-betterme-red" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
                <p className="text-muted-foreground">
                  We've sent a magic link to <span className="font-medium text-foreground">{email}</span>
                </p>
                <button
                  onClick={() => setMagicLinkSent(false)}
                  className="text-sm font-semibold text-betterme-red hover:opacity-80 transition-opacity uppercase tracking-wide"
                >
                  USE A DIFFERENT EMAIL
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {/* Google Login Button */}
                <motion.button
                  onClick={handleGoogleLogin}
                  className="w-full rounded-full py-4 text-sm font-semibold uppercase tracking-wide bg-foreground text-primary-foreground hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  CONTINUE WITH GOOGLE
                </motion.button>

                {/* Divider */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </motion.div>

                {/* Magic Link Form */}
                <motion.form 
                  onSubmit={handleMagicLinkSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="input-betterme"
                      autoComplete="email"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className={`w-full rounded-full py-4 text-sm font-semibold uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                      isFormValid && !isLoading
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-betterme-button text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        SEND MAGIC LINK
                      </>
                    )}
                  </button>
                </motion.form>
              </div>
            )}

            {/* Sign Up Link */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="text-sm text-foreground">Don't have an account? </span>
              <PlaceholderLink
                className="text-sm font-medium text-betterme-red hover:opacity-80 transition-opacity"
              >
                Create one now
              </PlaceholderLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 md:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md mx-auto md:max-w-none">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <PlaceholderLink
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of use
                </PlaceholderLink>
                <PlaceholderLink
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy policy
                </PlaceholderLink>
                <PlaceholderLink
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  e-Privacy Settings
                </PlaceholderLink>
              </div>

              {/* Help Button */}
              <button className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                <HelpCircle className="h-4 w-4" />
                HELP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
