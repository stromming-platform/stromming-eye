# Stromming-eye

Frontend repo for the stromming streaming project.

---

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Docs

This project uses Sveltekit, the docs can be found here: https://kit.svelte.dev/docs/introduction

TypeScript docs can be found here: https://www.typescriptlang.org/docs/

Tailwinds docs can be found here: https://tailwindcss.com/docs/installation

### Comments

When commenting code *(which you should)*, please prefix important comments with the following: 
- **FIXME:** Things that need to be fixed ASAP.
- **IDEA:** Ideas for general improvements or similar.
- **NOTE:** Comments that describe important features of the code.
- **TODO:** Things that need to be done, but are not that urgent.

Examples: 
`// TODO: Implement function X when we have implemented feature Y`
`// NOTE: This functions does the thing to the stuff at runtime`

This will make it easier for others to navigate the code and find important comments.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
