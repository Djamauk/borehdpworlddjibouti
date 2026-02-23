import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h1 className="text-lg font-semibold tracking-tight">
            {t("Boreh · DP World · Djibouti", "Boreh · DP World · Djibouti")}
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="min-w-[90px] font-medium"
        >
          {language === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
