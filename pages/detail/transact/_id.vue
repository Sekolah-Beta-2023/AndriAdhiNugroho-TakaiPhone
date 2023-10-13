<template>
  <div class="detail-transact container min-vh-100 text-light mt-5 pt-5">
    <div
      class="d-flex align-items-center justify-content-between p-1 mb-2 border-bottom"
    >
      <h2>Detail Transaksi</h2>
      <div class="d-flex gap-2">
        <button class="btn btn-light" @click="setShow(false)">Barang</button>
        <button class="btn btn-light" @click="setShow(true)">Info</button>
      </div>
    </div>
    <TransactInfo v-show="show" :info="data[0]" />
    <CardDetail
      v-show="!show"
      v-for="(item, i) in products"
      :data="item"
      :key="i"
    />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'DetailTransactPage',
  middleware: ['authenticated'],
  data() {
    return {
      products: [],
      data: [],
      show: true,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    setShow(condition) {
      this.show = condition
    },
    async getData() {
      const id = this.$route.params.id
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)

      try {
        const response = await this.$axios.get(
          `/api/v1/user/transact/${decoded._id}/${id}`,
          {
            headers: { 'auth-token': token },
          }
        )

        this.data = response.data.body
        this.products = response.data.body[0].products
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
