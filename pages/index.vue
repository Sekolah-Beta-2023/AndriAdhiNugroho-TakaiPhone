<template>
  <div class="homepage">
    <CarouselComp />
    <PromoComp />
    <div class="shop container text-light">
      <BtnCategoriesComp @changeValue="changeValue" />
      <div
        v-if="card.length"
        class="list d-flex justify-content-center gap-3 flex-wrap mb-5"
      >
        <NuxtLink
          v-for="cardItem in card"
          :to="'/detail/' + cardItem._id"
          :key="cardItem.id"
          class="text-decoration-none"
        >
          <CardProduct
            :num="cardItem._id"
            :price="cardItem.price"
            :sold="cardItem.sold"
            :brand="cardItem.name"
            :img="cardItem.imgUrl"
          />
        </NuxtLink>
      </div>
      <div v-else>
        <p class="text-center my-5">Stok kosong...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      card: [],
    }
  },

  async fetch() {
    try {
      const response = await this.$axios.$get(
        `${this.$config.baseURL}/api/v1/products`
      )
      this.card = response.body
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },

  methods: {
    async changeValue(newValue) {
      const value = newValue.toLowerCase()
      try {
        const response = await this.$axios.$get(
          `${this.$config.baseURL}/api/v1/products/select?key=${value}`
        )
        this.card = response.body
      } catch (err) {
        this.card = err.response.data.body
      }
    },
  },
}
</script>

<style>
.homepage .shop {
  margin-top: 70px;
}
</style>
