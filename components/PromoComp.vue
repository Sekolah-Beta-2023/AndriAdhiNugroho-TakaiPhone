<template>
  <div class="container promo text-light">
    <div class="row pt-5">
      <div class="product-img d-none d-lg-inline col-6">
        <img src="/carousel1.jpg" alt="..." />
      </div>
      <div class="product-desc col-12 col-lg-6">
        <div class="d-flex mb-3">
          <img
            class="d-lg-none me-3"
            src="/carousel1.jpg"
            alt="..."
            width="170"
            height="200"
          />
          <div class="desc d-block">
            <h1>
              Sumsang Note 10 Lite
              <span class="bg-danger fs-6 px-1">PROMO</span>
            </h1>
            <p>
              Spesifikasi mumpuni, hajar semua aktivitas. Kamera beresolusi
              tinggi, jangankan bulan pluto pun bisa terlihat boss! Saya tidak
              bermaksut endorse jadi jangan dibeli kalau tidak berminat.
            </p>
          </div>
        </div>

        <div class="d-flex gap-2">
          <h5 class="fst-italic text-decoration-line-through">
            Rp 7.999.000,00
          </h5>
          <h5>/</h5>
          <h5>Rp 6.799.000,00</h5>
        </div>
        <div class="d-flex gap-2 mt-4">
          <button class="btn btn-warning">
            <i class="bi bi-cart2 me-2"></i>Keranjang
          </button>
          <button class="btn btn-light">
            <i class="bi bi-info-circle me-2"></i>Lihat Detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoComp',
}
</script>

<style>
.promo {
  background-color: rgb(20, 20, 20);
  width: 100%;
}

.promo .product-img img {
  width: 380px;
  height: 400px;
  border-radius: 15px 50px;
  box-shadow: 3px 3px 8px rgba(53, 10, 210, 0.765);
}

.promo .product-desc .desc {
  height: 200px;
  overflow: hidden;
}

@media screen and (min-width: 992px) {
  .promo .product-desc .desc {
    height: max-content;
  }
}
</style>
