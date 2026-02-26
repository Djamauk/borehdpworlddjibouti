import { useState } from "react";
import { Search, Loader2, FileText } from "lucide-react";
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
    return text.replace(regex, "<mark class='bg-accent/30 text-accent-foreground rounded px-0.5 font-medium'>$1</mark>");
  };

  return (
    <section id="search" className="py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
          <FileText className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("Search Documents", "Rechercher dans les Documents")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("Find specific passages in court documents", "Trouvez des passages dans les documents judiciaires")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
            className="rounded-xl border-border bg-card pl-10"
          />
        </div>
        <Button type="submit" size="default" disabled={loading} className="rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("Search", "Rechercher")
          )}
        </Button>
      </form>

      {searched && !loading && (
        <div className="mt-6 space-y-3">
          {error && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="py-6 text-center text-sm text-destructive">
                {error}
              </CardContent>
            </Card>
          )}

          {!error && results.length === 0 && (
            <Card className="border-border">
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                {t(
                  "No results found. Try different keywords.",
                  "Aucun résultat trouvé. Essayez d'autres mots-clés."
                )}
              </CardContent>
            </Card>
          )}

          {results.map((r, i) => {
            const borderColors = ["border-l-primary", "border-l-secondary", "border-l-accent"];
            return (
              <Card key={r.id} className={`border-l-4 ${borderColors[i % borderColors.length]} transition-shadow hover:shadow-md`}>
                <CardContent className="py-4">
                  {r.section_title && (
                    <h3 className="mb-1.5 text-sm font-semibold text-foreground">
                      {r.section_title}
                    </h3>
                  )}
                  <p
                    className="text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: "…" + highlightMatch(r.snippet) + "…",
                    }}
                  />
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <FileText className="h-2.5 w-2.5" />
                    {r.document_name}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SearchSection;
