
-- Create document_sections table
CREATE TABLE public.document_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('en', 'fr')),
  section_title TEXT,
  content TEXT NOT NULL,
  document_name TEXT NOT NULL,
  section_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for search performance
CREATE INDEX idx_document_sections_language ON public.document_sections (language);

-- Enable RLS
ALTER TABLE public.document_sections ENABLE ROW LEVEL SECURITY;

-- Public read-only access
CREATE POLICY "Public read access for document sections"
  ON public.document_sections
  FOR SELECT
  USING (true);

-- Search function: keyword match with snippet extraction
CREATE OR REPLACE FUNCTION public.search_documents(search_query TEXT, lang TEXT)
RETURNS TABLE (
  id UUID,
  section_title TEXT,
  content TEXT,
  document_name TEXT,
  section_order INTEGER,
  snippet TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pattern TEXT;
BEGIN
  pattern := '%' || search_query || '%';
  RETURN QUERY
    SELECT
      ds.id,
      ds.section_title,
      ds.content,
      ds.document_name,
      ds.section_order,
      -- Extract ~200 chars around the first match as a snippet
      CASE
        WHEN position(lower(search_query) in lower(ds.content)) > 0 THEN
          substring(
            ds.content
            FROM greatest(1, position(lower(search_query) in lower(ds.content)) - 100)
            FOR 200 + length(search_query)
          )
        ELSE
          left(ds.content, 200)
      END AS snippet
    FROM public.document_sections ds
    WHERE ds.language = lang
      AND ds.content ILIKE pattern
    ORDER BY ds.section_order;
END;
$$;
