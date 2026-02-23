import { useLanguage } from "@/contexts/LanguageContext";
import { faqData } from "@/data/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { language, t } = useLanguage();

  return (
    <section id="faq" className="py-12">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        {t("Frequently Asked Questions", "Questions Fréquentes")}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left">
              {language === "en" ? item.questionEn : item.questionFr}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {language === "en" ? item.answerEn : item.answerFr}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
