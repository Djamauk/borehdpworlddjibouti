# Building in 4 stages using only free credits:

# Bilingual Court Case Q&A Web App

## Boreh, DP World & Government of Djibouti

### Overview

A bilingual (English/French) web app that provides information about the London court case involving Boreh, DP World, and the Government of Djibouti. Visitors can browse pre-listed FAQs or search for specific information, with all answers sourced from two uploaded PDF documents (one per language).

---

### Pages & Features

#### 1. Landing Page

- A clear, professional header with the case title
- Language toggle button (English 🇬🇧 / French 🇫🇷) prominently placed in the top navigation
- Brief introduction about what the app covers
- Two ways to find information: FAQ section and a search bar

#### 2. FAQ Section

- A curated list of common questions about the case, displayed as an expandable accordion
- Questions and answers switch language when the user toggles between English and French
- Initially populated with placeholder questions that you can customize after reviewing

#### 3. Search Feature

- A search bar where visitors type questions or keywords
- Keyword-based search that scans through the stored document content
- Results display relevant excerpts/passages from the documents
- Search works in whichever language is currently selected

#### 4. Language Toggle

- Persistent toggle in the navigation bar (EN / FR)
- Switching language updates all UI text, FAQ content, and search results to pull from the corresponding language document
- User's language preference is remembered during the session

---

### Backend (Lovable Cloud)

- **Database**: Store the extracted text content from your two PDF documents (English and French versions), broken into searchable sections
- **Search**: Keyword matching against stored document content to find relevant passages
- You will upload the two PDFs after the app is built, and the content will be stored for searching

---

### Design

- Clean, professional layout suitable for legal/informational content
- Neutral color palette with clear typography
- Mobile-responsive design
- Simple navigation: Home, FAQ, Search