<template>
  <div class='bg-white p-4'>
    <ul class='my-6 ml-6'>
      <li
        class='mb-8'
        v-for='article in articles'
        :key='article.id'
      >
        <nuxt-link
          class='flex flex-col'
          :to='`/${article.slug}`'
        >
          <h3 class='text-xl hover:underline'>{{article.title}}</h3>
        </nuxt-link>

        <div class='text-xs text-gray-400'>
          <span>{{formatDate(article.createdAt)}}</span>
          <a class='ml-1 font-bold hover:underline' :href='article.author.githubUrl'>By {{article.author.name}}</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import parseISO from 'date-fns/parseISO'

  export default {
    async asyncData ({ $axios, $origin }) {
      const articles = await $axios.$get(`${$origin()}/api/articles?_expand=author`)
      return { articles }
    },

    methods: {
      formatDate (date) {
        return format(parseISO(date), 'yyyy/MM/dd HH:mm:SS')
      }
    }
  }
</script>
