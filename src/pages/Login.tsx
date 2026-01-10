import { useState } from "react";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import heroImage from "@/assets/hero-login.jpg";
import { LocalizedLink } from "@/components/LocalizedLink";
import { PlaceholderLink } from "@/components/PlaceholderLink";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Side - Image (Desktop/Tablet only) */}
      <div className="hidden md:block md:w-1/2 relative bg-FitRun-light">
        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
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
          <div className="w-full max-w-md mx-auto">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
              Log In
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="input-FitRun"
                  autoComplete="email"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input-FitRun pr-20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <PlaceholderLink
                  className="text-sm font-semibold text-FitRun-red hover:opacity-80 transition-opacity uppercase tracking-wide"
                >
                  FORGOT YOUR PASSWORD?
                </PlaceholderLink>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-full py-4 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                  isFormValid
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-FitRun-button text-muted-foreground cursor-not-allowed"
                }`}
              >
                LOG IN
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-sm text-foreground">Don't have an account? </span>
              <PlaceholderLink
                className="text-sm font-medium text-FitRun-red hover:opacity-80 transition-opacity"
              >
                Create one now
              </PlaceholderLink>
            </div>
          </div>
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
