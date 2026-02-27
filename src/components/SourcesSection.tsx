import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, Scale, Globe, Newspaper } from "lucide-react";

interface SourceLink {
  labelEn: string;
  labelFr: string;
  descEn: string;
  descFr: string;
  url: string;
}

const directJudgments: SourceLink[] = [
  {
    labelEn: "Final Judgment (March 2016)",
    labelFr: "Jugement final (mars 2016)",
    descEn: "The complete 200+ page ruling that dismissed the Republic of Djibouti's fraud claims against Mr. Boreh.",
    descFr: "La décision complète de plus de 200 pages qui a rejeté les allégations de fraude de la République de Djibouti contre M. Boreh.",
    url: "https://www.bailii.org/ew/cases/EWHC/Comm/2016/405.html",
  },
  {
    labelEn: "Freezing Injunction Judgment (March 2015)",
    labelFr: "Jugement sur l'injonction de gel (mars 2015)",
    descEn: "The ruling regarding the setting aside of the worldwide freezing order due to the court being misled.",
    descFr: "La décision concernant l'annulation de l'ordonnance de gel mondiale en raison de la tromperie du tribunal.",
    url: "https://www.bailii.org/ew/cases/EWHC/Comm/2015/769.html",
  },
];

const arbitrationDatabases: SourceLink[] = [
  {
    labelEn: "Jus Mundi — DP World v. Djibouti",
    labelFr: "Jus Mundi — DP World c. Djibouti",
    descEn: "Comprehensive archive of the LCIA arbitration cases, including the 2006 Concession Agreement and Partial Final Awards (2018–2022).",
    descFr: "Archive complète des affaires d'arbitrage LCIA, y compris l'Accord de Concession de 2006 et les sentences partielles finales (2018–2022).",
    url: "https://jusmundi.com/en/document/decision/en-dp-world-djibouti-fze-v-republic-of-djibouti",
  },
  {
    labelEn: "CaseMine — Republic of Djibouti v Boreh",
    labelFr: "CaseMine — République de Djibouti c. Boreh",
    descEn: "Searchable text version of the High Court judgments and summaries of the legal implications.",
    descFr: "Version textuelle consultable des jugements de la Haute Cour et résumés des implications juridiques.",
    url: "https://www.casemine.com/search/gb/boreh+djibouti",
  },
  {
    labelEn: "Transnational Dispute Management (TDM)",
    labelFr: "Transnational Dispute Management (TDM)",
    descEn: "Legal and regulatory documents related to the seizure of the Doraleh Container Terminal.",
    descFr: "Documents juridiques et réglementaires liés à la saisie du Terminal à Conteneurs de Doraleh.",
    url: "https://www.transnational-dispute-management.com/",
  },
];

const newsRecords: SourceLink[] = [
  {
    labelEn: "Dubai Media Office — DP World Press Releases",
    labelFr: "Dubai Media Office — Communiqués de presse DP World",
    descEn: "Official press releases from DP World regarding the outcome of LCIA rulings and their $685 million awards against the government.",
    descFr: "Communiqués de presse officiels de DP World concernant les résultats des décisions de la LCIA et leurs 685 millions de dollars de dommages.",
    url: "https://mediaoffice.ae/en/news",
  },
  {
    labelEn: "Practical Law (Thomson Reuters)",
    labelFr: "Practical Law (Thomson Reuters)",
    descEn: "Legal updates and expert analysis of the dismissal of the fraud claims and practical points for international litigators.",
    descFr: "Mises à jour juridiques et analyses d'experts sur le rejet des allégations de fraude.",
    url: "https://uk.practicallaw.thomsonreuters.com/",
  },
  {
    labelEn: "FindLaw — US Court Records (2024)",
    labelFr: "FindLaw — Dossiers judiciaires américains (2024)",
    descEn: "2024 U.S. District Court rulings regarding the enforcement of the $474 million arbitral award in the United States.",
    descFr: "Décisions du tribunal de district américain de 2024 concernant l'exécution de la sentence arbitrale de 474 millions de dollars aux États-Unis.",
    url: "https://caselaw.findlaw.com/",
  },
];

const SourceCategory = ({
  icon: Icon,
  titleEn,
  titleFr,
  links,
  color,
}: {
  icon: React.ElementType;
  titleEn: string;
  titleFr: string;
  links: SourceLink[];
  color: string;
}) => {
  const { language } = useLanguage();
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-sm font-bold tracking-tight text-foreground">
          {language === "en" ? titleEn : titleFr}
        </h3>
      </div>
      <div className="space-y-2 pl-10">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-border bg-background/50 p-3 transition-all hover:border-primary/30 hover:bg-muted/50 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {language === "en" ? link.labelEn : link.labelFr}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {language === "en" ? link.descEn : link.descFr}
                </p>
              </div>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const SourcesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
          <Scale className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("Legal Documents & Sources", "Documents juridiques et sources")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("Click any link to access the original documents", "Cliquez sur un lien pour accéder aux documents originaux")}
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-2xl border border-border bg-card p-5">
        <SourceCategory
          icon={Scale}
          titleEn="Direct Legal Judgments"
          titleFr="Jugements juridiques directs"
          links={directJudgments}
          color="bg-primary"
        />
        <SourceCategory
          icon={Globe}
          titleEn="International Arbitration Databases"
          titleFr="Bases de données d'arbitrage international"
          links={arbitrationDatabases}
          color="bg-secondary"
        />
        <SourceCategory
          icon={Newspaper}
          titleEn="Official News & Corporate Records"
          titleFr="Actualités officielles et archives"
          links={newsRecords}
          color="bg-accent"
        />
      </div>
    </section>
  );
};

export default SourcesSection;
