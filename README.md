# 🚀 Demo Store - Next.js + Laravel PHP

Un e-commerce demo completamente funzionante con Next.js (frontend) + Laravel (backend) con mock data e ottimizzazioni SEO.

## 📋 Requisiti

- Node.js 18+
- PHP 8.2+
- Composer
- npm

## 🎯 Caratteristiche Implementate

### ✅ Backend (Laravel)

- **Mock Data Completi**: Categorie e prodotti con informazioni dettagliate
- **API RESTful**: Endpoint per categorie, prodotti e singoli prodotti
- **CORS Configurato**: Permette richieste dal frontend Next.js
- **Gestione Errori**: Risposte appropriate per errori 404

### ✅ Frontend (Next.js)

- **API Routes Locali**: Fallback automatico quando il backend non è disponibile
- **Server-Side Rendering**: Rendering lato server per migliori performance SEO
- **Metadata Dinamico**: Titoli e descrizioni ottimizzati per ogni pagina
- **Sitemap.xml**: Mappa del sito per i motori di ricerca
- **robots.txt**: Indicazioni per i bot dei motori di ricerca

### ✅ SEO Ottimizzato

- Metadata per Open Graph (Facebook/social media)
- Twitter Card metadata
- Canonical URLs
- HTML Semantico (`<article>`, `<nav>`, `<section>`)
- Lazy loading delle immagini
- Breadcrumbs per la navigazione

### ✅ Layout & UX

- Design responsive con Tailwind CSS
- Header e Footer consistenti
- Navigazione intuitiva
- Card prodotti con immagini e prezzi
- Pagine di dettaglio con breadcrumb

## 📁 Struttura Progetto

```
laravel-next-test/
├── backend/          # Laravel PHP
│   ├── app/Http/Controllers/ProductController.php
│   ├── routes/web.php
│   └── config/cors.php
└── frontend/         # Next.js
    ├── src/app/
    │   ├── page.tsx (Homepage)
    │   ├── category/[category]/page.tsx (Pagina Categoria)
    │   ├── product/[id]/[slug]/page.tsx (Pagina Prodotto)
    │   ├── api/ (API routes locali)
    │   ├── layout.tsx
    │   └── sitemap.ts
    ├── src/components/
    │   ├── Header.tsx
    │   └── Footer.tsx
    └── public/robots.txt
```

## 🚀 Come Avviare

### 1. Backend (Laravel)

```bash
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

Il backend sarà disponibile su: **http://127.0.0.1:8000**

**Endpoint disponibili:**

- `GET /categories` - Lista categorie
- `GET /products` - Lista prodotti (con filtro ?category_id=1)
- `GET /products/{id}` - Dettaglio prodotto

### 2. Frontend (Next.js)

```bash
cd frontend
npm install  # se non fatto
npm run dev
```

Il frontend sarà disponibile su: **http://localhost:3000**

## 🔄 Come Funziona l'Integrazione

### Flusso di Dati

```
Browser
  ↓
Next.js (3000)
  ↓
Laravel API (8000) ← [Se disponibile]
  ↓
Ritorna dati (JSON)

// Se il backend non è disponibile
Next.js API Routes (/api/*) usano i mock data locali
```

### API Service (`src/services/api.ts`)

Il file API ha un **interceptor** che:

1. Tenta di raggiungere il backend Laravel su `http://127.0.0.1:8000`
2. Se non disponibile, usa automaticamente le API routes locali (`/api/...`)
3. Gestisce timeout di 5 secondi

## 📝 Mock Data

I mock data sono disponibili in due posti:

### Backend (Laravel)

File: `backend/app/Http/Controllers/ProductController.php`

```php
private $products = [
    [
        "id" => 1,
        "name" => "Nike Air Max 90",
        "slug" => "nike-air-max-90",
        "category_id" => 1,
        "description" => "...",
        "price" => 129.99,
        "image" => "/products/nike-air-max-90.jpg",
        "seoTitle" => "Nike Air Max 90 - Scarpe Sportive Originali | Demo Store",
        "seoDescription" => "..."
    ],
    // ...
]
```

### Frontend (Next.js)

File: `frontend/src/app/api/` per fallback locale

## 🔍 SEO Implementato

### 1. Metadata Dinamico

- **Homepage**: Metadata globale con Open Graph
- **Categoria**: Metadata specifico per categoria
- **Prodotto**: Metadata con immagine del prodotto

Esempio:

```tsx
export const metadata: Metadata = {
    title: "Nike Air Max 90 - Scarpe Sportive Originali | Demo Store",
    description: "Acquista le iconiche Nike Air Max 90...",
    openGraph: {
        title: "Nike Air Max 90",
        images: [{ url: "/products/nike-air-max-90.jpg" }],
    },
};
```

### 2. Sitemap (`sitemap.ts`)

- Homepage (priority: 1.0)
- Categorie (priority: 0.8)
- Prodotti (priority: 0.7)
- Aggiornato automaticamente

### 3. Robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: http://localhost:3000/sitemap.xml
```

### 4. HTML Semantico

- `<article>` per prodotti e sezioni
- `<nav>` per navigazione e breadcrumb
- `<section>` per sezioni di contenuto
- `<h1>`, `<h2>`, `<h3>` strutturati correttamente

### 5. Canonical URLs

```tsx
alternates: {
    canonical: "http://localhost:3000/product/1/nike-air-max-90";
}
```

## 🛠️ Variabili d'Ambiente

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Commenta questa riga per usare solo le API locali:

```
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Backend (`.env`)

Il backend funziona con configurazione di default.

## 📱 Pagine Disponibili

### Homepage

```
http://localhost:3000/
```

- Mostra categorie disponibili
- Features section con vantaggi
- SEO-optimized

### Categoria

```
http://localhost:3000/category/shoes
http://localhost:3000/category/hoodies
```

- Lista prodotti per categoria
- Filtrato da API backend
- Breadcrumb di navigazione

### Prodotto

```
http://localhost:3000/product/1/nike-air-max-90
http://localhost:3000/product/2/adidas-hoodie-classic
http://localhost:3000/product/3/puma-running-shoe
http://localhost:3000/product/4/nike-zip-hoodie
```

- Dettagli completi del prodotto
- Immagine, prezzo, descrizione
- Pulsante "Aggiungi al Carrello" (demo)
- Carousel breadcrumb

## 🧪 Testing

### Test API Backend

```bash
curl http://127.0.0.1:8000/categories
curl http://127.0.0.1:8000/products
curl http://127.0.0.1:8000/products/1
```

### Test API Frontend (fallback locale)

```bash
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/products
curl http://localhost:3000/api/products/1
```

## 📈 Prossimi Step per Produzione

1. **Database Reale**
    - Migrare da mock data a Eloquent models
    - Setup database (MySQL/PostgreSQL)

2. **Autenticazione**
    - Implementare login/signup
    - JWT o session-based auth

3. **E-commerce Features**
    - Carrello acquisti
    - Pagamento (Stripe, PayPal)
    - Ordini e tracking

4. **Performance**
    - CDN per immagini
    - Caching con Redis
    - Image optimization con Next.js Image component

5. **Monitoring**
    - Analytics (Google Analytics 4)
    - Error tracking (Sentry)
    - Performance monitoring

## 📞 Supporto

Per domande o problemi:

1. Verifica che entrambi i server siano in esecuzione
2. Controlla i log nel terminale
3. Verifica che le porte 3000 e 8000 siano disponibili

## 📄 Licenza

Demo per scopi educativi e di sviluppo.

---

**Buono sviluppo! 🎉**
