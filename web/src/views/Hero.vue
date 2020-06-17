<template>
  <div class="page-hero">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-dary p-3">
        <div>{{model.title}}</div>
        <h2>{{model.name}}</h2>
        <div>{{model.categories.map(it => it.name).join('/')}}</div>
        <div>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required: true}
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>


<style lang="scss">
.page-hero {
  .top {
    height: 50vw;
    background-size: auto 100%;
    background: #fff no-repeat center center;
  }
}
</style>