# CampusConnect — NIT3274 Part B

**Student/teacher communication platform with AI Study Assistant**

Group members: Chowdhury Yousha Ibne Alam (s8132127) · Dan Goddard (s8090152)

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

## AI Assistant setup

The AI Study Assistant uses the Anthropic Claude API.

1. Get your API key from https://console.anthropic.com
2. When you first visit the **AI Assistant** page, a modal will ask for your key
3. Enter your key — it's saved in localStorage for the session
4. The assistant is live and ready to help students

> The key is stored only in your browser's localStorage. It is sent directly to Anthropic's API and nowhere else.

## Pages

| Route | Page |
|---|---|
| `/` | Landing page — hero, features, how it works |
| `/services` | Pricing — Free, Premium (PayPal), Institution |
| `/ai-assistant` | Live AI Study Assistant (Claude API) |
| `/about` | Team, mission, values, timeline |
| `/contact` | Contact form, map, social links |

## Required criteria checklist

- [x] ABN: 12 345 678 901 (displayed in footer and contact page)
- [x] ACN: 123 456 789 (displayed in footer)
- [x] Contact Us page with form
- [x] Online payment (PayPal button on Premium pricing)
- [x] Marketing and promotion content
- [x] List of available services
- [x] Social media links (Facebook, Instagram, LinkedIn, TikTok, Twitter)
- [x] Google Maps embed (Contact page)
- [x] Attractive graphics and illustrations
- [x] Disclaimer banner on all pages
- [x] LLM-based application (Claude AI Study Assistant — +10% bonus)

## Build for submission

```bash
npm run build
# Output in /dist — zip and submit
```
