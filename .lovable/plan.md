

## Database Setup for PDF Storage and Keyword Search

### Schema

One table to store document sections:

```text
document_sections
├── id (uuid, primary key)
├── language (text, 'en' or 'fr')
├── section_title (text, nullable)
├── content (text, the extracted text)
├── document_name (text, source filename)
├── section_order (integer, ordering)
├── created_at (timestamptz)
```

### Search

- Create a PostgreSQL function `search_documents(query text, lang text)` that performs case-insensitive keyword matching against the `content` column using `ILIKE`
- Returns matching sections with a relevance snippet (surrounding text around the match)

### Edge Function

- `search-documents`: accepts `{ query, language }`, calls the database search function, returns matching excerpts

### Frontend Integration

- Update `SearchSection.tsx` to call the edge function and display results as a list of matching passages

### RLS

- Public read access (no auth needed for a public informational site)
- No insert/update/delete from client — data managed via migrations or admin

### Steps

1. Create migration for `document_sections` table with RLS (public select)
2. Create `search_documents` database function
3. Create `search-documents` edge function
4. Update `SearchSection.tsx` to call the edge function and render results

