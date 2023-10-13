<template>
  <div class="transact-page container min-vh-100 text-light">
    <section class="border-bottom border-secondary">
      <h2>Transaksi</h2>
    </section>
    <section>
      <NuxtLink
        class="text-decoration-none"
        :to="`/detail/transact/${item._id}`"
        v-for="(item, i) in dataTransact"
        :key="i"
      >
        <CardTransact :data="item" />
      </NuxtLink>
    </section>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'TransactionPage',
  middleware: ['authenticated'],
  data() {
    return {
      dataTransact: [],
    }
  },
  computed: {
    localValue() {
      if (process.client) {
        // Hanya dijalankan pada sisi klien
        return localStorage.getItem('userStatus')
      }
      // Nilai default jika dijalankan pada sisi server
      return null
    },
  },
  mounted() {
    this.getTransact()
  },
  methods: {
    async getTransact() {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      try {
        const response = await this.$axios.get(
          `/api/v1/user/transact/${decoded._id}`,
          {
            headers: { 'auth-token': token },
          }
        )
        this.dataTransact = response.data.body.transaksi
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>

<style>
.transact-page {
  margin-top: 120px;
}
</style>
