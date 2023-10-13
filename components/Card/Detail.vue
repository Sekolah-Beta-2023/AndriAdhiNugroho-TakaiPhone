<template>
  <div class="card-cart">
    <div class="card-dark card mb-3 text-light" style="width: 100%">
      <div class="d-flex gap-3">
        <div class="m-0">
          <img
            :src="data.img"
            class="img-fluid rounded-start rounded product-img"
            alt="..."
          />
        </div>
        <div class="m-0 p-0">
          <div class="card-body m-0 p-0">
            <h3 class="card-title m-0">{{ data.productName }}</h3>
            <p class="m-0">Color: {{ data.color }}</p>
            <p class="m-0">Jumlah: {{ data.qty }}</p>
            <p class="m-0">
              Total Harga: Rp {{ formatPrice(data.totalPrice) }},00
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDetail',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    formatPrice(num) {
      const reverse = num.toString().split('').reverse().join('')
      let result = reverse.match(/\d{1,3}/g)
      result = result.join('.').split('').reverse().join('')
      return result
    },
  },
}
</script>

<style scoped>
.card-dark {
  background: transparent !important;
}
</style>
