
CREATE OR REPLACE FUNCTION public.search_documents(search_query text, lang text)
 RETURNS TABLE(id uuid, section_title text, content text, document_name text, section_order integer, snippet text)
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  words TEXT[];
  sanitized_word TEXT;
  pattern TEXT;
BEGIN
  -- Split query into words, strip punctuation, filter out short/common words
  SELECT array_agg(clean_word) INTO words
  FROM (
    SELECT regexp_replace(w, '[^a-zA-ZÀ-ÿ0-9]', '', 'g') AS clean_word
    FROM unnest(string_to_array(lower(trim(search_query)), ' ')) AS w
  ) sub
  WHERE length(clean_word) >= 3
    AND clean_word NOT IN ('the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'has', 'her', 'was', 'one', 'our', 'out', 'who', 'how', 'what', 'when', 'where', 'which', 'that', 'this', 'with', 'from', 'they', 'been', 'have', 'were', 'said', 'each', 'she', 'does', 'their', 'will', 'other', 'about', 'many', 'then', 'them', 'these', 'some', 'would', 'into', 'more', 'its', 'also', 'after', 'les', 'des', 'une', 'que', 'est', 'pour', 'dans', 'par', 'sur', 'avec', 'son', 'ses', 'aux', 'ont', 'été', 'qui', 'pas', 'mais', 'plus', 'comme', 'cette', 'tout', 'fait', 'entre', 'nous', 'vous', 'être', 'avoir');

  IF words IS NULL OR array_length(words, 1) IS NULL THEN
    -- Fallback: use original query stripped of punctuation
    sanitized_word := regexp_replace(search_query, '[^a-zA-ZÀ-ÿ0-9 ]', '', 'g');
    sanitized_word := replace(replace(replace(trim(sanitized_word), '!', '!!'), '%', '!%'), '_', '!_');
    pattern := '%' || sanitized_word || '%';
    RETURN QUERY
      SELECT ds.id, ds.section_title, ds.content, ds.document_name, ds.section_order,
        CASE
          WHEN position(lower(sanitized_word) in lower(ds.content)) > 0 THEN
            substring(ds.content FROM greatest(1, position(lower(sanitized_word) in lower(ds.content)) - 100) FOR 200 + length(sanitized_word))
          ELSE left(ds.content, 200)
        END AS snippet
      FROM public.document_sections ds
      WHERE ds.language = lang
        AND ds.content ILIKE pattern ESCAPE '!'
      ORDER BY ds.section_order
      LIMIT 10;
    RETURN;
  END IF;

  -- Match ANY word, ranked by number of word matches
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
