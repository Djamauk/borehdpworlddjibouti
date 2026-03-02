
CREATE OR REPLACE FUNCTION public.search_documents(search_query text, lang text)
 RETURNS TABLE(id uuid, section_title text, content text, document_name text, section_order integer, snippet text)
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  words TEXT[];
  word TEXT;
  pattern TEXT;
  sanitized_word TEXT;
BEGIN
  -- Split query into words, filter out short/common words
  SELECT array_agg(w) INTO words
  FROM unnest(string_to_array(lower(trim(search_query)), ' ')) AS w
  WHERE length(w) >= 3
    AND w NOT IN ('the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'has', 'her', 'was', 'one', 'our', 'out', 'who', 'how', 'what', 'when', 'where', 'which', 'that', 'this', 'with', 'from', 'they', 'been', 'have', 'were', 'said', 'each', 'she', 'does', 'their', 'will', 'other', 'about', 'many', 'then', 'them', 'these', 'some', 'would', 'into', 'more', 'its', 'also', 'after', 'les', 'des', 'une', 'que', 'est', 'pour', 'dans', 'par', 'sur', 'avec', 'son', 'ses', 'aux', 'ont', 'été', 'qui', 'pas', 'mais', 'plus', 'comme', 'cette', 'tout', 'fait', 'entre', 'nous', 'vous', 'être', 'avoir');

  IF words IS NULL OR array_length(words, 1) IS NULL THEN
    -- Fallback: use original query if no meaningful words found
    sanitized_word := replace(replace(replace(search_query, '!', '!!'), '%', '!%'), '_', '!_');
    pattern := '%' || sanitized_word || '%';
    RETURN QUERY
      SELECT ds.id, ds.section_title, ds.content, ds.document_name, ds.section_order,
        CASE
          WHEN position(lower(search_query) in lower(ds.content)) > 0 THEN
            substring(ds.content FROM greatest(1, position(lower(search_query) in lower(ds.content)) - 100) FOR 200 + length(search_query))
          ELSE left(ds.content, 200)
        END AS snippet
      FROM public.document_sections ds
      WHERE ds.language = lang
        AND ds.content ILIKE pattern ESCAPE '!'
      ORDER BY ds.section_order;
    RETURN;
  END IF;

  -- Build a query that matches ANY word, ranked by number of matches
  RETURN QUERY
    SELECT ds.id, ds.section_title, ds.content, ds.document_name, ds.section_order,
      CASE
        WHEN position(lower(words[1]) in lower(ds.content)) > 0 THEN
          substring(ds.content FROM greatest(1, position(lower(words[1]) in lower(ds.content)) - 100) FOR 200 + length(words[1]))
        ELSE left(ds.content, 200)
      END AS snippet
    FROM public.document_sections ds
    WHERE ds.language = lang
      AND (
        SELECT bool_or(ds.content ILIKE '%' || replace(replace(replace(w, '!', '!!'), '%', '!%'), '_', '!_') || '%' ESCAPE '!')
        FROM unnest(words) AS w
      )
    ORDER BY (
      SELECT count(*) FROM unnest(words) AS w
      WHERE ds.content ILIKE '%' || replace(replace(replace(w, '!', '!!'), '%', '!%'), '_', '!_') || '%' ESCAPE '!'
    ) DESC, ds.section_order
    LIMIT 10;
END;
$function$;
