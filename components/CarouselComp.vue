<template>
  <div
    id="carouselExampleFade"
    class="carousel position-relative slide carousel-fade"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/carousel2.jpg" class="d-block w-100" alt="..." />
        <div
          class="carousel-caption h-100 d-none d-md-flex flex-column justify-content-center align-items-center"
        >
          <h1>Muraaaaahhh....</h1>
          <p>Dapatkan handphone dengan spek abal-abal mulai dari 20jt an.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="/carousel5.jpg" class="d-block w-100" alt="..." />
        <div
          class="carousel-caption h-100 d-none d-md-flex flex-column justify-content-center align-items-center"
        >
          <h1>Sangat sangat terpercaya</h1>
          <p>
            Kami berkomitmen untuk menciptakan suasana belanja yang aman dan
            nyaman bagi seluruh pelanggan.
          </p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="/carousel4.jpg" class="d-block w-100" alt="..." />
        <div
          class="carousel-caption h-100 d-none d-md-flex flex-column justify-content-center align-items-center"
        >
          <h1>Gratis ongkirrrr...</h1>
          <p>
            Kami menyadiakan gratis ongkos pengiriman ke seluruh alam semesta
            bahkan ke surga sekalipun.
          </p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarouselComp',
}
</script>

<style>
.carousel::after {
  content: '';
  width: 100%;
  height: 40%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(20, 20, 20));
  position: absolute;
  bottom: 0;
  z-index: 2;
}

.carousel img {
  height: 700px;
}

.carousel .carousel-caption {
  text-shadow: 0 0 13px black;
}

/* layar lg */
@media screen and (max-width: 992px) {
  .carousel img {
    height: 600px;
  }
}

/* layar md */
@media screen and (max-width: 768px) {
  .carousel img {
    height: 500px;
  }
}

/* layar sm */
@media screen and (max-width: 576px) {
  .carousel img {
    height: 400px;
  }
}
</style>
