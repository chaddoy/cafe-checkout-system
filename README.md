# Cafe Checkout System

A Vite + React + TypeScript single‑page app that powers a cafe checkout experience:

- Loads products from a mocked API (`db.json`)
- Deduplicates menu items, offers fuzzy search and sorting
- Supports drink sizes with price adjustments
- Provides a full cart flow (quantity adjustments, service charge, checkout receipts)

---

## Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the mock API (JSON Server or equivalent)**

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   The UI expects `http://localhost:3000/products`.

3. **Start the web app**

   ```bash
   npm run dev
   ```

   Visit the URL printed by Vite (default `http://localhost:5173`).

4. **Run type-check + production build (optional)**

   ```bash
   npm run build
   ```

5. **Run tests**

   ```bash
   npm run test
   ```

   Vitest + React Testing Library power the unit/component suite.

---

## Design Decisions

### State Shape

- **Redux Toolkit store** with two slices:
  - `product`: holds fetched items, loading/error flags, search query, and sort key.
  - `cart`: stores normalized cart entries (`CartItem`), subtotal, service charge, total, and the most recent receipt.
- Cart items are keyed by `productId + size` so identical drinks of the same size merge while different sizes stay separate.
- Types live in `src/types` for reuse across slices, hooks, and UI.

### Component Structure & Hooks

- **`App`** wires together header search, sorting, cart summary, and product grid.
- **Presentation components** (`ProductItem`, `ProductList`, `SortBar`, `CartSummary`, `Header`) stay lean and receive typed props.
- **Custom hooks** isolate logic:
  - `useSearch` (dedupe + fuzzy search),
  - `useSort` (memoized sorting),
  - `useProductItem` (size selection + add-to-cart),
  - `useCart` (quantity changes, removal, checkout).
- **Utilities**:
  - `utils/products.ts` centralizes dedupe, fuzzy search, and size-based pricing adjustments.
  - `utils/cart.ts` keeps subtotal/service-charge math and ID helpers reusable from both the slice and hooks.

### Trade-offs

- **Redux over React Query**: Chosen for predictable state transitions and easier async thunk wiring; a data-fetching library could simplify caching but felt heavier for this scope.
- **Client-side receipts**: Receipts live only in memory (`lastReceipt`); persisting them would require a backend or local storage.
- **Single JSON server**: Fast to iterate, but lacks auth and business rules you’d expect from a real POS service.
- **Sizing logic in code**: Price adjustments are hard-coded (e.g., ±$0.50). A real system would likely pull this from the API or a CMS.

---

## Known Limitations

- **No persistence**: Reloading the page clears the cart and receipt.
- **No error UI**: Fetch failures are tracked in state but aren’t surfaced visually yet.
- **Accessibility gaps**: Main flows have basic semantics, but full keyboard navigation and screen-reader cues still need refinement.
- **Testing coverage**: Vitest targets cart logic and CartSummary, but the rest of the UI/state remains untested.
- **Currency & locale**: Values are formatted as USD without localization or multi-currency support.
- **Single user**: No user accounts, order history, or concurrent session handling.
