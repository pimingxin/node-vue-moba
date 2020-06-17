<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" style="height: 300px" src="../assets/image/2.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" style="height: 300px" src="../assets/image/2.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" style="height: 300px" src="../assets/image/2.jpg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-drak-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of nav icons -->

    <M-L-card icon="icon-test" title="新闻资讯" :categories="dataCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news,idx) in category.newsList" 
        :key="idx">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="fs-sm text-grey-1">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </M-L-card>

    <M-L-card icon="icon-test" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link 
          tag="div"
          class="p-2 text-center" 
          style="width: 20%;" 
          v-for="(hero,idx) in category.heroList" 
          :key="idx"
          :to="`heroes/${hero._id}`">
            <img :src="hero.avatar" class="w-100"/>
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </M-L-card>
  </div>
</template>


<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOptions: {
        autoplay: { delay: 1500 },
        pagination: {
          el: ".pagination-home"
        }
        // Some Swiper option/callback...
      },
      dataCats: [],
      heroCats: []
    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    async fetchNewsCats() {
      let res = await this.$http.get("news/list");
      this.dataCats = res.data;
    },
    async fetchHeroCats() {
      let res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>