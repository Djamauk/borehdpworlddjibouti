import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SearchSection = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearched(true);
      // Backend search will be connected later
    }
  };

  return (
    <section id="search" className="py-12">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        {t("Search Documents", "Rechercher dans les Documents")}
      </h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value.trim()) setSearched(false);
          }}
          placeholder={t(
            "Type a question or keyword…",
            "Tapez une question ou un mot-clé…"
          )}
          className="flex-1"
        />
        <Button type="submit" size="default">
          <Search className="mr-2 h-4 w-4" />
          {t("Search", "Rechercher")}
        </Button>
      </form>

      {searched && (
        <Card className="mt-6">
          <CardContent className="py-8 text-center text-muted-foreground">
            {t(
              "Search will be available once the documents are uploaded and processed.",
              "La recherche sera disponible une fois les documents téléchargés et traités."
            )}
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default SearchSection;
