<template>
  <div
    class="container min-vh-100 d-flex flex-wrap justify-content-center mt-5 pt-5"
  >
    <section class="col-12 col-lg-4 p-2">
      <CardCartDesc :data="cards" @buy="buyProducts" />
    </section>
    <section class="col-12 col-lg-8 p-2">
      <CardCart v-for="(card, i) in cards" :key="i" :data="card" />
    </section>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import swal from 'sweetalert'

export default {
  name: 'CartPage',
  middleware: ['authenticated'],
  data() {
    return {
      decoded: {},
      token: '',
      cards: [],
    }
  },
  mounted() {
    this.getToken()
    this.fetchDataCart()
  },
  methods: {
    getToken() {
      const userToken = localStorage.getItem('token')
      const decoded = jwtDecode(userToken)
      this.decoded = decoded
      this.token = userToken
    },
    async fetchDataCart() {
      try {
        const response = await this.$axios.$get(
          `/api/v1/user/cart/${this.decoded._id}`,
          {
            headers: { 'auth-token': this.token },
          }
        )
        this.cards = response.body.keranjang
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.response)
      }
    },

    async buyProducts(paymentData) {
      const data = {
        email: this.decoded.email,
        address: paymentData.userAddress,
        products: this.cards,
        payment: paymentData.payment,
      }

      try {
        const response = await this.$axios.post('/api/v1/user/buy', data, {
          headers: { 'auth-token': this.token },
        })
        if (response.status === 200) {
          swal({
            icon: 'success',
            title: 'Success!',
            text: 'Transaksi berhasil! Barang akan diproses setelah pembayaran. Untuk tutorial pembayaran silahkan cari sendiri di youtube!',
            button: true,
          }).then(() => {
            window.location.replace('/transaction')
          })
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
