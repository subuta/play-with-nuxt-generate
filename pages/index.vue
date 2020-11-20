<template>
  <div class='bg-white p-4'>
    <ul class='my-6 ml-6'>
      <nuxt-link
        tag='li'
        v-for='article in articles'
        class='mb-8 flex flex-col'
        :to='`/${article.id}`'
      >
        <h3 class='text-xl hover:underline'>{{article.title}}</h3>

        <span class='text-xs font-bold text-gray-400'>{{formatDate(article.createdAt)}}</span>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import parseISO from 'date-fns/parseISO'

  export default {
    async asyncData ({ $axios }) {
      const articles = await $axios.$get(`http://localhost:3000/api/articles`)
      return { articles }
    },

    methods: {
      formatDate (date) {
        return format(parseISO(date), 'yyyy/MM/dd HH:mm:SS')
      }
    }
  }
</script>
