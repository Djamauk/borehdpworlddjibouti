
CREATE OR REPLACE FUNCTION public.search_documents(search_query text, lang text)
 RETURNS TABLE(id uuid, section_title text, content text, document_name text, section_order integer, snippet text)
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  sanitized_query TEXT;
  pattern TEXT;
BEGIN
  -- Escape ILIKE special characters to prevent pattern injection
  sanitized_query := replace(replace(replace(search_query, '!', '!!'), '%', '!%'), '_', '!_');
  pattern := '%' || sanitized_query || '%';
  RETURN QUERY
    SELECT
      ds.id,
      ds.section_title,
      ds.content,
      ds.document_name,
      ds.section_order,
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
      AND ds.content ILIKE pattern ESCAPE '!'
    ORDER BY ds.section_order;
END;
$function$;
