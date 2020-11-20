<template>
  <div class='bg-white p-4'>
    <nuxt-link
      class='mb-4 flex items-center'
      to='/'
    >
      <i class="material-icons">keyboard_arrow_left</i>

      Back to TOP
    </nuxt-link>

    <div
      class='ml-6 flex flex-col'
    >
      <h3 class='text-xl'>{{article.title}}</h3>

      <div class='text-xs text-gray-400'>
        <span>{{formatDate(article.createdAt)}}</span>
        <a class='ml-1 font-bold hover:underline' :href='article.author.githubUrl'>By {{article.author.name}}</a>
      </div>

      <div class='my-6 main-content border-t-2' v-html='getSanitizedHtml(article.content)'></div>
    </div>
  </div>
</template>

<script>
  import xss from 'xss'
  import format from 'date-fns/format'
  import parseISO from 'date-fns/parseISO'

  export default {
    async asyncData ({ params, $axios }) {
      const { id } = params
      const article = await $axios.$get(`http://localhost:3000/api/articles/${id}?_expand=author`)
      return { article }
    },

    methods: {
      getSanitizedHtml (html) {
        return xss(html)
      },

      formatDate (date) {
        return format(parseISO(date), 'yyyy/MM/dd HH:mm:SS')
      }
    }
  }
</script>
