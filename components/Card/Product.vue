<template>
  <div class="card card-product text-dark" style="width: 15rem; height: 20rem">
    <img :src="img" class="card-img-top" alt="..." height="200" />
    <div class="card-body">
      <h5 class="card-brand">{{ brand }}</h5>
      <p class="card-text">{{ sold }} terjual</p>
      <p>Rp {{ formatPrice(price) }},00</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: {
    num: {
      type: String,
      default: '',
    },
    brand: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default: '',
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

<style>
.card-product:hover {
  background: rgb(209, 209, 209);
  transition: 300ms;
}

.card .card-brand {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
