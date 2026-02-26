import { useLanguage } from "@/contexts/LanguageContext";
import { faqData } from "@/data/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const { language, t } = useLanguage();

  return (
    <section id="faq" className="py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <HelpCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("Frequently Asked Questions", "Questions Fréquentes")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("Key facts about the case", "Faits essentiels sur l'affaire")}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-1">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => {
            const colors = ["border-l-primary", "border-l-secondary", "border-l-accent", "border-l-destructive", "border-l-primary"];
            return (
              <AccordionItem key={item.id} value={item.id} className="border-b-0 last:border-b-0">
                <div className={`mx-2 my-1 rounded-xl border-l-4 ${colors[index % colors.length]} bg-background/50 px-4 transition-colors hover:bg-muted/50`}>
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold hover:no-underline">
                    {language === "en" ? item.questionEn : item.questionFr}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {language === "en" ? item.answerEn : item.answerFr}
                  </AccordionContent>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
