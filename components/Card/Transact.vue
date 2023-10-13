<template>
  <div class="transact-card card text-dark mt-2">
    <div class="card-body">
      <div class="d-flex justify-content-between w-100 border-bottom">
        <h4>Lihat detail transaksi<i class="bi bi-arrow-right-short"></i></h4>
        <p>{{ data.date }}</p>
      </div>
      <div
        class="d-flex flex-wrap justify-content-between align-items-center w-100 mt-2"
      >
        <p class="px-2 py-1 bg-warning rounded m-1">
          {{ data.status ? 'Diproses' : 'Menunggu pembayaran' }}
        </p>
        <div class="d-flex align-items-center gap-2">
          <h6 class="m-1">Payment:</h6>
          <p class="m-1">{{ data.payment }}</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <h6 class="m-1">Barang:</h6>
          <p class="m-1">
            {{ totalQty(data.products) }}
          </p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <h6 class="m-1">Total belanja:</h6>
          <p class="m-1">Rp {{ formatPrice(data.totalPrice) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTransact',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    totalQty(prod) {
      let total = 0
      prod.map((e) => (total += e.qty))
      return total
    },
    formatPrice(num) {
      const reverse = num.toString().split('').reverse().join('')
      let result = reverse.match(/\d{1,3}/g)
      result = result.join('.').split('').reverse().join('')
      return result
    },
  },
}
</script>

<style></style>
