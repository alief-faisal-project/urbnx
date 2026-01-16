import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay popup untuk UX yang lebih baik
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-fade-up">
      <div className="bg-primary text-primary-foreground p-4 shadow-lg border border-primary-foreground/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs leading-relaxed text-primary-foreground/80">
              Kami menggunakan cookies untuk meningkatkan pengalaman Anda dan
              mengingat preferensi kunjungan.
            </p>
          </div>
          <button
            onClick={handleDecline}
            className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAccept}
            className="flex-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
          >
            Terima
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
