<template>
  <client-only placeholder="Loading...">
    <div class="btn-slide">
      <Splide :options="options">
        <SplideSlide v-for="(category, i) in categories" :key="category.id">
          <button
            :class="[
              category.active ? 'btn btn-light' : 'btn btn-outline-light',
            ]"
            type="button"
            @click="setValue(category.value, i)"
          >
            {{ category.marque }}
          </button>
        </SplideSlide>
      </Splide>
    </div>
  </client-only>
</template>

<script>
import '@splidejs/splide/dist/css/splide.min.css'

export default {
  name: 'BtnCategoriesComp',
  setup() {
    const options = {
      perPage: 5,
      pagination: false,
      gap: '1rem',
      rewind: true,
      breakpoints: {
        992: {
          perPage: 4,
        },
        768: {
          perPage: 3,
        },
        576: {
          perPage: 2,
        },
      },
    }

    return { options }
  },
  data() {
    return {
      categories: [
        { id: 1, marque: 'FOR YOU', value: 'all', active: true },
        { id: 2, marque: 'OPPO', value: 'oppo', active: false },
        { id: 3, marque: 'SAMSUNG', value: 'samsung', active: false },
        { id: 4, marque: 'I PHONE', value: 'iphone', active: false },
        { id: 5, marque: 'XIAOMI', value: 'xiaomi', active: false },
        { id: 6, marque: 'ASUS', value: 'asus', active: false },
        { id: 7, marque: 'INFINIX', value: 'infinix', active: false },
      ],
    }
  },
  methods: {
    setValue(cat, i) {
      this.categories.map((e) => {
        return (e.active = false)
      })
      this.categories[i].active = true
      this.$emit('changeValue', cat)
    },
  },
}
</script>

<style>
.btn-slide {
  margin-bottom: 50px;
  width: 100%;
}

.btn-slide .splide {
  width: 100%;
}

.btn-slide .splide .splide__slide button {
  width: 100%;
}
</style>
