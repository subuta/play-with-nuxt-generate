// SEE: https://github.com/nuxt-community/express-template/blob/master/template/api/index.js
const express = require('express')
const jsonServer = require('json-server')

const main = require.main === module

// Create express instance
const app = express()

if (main) {
  // When run as main(production), need to enable cors for preview mode.
  app.use(require('cors')())
}

// When run as main(production), needs to prefix `/api` manually.
// Nuxt.js will prefix `/api` based on "nuxt.config.js"'s serverMiddleware configuration otherwise.
app.use(main ? '/api' : '/', jsonServer.router('db.json'))

// Export express app
module.exports = app

// Start standalone server if directly running
if (main) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
