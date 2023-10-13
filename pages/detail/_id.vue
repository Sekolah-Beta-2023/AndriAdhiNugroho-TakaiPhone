<template>
  <div class="container detail-prod">
    <div
      class="prod d-flex flex-column flex-lg-row w-100 min-vh-100 text-light pt-3 pt-sm-5"
    >
      <!-- <ModalConfirm /> -->
      <div class="product-img col-12 col-lg-5 min-vh-lg-100">
        <img :src="product.imgUrl" alt="..." />
        <p class="mx-0 mb-2 mt-3">Colors:</p>
        <div class="d-flex align-items-center gap-2">
          <div v-for="color in product.colors" :key="color.clr">
            <input
              type="radio"
              class="btn-check"
              name="options-outlined"
              :id="'danger-outlined' + color.clr"
              v-model="dataCart.color"
              :value="color.clr"
              autocomplete="off"
            />
            <label
              class="btn text-light"
              :style="`outline: 3px solid ${color.clr}`"
              :for="'danger-outlined' + color.clr"
              >{{ color.clr }}</label
            >
          </div>
        </div>
      </div>
      <div
        class="product-desc col-12 col-lg-7 min-vh-lg-100 my-5 my-lg-0 ps-lg-5"
      >
        <h1>{{ product.name }}</h1>
        <div class="d-flex gap-4 mt-3">
          <p>Terjual: {{ product.sold }}</p>
          <p>Stock: {{ product.stock }}</p>
        </div>
        <div class="d-flex flex-sm-nowrap flex-wrap gap-2 mt-5">
          <div class="price col-12 col-sm-6">
            <h5 class="mb-3">PRICE</h5>
            <h2>Rp {{ price }},00</h2>
          </div>
          <div class="quantity col-0 col-sm-6 mt-3 mt-sm-0">
            <h5 class="mb-3">QUANTITY</h5>
            <div
              class="quantity-btn d-flex justify-content-between align-items-center p-1 rounded bg-light"
            >
              <button class="btn btn-danger rounded-circle" @click="min">
                <i class="bi bi-dash-lg"></i>
              </button>
              <p class="text-dark mx-5 my-0 fs-4">{{ dataCart.qty }}</p>
              <button class="btn btn-success rounded-circle" @click="plus">
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="details mt-5 pt-2">
          <h5>DETAILS</h5>
          <hr />
          <p>
            {{ product.detail }}
          </p>
        </div>
        <div class="d-flex align-items-center mt-5 gap-3">
          <div>
            <p class="m-0">Total price :</p>
            <p class="m-0">Rp {{ total }},00</p>
          </div>
          <button class="btn btn-warning" @click="addToCart">
            <i class="bi bi-cart me-2"></i>keranjang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import swal from 'sweetalert'

export default {
  name: 'DetailPages',
  data() {
    return {
      product: [],
      productPrice: 0,
      errMsg: '',
      dataCart: {
        color: '',
        totalPrice: 0, // ok
        qty: 0, // ok
      },
    }
  },
  computed: {
    price() {
      return this.formatPrice(this.productPrice)
    },
    total() {
      return this.formatPrice(this.dataCart.totalPrice)
    },
  },
  mounted() {
    this.fetchById()
  },
  methods: {
    async fetchById() {
      const response = await this.$axios.get(
        `/api/v1/products/${this.$route.params.id}`
      )
      this.product = response.data.body
      this.productPrice = response.data.body.price
    },
    async addToCart() {
      const { color, totalPrice, qty } = this.dataCart
      const token = localStorage.getItem('token')

      // validation
      if (!color) return swal('Pilih warna terlebih dahulu!')
      if (qty === 0) return swal('Jumlah barang belum diisi!')

      // get email
      if (token === null) return this.$router.push('/login')
      const decoded = jwtDecode(token)

      const data = {
        id: this.product._id,
        email: decoded.email,
        productName: this.product.name,
        img: this.product.imgUrl,
        color,
        totalPrice,
        qty,
      }

      try {
        const response = await this.$axios.get(
          `/api/v1/user/cart/${decoded._id}/${this.product._id}`,
          {
            headers: { 'auth-token': token },
          }
        )

        if (response.data.body.length) {
          // confirm message
          const val = await swal({
            title: 'Anda yakin?',
            text: 'Data sudah ada dikeranjang. Data akan ditimpa jika anda tetap melanjutkan!',
            icon: 'warning',
            buttons: {
              cancel: {
                text: 'Batal',
                value: null,
                visible: true,
              },
              confirm: {
                text: 'Lanjut',
                value: true,
              },
            },
          })
          if (val === null) return ''

          // add item to cart
          await this.$axios.post('/api/v1/user/addToCart', data, {
            headers: {
              'auth-token': token,
            },
          })

          const value = await swal({
            title: 'Berhasil ditambahkan!',
            text: 'Cek keranjang sekarang!',
            icon: 'success',
            buttons: {
              cancel: {
                text: 'Lanjut belanja',
                value: null,
                visible: true,
              },
              confirm: {
                text: 'OK',
                value: true,
              },
            },
          })
          if (value) {
            this.$router.push('/cart')
          }
        } else {
          // add item to cart
          await this.$axios.post('/api/v1/user/addToCart', data, {
            headers: {
              'auth-token': token,
            },
          })

          const value = await swal({
            title: 'Berhasil ditambahkan!',
            text: 'Cek keranjang sekarang!',
            icon: 'success',
            buttons: {
              cancel: {
                text: 'Lanjut belanja',
                value: null,
                visible: true,
              },
              confirm: {
                text: 'OK',
                value: true,
              },
            },
          })
          if (value) {
            this.$router.push('/cart')
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.response)
      }
    },
    formatPrice(num) {
      const reverse = num.toString().split('').reverse().join('')
      let result = reverse.match(/\d{1,3}/g)
      result = result.join('.').split('').reverse().join('')
      return result
    },
    plus() {
      if (this.dataCart.qty === this.product.stock) return
      this.dataCart.qty += 1
      this.dataCart.totalPrice = this.dataCart.qty * this.product.price
    },
    min() {
      if (this.dataCart.qty === 0) return
      this.dataCart.qty -= 1
      this.dataCart.totalPrice = this.dataCart.qty * this.product.price
    },
  },
}
</script>

<style>
.detail-prod .prod {
  margin-top: 100px;
}

.detail-prod .prod .product-img img {
  width: 370px;
  height: 430px;
  border-radius: 10px;
}

.detail-prod .circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
}

.detail-prod .quantity-btn {
  max-width: 200px;
}

@media screen and (max-width: 576px) {
  .detail-prod .prod .product-img img {
    width: 100%;
    height: 450px;
    border-radius: 10px;
  }
}
</style>
