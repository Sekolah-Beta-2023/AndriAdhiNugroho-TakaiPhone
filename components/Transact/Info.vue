<template>
  <div class="transact-info">
    <!-- <p>{{info}}</p> -->
    <p class="px-2 py-1 bg-warning text-dark rounded">
      {{ info.status ? 'Diproses' : 'Menunggu pembayaran' }}
    </p>
    <div class="transact-date">
      <h6>Tanggal pemesanan:</h6>
      <p>{{ info.date }}</p>
    </div>
    <div class="transact-address">
      <h6>Alamat pengiriman:</h6>
      <p>{{ info.address }}</p>
    </div>
    <div class="transact-payment">
      <h6>Metode pembayaran:</h6>
      <p>{{ info.payment }}</p>
    </div>
    <div class="transact-fee">
      <h6>Total belanja:</h6>
      <p>Rp {{ formatPrice(info.totalPrice) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactInfo',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    formatPrice(num) {
      if (typeof num === 'number') {
        const reverse = num.toString().split('').reverse().join('')
        let result = reverse.match(/\d{1,3}/g)
        result = result.join('.').split('').reverse().join('')
        return result
      }
      return 0
    },
  },
}
</script>

<style></style>
