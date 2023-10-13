<template>
  <div class="card card-cart-desc">
    <!-- modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Form Pembelian
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="user-name">
              <h6>Username:</h6>
              <p>{{ userData.username }}</p>
            </div>
            <div class="user-email">
              <h6>Email:</h6>
              <p>{{ userData.email }}</p>
            </div>
            <div class="user-address">
              <h6>Alamat Pengiriman:</h6>
              <input
                class="form-control"
                type="text"
                :value="newAddress === '' ? userData.address : newAddress"
                @change="setNewAddress"
              />
              <p class="fst-italic">
                <i class="bi bi-info-circle me-2"></i>Mohon isi alamat dengan
                benar agar kurir kami tidak nyasar!
              </p>
            </div>
            <div class="payment-methods">
              <h6>Metode Pembayaran:</h6>
              <div class="radio-input">
                <input
                  name="radio"
                  v-model="payment"
                  type="radio"
                  value="BCA"
                  required
                />
                <label for="radio">BCA</label>
              </div>
              <div class="radio-input">
                <input
                  name="radio"
                  v-model="payment"
                  type="radio"
                  value="BRI"
                />
                <label for="radio">BRI</label>
              </div>
              <div class="radio-input">
                <input
                  name="radio"
                  v-model="payment"
                  type="radio"
                  value="BNI"
                />
                <label for="radio">BNI</label>
              </div>
              <div class="radio-input">
                <input
                  name="radio"
                  v-model="payment"
                  type="radio"
                  value="BSI"
                />
                <label for="radio">BSI</label>
              </div>
              <div class="radio-input">
                <input
                  name="radio"
                  v-model="payment"
                  type="radio"
                  value="Bitcoin"
                />
                <label for="radio">Bitcoin</label>
              </div>
              <div class="radio-input">
                <input
                  name="radio"
                  v-model="payment"
                  type="radio"
                  value=""
                  disabled
                />
                <label for="radio">COD (Ongoing)</label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Batal
            </button>
            <button type="button" class="btn btn-success" @click="buy">
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- card body -->
    <div class="card-body w-100">
      <h3 class="card-title">Keranjang</h3>
      <hr />
      <h6>Total belanjaan:</h6>
      <p class="card-text">{{ qty }}</p>
      <h6>Total Pembayaran:</h6>
      <p class="card-text">Rp {{ totalPrice }},00</p>
      <button class="btn btn-secondary" @click="navigate('/')">
        Lanjut belanja
      </button>
      <button
        type="button"
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Beli Sekarang
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardCartDesc',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      newAddress: '',
      payment: '',
    }
  },
  computed: {
    ...mapState('user', ['userData']),
    qty() {
      return this.data.length
    },
    totalPrice() {
      const prices = []
      this.data.map((e) => prices.push(e.totalPrice))
      const result = prices.reduce((acc, cur) => acc + cur, 0)
      return this.formatPrice(result)
    },
  },
  methods: {
    navigate(path) {
      this.$router.push(path)
    },
    setNewAddress(event) {
      const value = event.target.value
      this.newAddress = value
    },
    buy() {
      if (this.payment === '') return alert('Payment belum diisi!')

      const userAddress = this.newAddress || this.userData.address
      const data = {
        userAddress,
        payment: this.payment,
      }
      this.$emit('buy', data)
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

<style>
.card-cart-desc {
  background-color: #fdfdfdcf;
}
</style>
