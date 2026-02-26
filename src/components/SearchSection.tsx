import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  section_title: string | null;
  snippet: string;
  document_name: string;
}

const SearchSection = () => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "search-documents",
        { body: { query: query.trim(), language } }
      );

      if (fnError) throw fnError;
      setResults(data?.results ?? []);
    } catch (err: any) {
      setError(err.message ?? "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, "<mark class='bg-primary/20 rounded px-0.5'>$1</mark>");
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
            if (!e.target.value.trim()) {
              setSearched(false);
              setResults([]);
            }
          }}
          placeholder={t(
            "Type a question or keyword…",
            "Tapez une question ou un mot-clé…"
          )}
          className="flex-1"
        />
        <Button type="submit" size="default" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          {t("Search", "Rechercher")}
        </Button>
      </form>

      {searched && !loading && (
        <div className="mt-6 space-y-4">
          {error && (
            <Card>
              <CardContent className="py-6 text-center text-destructive">
                {error}
              </CardContent>
            </Card>
          )}

          {!error && results.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {t(
                  "No results found. Try different keywords.",
                  "Aucun résultat trouvé. Essayez d'autres mots-clés."
                )}
              </CardContent>
            </Card>
          )}

          {results.map((r) => (
            <Card key={r.id}>
              <CardContent className="py-4">
                {r.section_title && (
                  <h3 className="mb-2 font-medium text-foreground">
                    {r.section_title}
                  </h3>
                )}
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: "…" + highlightMatch(r.snippet) + "…",
                  }}
                />
                <span className="mt-2 block text-xs text-muted-foreground/60">
                  {r.document_name}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchSection;
