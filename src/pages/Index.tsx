import Header from "@/components/Header";
import FAQSection from "@/components/FAQSection";
import SearchSection from "@/components/SearchSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl py-12">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t(
              "Boreh, DP World & Government of Djibouti",
              "Boreh, DP World et Gouvernement de Djibouti"
            )}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t(
              "Information about the London Commercial Court case. Browse frequently asked questions or search the case documents.",
              "Informations sur l'affaire devant la Cour commerciale de Londres. Parcourez les questions fréquentes ou recherchez dans les documents du dossier."
            )}
          </p>
        </section>

        <FAQSection />
        <SearchSection />

        <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          {t(
            "All information sourced from official court documents.",
            "Toutes les informations proviennent de documents judiciaires officiels."
          )}
        </footer>
      </main>
    </div>
  );
};

export default Index;
