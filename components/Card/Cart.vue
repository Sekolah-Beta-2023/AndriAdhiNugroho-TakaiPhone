<template>
  <div class="card-cart">
    <div class="card bg-white-smooth mb-3 text-light" style="width: 100%">
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
            <div class="d-flex gap-2 mt-3">
              <button
                class="btn btn-secondary"
                @click="navigate(`/detail/${data._id}`)"
              >
                <i class="bi bi-info-circle me-2"></i>Detail
              </button>
              <button class="btn btn-danger" @click="deleteProd(data._id)">
                <i class="bi bi-trash me-2"></i>Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'CardCart',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    navigate(path) {
      this.$router.push(path)
    },
    formatPrice(num) {
      const reverse = num.toString().split('').reverse().join('')
      let result = reverse.match(/\d{1,3}/g)
      result = result.join('.').split('').reverse().join('')
      return result
    },
    async deleteProd(pId) {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      // eslint-disable-next-line no-console
      console.log(decoded)

      try {
        await this.$axios.delete(
          `/api/v1/user/deleteProduct?uId=${decoded._id}&pId=${pId}`,
          {
            headers: { 'auth-token': token },
          }
        )
        window.location.reload()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.response)
      }
    },
  },
}
</script>

<style>
.card-cart {
  border-bottom: 1px solid rgb(215, 215, 215);
  margin-bottom: 20px;
}

.card-cart .card .product-img {
  width: 170px;
  height: 185px;
}

.card-cart .bg-white-smooth {
  background-color: transparent;
}

@media screen and (max-width: 768px) {
  .card-cart .card .product-img {
    width: 150px;
    height: 170px;
  }
}
</style>
