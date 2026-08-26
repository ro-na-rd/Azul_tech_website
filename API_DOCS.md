# Azul Tech - API Documentation (Sanity CMS)

This document serves as the "Swagger" reference for the frontend integration with Sanity CMS.

---

## 1. Hero & Bento Grid
**Service Function:** `getHeroData()`  
**Hook:** `useHero()`  
**Description:** Fetches the main landing page header content, the bento grid cards, and the featured interview card.

### Response Schema
```typescript
interface HeroResponse {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  bentoCards: Array<{
    type: string;
    title: string;
    image: SanityImage; // Use urlFor(image).url() to get the link
    link: string;
    isTall: boolean;
    tag?: string;
    date?: string;
  }>;
  interviewCard: {
    category: string;
    series: string;
    title: string;
    image: SanityImage;
    videoUrl: string;
  };
}
```

---

## 2. Azul Stack Layers
**Service Function:** `getLayersData()`  
**Hook:** `useLayers()`  
**Description:** Fetches the five sovereign layers of the Azul Stack.

### Response Schema
```typescript
interface LayersResponse {
  layers: Array<{
    title: string;
    description: string;
    image: SanityImage;
  }>;
}
```

---

## 3. Global Configuration & Utils
**Utility:** `urlFor(source)`  
**Description:** Converts a Sanity Image object into a direct HTTP URL string.

**Usage:**
```tsx
<img src={urlFor(item.image).url()} />
```

---

## 💡 How to Test Queries (The "Try it Out" button)
1. Open **Sanity Studio** (`http://localhost:3333`).
2. Go to the **Vision** tab.
3. Paste any query from `src/services/sanity.ts` into the editor.
4. Click **Fetch** to see the live JSON response.
5. Click **"Copy Query URL"** to get a raw HTTP endpoint you can open in your browser or Postman.

---

## 🛠 Project Constants
- **Project ID:** `s44ol3h7`
- **Dataset:** `production`
- **API Version:** `2024-04-28`
