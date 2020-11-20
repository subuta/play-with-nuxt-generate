import _ from 'lodash'
import axios from 'axios'

import { getOrigin } from './modules/nuxt-generate-helper'

export default {
  target: 'static',
  serverMiddleware: {
    '/api': '~/api'
  },
  modules: [
    '@nuxtjs/axios',
    '~/modules/nuxt-generate-helper'
  ],
  watch: [
    './db.json'
  ],
  generate: {
    async routes () {
      // Fetch all articles and generate each page.
      const articleRoutes = await axios.get(`${getOrigin()}/api/articles`).then(({ data: articles }) => {
        return _.map(articles, article => {
          return { route: `/${article.slug}` }
        })
      })
      return [
        { route: '/' },
        ...articleRoutes
      ]
    }
  },
  plugins: ['plugins/preview.client.js'],
  head: {
    script: [],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
      },
    ]
  },
  css: [
    '~/main.css'
  ]
}
