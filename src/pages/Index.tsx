import Header from "@/components/Header";
import FAQSection from "@/components/FAQSection";
import SearchSection from "@/components/SearchSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowDown } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container relative max-w-4xl py-20 text-center sm:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t("Public documents from the London Commercial Court", "Documents publics de la Cour Commerciale de Londres")}
          </div>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t(
              "How Djibouti Was Locked Into an Unfavourable Deal with DP World",
              "Comment Djibouti s'est retrouvé enfermé dans un accord défavorable avec DP World"
            )}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t(
              "This site documents the landmark London court case that reveals how the Republic of Djibouti entered into a port concession agreement with Dubai Ports World under terms widely regarded as detrimental to the country's sovereignty and economic interests. Explore the court findings, key facts, and the full story behind one of Africa's most consequential commercial disputes.",
              "Ce site documente l'affaire judiciaire historique de Londres qui révèle comment la République de Djibouti a conclu un accord de concession portuaire avec Dubai Ports World dans des conditions largement considérées comme préjudiciables à la souveraineté et aux intérêts économiques du pays. Explorez les conclusions du tribunal, les faits essentiels et toute l'histoire derrière l'un des litiges commerciaux les plus importants d'Afrique."
            )}
          </p>
          <a
            href="#faq"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            {t("Explore the Case", "Explorer l'affaire")}
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Key Facts Strip */}
      <section className="border-b border-border bg-card py-8">
        <div className="container grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              color: "bg-primary",
              label: t("Court", "Tribunal"),
              value: t("London Commercial Court", "Cour Commerciale de Londres"),
            },
            {
              color: "bg-secondary",
              label: t("Parties", "Parties"),
              value: t("Boreh · DP World · Djibouti", "Boreh · DP World · Djibouti"),
            },
            {
              color: "bg-accent",
              label: t("Subject", "Sujet"),
              value: t("Port Concession Agreement", "Accord de Concession Portuaire"),
            },
          ].map((fact, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`mt-1 h-10 w-1 flex-shrink-0 rounded-full ${fact.color}`} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fact.label}</p>
                <p className="text-sm font-semibold text-foreground">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="container max-w-3xl py-12">
        <FAQSection />
        <SearchSection />

        <footer className="mt-16 border-t border-border pt-8 pb-12 text-center">
          <div className="mx-auto flex max-w-xs items-center justify-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <div className="flex gap-0.5">
              <div className="h-2 w-2 rounded-full bg-primary/40" />
              <div className="h-2 w-2 rounded-full bg-secondary/40" />
              <div className="h-2 w-2 rounded-full bg-accent/40" />
            </div>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t(
              "All information sourced from official court documents.",
              "Toutes les informations proviennent de documents judiciaires officiels."
            )}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
