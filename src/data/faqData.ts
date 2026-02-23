export interface FAQItem {
  id: string;
  questionEn: string;
  questionFr: string;
  answerEn: string;
  answerFr: string;
}

export const faqData: FAQItem[] = [
  {
    id: "1",
    questionEn: "What is this court case about?",
    questionFr: "De quoi traite cette affaire judiciaire ?",
    answerEn:
      "This case involves disputes between Abdourahman Boreh, DP World, and the Government of Djibouti regarding port concession agreements and related commercial matters heard in London courts.",
    answerFr:
      "Cette affaire concerne des litiges entre Abdourahman Boreh, DP World et le Gouvernement de Djibouti concernant des accords de concession portuaire et des questions commerciales connexes jugées devant les tribunaux de Londres.",
  },
  {
    id: "2",
    questionEn: "Who are the main parties involved?",
    questionFr: "Quelles sont les principales parties impliquées ?",
    answerEn:
      "The main parties are Abdourahman Boreh (a Djiboutian businessman), DP World (a global port operator based in Dubai), and the Republic of Djibouti.",
    answerFr:
      "Les principales parties sont Abdourahman Boreh (un homme d'affaires djiboutien), DP World (un opérateur portuaire mondial basé à Dubaï) et la République de Djibouti.",
  },
  {
    id: "3",
    questionEn: "Which court heard the case?",
    questionFr: "Quel tribunal a entendu l'affaire ?",
    answerEn:
      "The case was heard in the Commercial Court of the High Court of Justice in London, England.",
    answerFr:
      "L'affaire a été entendue devant la Cour commerciale de la Haute Cour de justice à Londres, en Angleterre.",
  },
  {
    id: "4",
    questionEn: "What was the outcome of the case?",
    questionFr: "Quel a été le résultat de l'affaire ?",
    answerEn:
      "The detailed outcome will be available once the document content is uploaded. Please check back or search for specific aspects of the ruling.",
    answerFr:
      "Le résultat détaillé sera disponible une fois le contenu du document téléchargé. Veuillez revenir ou rechercher des aspects spécifiques de la décision.",
  },
  {
    id: "5",
    questionEn: "What role did DP World play in Djibouti?",
    questionFr: "Quel rôle DP World a-t-il joué à Djibouti ?",
    answerEn:
      "DP World operated the Doraleh Container Terminal under a concession agreement with the Government of Djibouti.",
    answerFr:
      "DP World exploitait le Terminal à Conteneurs de Doraleh dans le cadre d'un accord de concession avec le Gouvernement de Djibouti.",
  },
];
