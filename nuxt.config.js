import _ from 'lodash'
import axios from 'axios'

export default {
  target: 'static',
  serverMiddleware: {
    '/api': '~/api'
  },
  plugins: ['plugins/preview.client.js'],
  modules: ['@nuxtjs/axios'],
  generate: {
    async routes () {
      // Fetch all articles and generate each page.
      const articleRoutes = await axios.get('http://localhost:3000/api/articles').then(({ data: articles }) => {
        return _.map(articles, article => {
          return { route: `/${article.id}` }
        })
      })
      return [
        { route: '/' },
        ...articleRoutes
      ]
    }
  },
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
