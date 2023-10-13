<template>
  <div class="container search-page w-100 min-vh-100">
    <h4 class="text-center text-light mb-4">Hasil pencarian anda:</h4>

    <div
      v-if="products.message === 'Request berhasil!'"
      class="list d-flex justify-content-center gap-3 flex-wrap mb-5"
    >
      <NuxtLink
        v-for="product in products.body"
        :to="'/detail/' + product._id"
        :key="product.id"
        class="text-decoration-none"
      >
        <CardComp
          :num="product._id"
          :price="product.price"
          :sold="product.stock"
          :brand="product.name"
          :img="product.imgUrl"
        />
      </NuxtLink>
    </div>
    <div v-else>
      <p class="text-light text-center my-5">{{ products.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchPage',
  computed: {
    ...mapState('product', ['products']),
  },
}
</script>

<style>
.search-page {
  margin-top: 100px;
}
</style>
