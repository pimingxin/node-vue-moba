<template>
  <div class="page-article">
    <div class="d-flex py-3 px-1 border-bottom">
      <div class="iconfont icon-Back">《</div>
      <strong class="flex-1">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">
        2019-06-19
      </div>
    </div>
    <div v-html="model.body" class="px-3 fs-lg body"></div>
    <div>
      <router-link 
        tag="div"
        :to="`/articles/${item._id}`"
        v-for="item in model.related"
        :key="item._id"
        >
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  watch: {
    id(){
      this.fetch()
    }
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`)
      this.model = res.data
      console.log(this.model)
    }
  },
  created() {
    this.fetch()
  },
};
</script>

<style lang="scss">
  .page-article {
    .body{
      .img {
        max-width: 100%;
        height: auto;
      }
      .iframe {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
