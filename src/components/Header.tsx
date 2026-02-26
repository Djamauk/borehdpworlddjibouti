import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            <div className="h-7 w-1.5 rounded-full bg-primary" />
            <div className="h-7 w-1.5 rounded-full bg-secondary" />
            <div className="h-7 w-1.5 rounded-full bg-accent" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-foreground" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {t("Boreh · DP World · Djibouti", "Boreh · DP World · Djibouti")}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="gap-2 rounded-full border-primary/20 text-xs font-medium hover:bg-primary/5"
        >
          <Globe className="h-3.5 w-3.5" />
          {language === "en" ? "Français" : "English"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
