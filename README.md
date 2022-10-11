# Strømming-eye

Requires npm & npx

To run just:
```
npm run dev
```

And to build tailwindcss from app.css use:

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
