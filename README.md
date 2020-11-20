# play-with-nuxt-generate

Nuxt.js SSG + serverMiddleware(API routes) example with quite hacky workaround.

At current `v2.14.7` version. `nuxt generate` starts nuxt server on random port. and we cannot have direct access to Nuxt.js instance.
I added workaround for this issue using custom module. SEE [that module](./modules/nuxt-generate-helper/index.js) for implementation.

### How this works.

What this module does is waiting for nuxt's `listen` hook, and keep listener port on global environment variable (I know, this is quite hacky solution :sob: ).
And when we need to access API (of localhost), then get that port from global environment variable.

#### Enable custom module

```jsx
modules: [
  '~/modules/nuxt-generate-helper'
]
```

#### Import and use `getOrigin` helper at "generate.routes" function.

```jsx
// at "nuxt.config.js"
import { getOrigin } from './modules/nuxt-generate-helper'

export default {  
  generate: {
    async routes () {
      // Use getOrigin to get correct origin part of url on each mode(SSG, SSR, CSR).
      const articleRoutes = await axios.get(`${getOrigin()}/api/articles`)
    }
  }
}
```

#### Use `$origin` helper at asyncData

```jsx
// Use $origin to get correct origin part of url on each mode(SSG, SSR, CSR).
const articles = await $axios.$get(`${$origin()}/api/articles?_expand=author`)
```

### References

- SEE: https://github.com/nuxt/nuxt.js/issues/7597#issuecomment-652961387
- SEE: https://github.com/nuxt/nuxt.js/blob/v2.14.7/packages/cli/src/commands/generate.js#L105

### How to develop

```bash
# Install dependencies
npm i

# Start development server(with API Routes)
npm run dev

open http://localhost:3000

# Generate static assets(with starting API server in background)
npm run generate

# Open production server(only serves static assets)
npm start

# Open page with preview mode enabled.
# Then modify `db.json` and reload page for testing preview mode's behavior.
open http://localhost:4000/awesome-article-of-nuxtjs-part-1?preview=true
```
