<template>
  <M-card :icon="icon" :title="title">
    <div class="card-body pt-3">
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{active: active === idx}"
          v-for="(category,idx) in categories"
          :key="idx"
          @click=" $refs.list.$swiper.slideTo(idx)"
        >
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list" :options="{autoHeight: true}"  @slide-change="() => active = $refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </M-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>