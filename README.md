# Materials & Furniture Selection Assistant

A small single-page app for picking a room, choosing materials and furniture from a shared palette, seeing a live summary with a **mock** cost estimate, and generating a **mock** “AI” narrative from rule-based logic.

---

## Project overview

- **Room selection**
- **Summary**
- **Basic cost calculation**
- **Mock AI summary**

There is **no backend** and **no real AI API**; everything runs in the browser.

---

## Technologies used

| Area | Stack |
|------|--------|
| UI framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Build tool | [Vite 4](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) + `src/styles/global.css` |

---

## Setup instructions

1. **Prerequisites**  
   - **Node.js** (used with **Node 16+**; newer version is fine).  
   - **npm**.

2. **Install dependencies**

   ```bash
   cd feeldx-room-assistant
   npm install
   ```

3. **Production build** (optional, for deployment)

   ```bash
   npm run build
   ```

   Output is in `dist/`. Upload the **contents** of `dist/` to your static host’s web root.

---

## How to run the application locally

**Development** (hot reload):

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## Limitations and possible improvements

**Limitations**

- Costs are **mock** fixed amounts per material, not scaled by room size or market.
- **AI summary** is **rule-based text**, not connected to an API.
- **One room at a time** in the UI: cost and summary are for the **currently selected** room only, not a whole-home rollup.

**Possible improvements**

- Replace or augment mock summary with a real LLM endpoint (with auth and rate limits).
- Add **Vitest** + **Vue Test Utils** for utils like `generateAiSummary` and `estimateRoomMaterialsCost`.

