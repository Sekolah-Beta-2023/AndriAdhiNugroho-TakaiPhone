<template>
  <div class="footer pt-2">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-7">
          <h3>Takai Phone</h3>
          <p>
            Takai Phone adalah salah satu perusahaan yang bergerak di bidang
            penjualan alat-alat elektronik khususnya handphone. Perusahaan ini
            sudah didirikan sejak zaman nabi Adam as dan menjadi salah satu
            perusahaan yang paling dipercaya oleh pelanggannya sepanjang masa.
            <br />
            Semua konten yang terdapat di dalam website ini tidak bermaksud
            menyinggung atau menghibur pihak manapun.
          </p>

          <div class="foot-contact">
            <h6>Contact:</h6>
            <ul>
              <li>
                <a href="#"
                  ><i class="bi bi-envelope me-2"></i>emailpalsu0@gmail.com</a
                >
              </li>
              <li>
                <a href="#"><i class="bi bi-whatsapp me-2"></i>+621234567890</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-lg-2 d-flex flex-column mt-3 mt-lg-0">
          <h4>Links</h4>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Syarat&Ket</a>
        </div>
        <div class="col-12 col-lg-3 d-flex flex-column mt-3 mt-lg-0">
          <h4>Sosmed</h4>
          <a href="#"><i class="bi bi-instagram me-2"></i>Instagram</a>
          <a href="#"><i class="bi bi-facebook me-2"></i>Facebook</a>
          <a href="#"><i class="bi bi-youtube me-2"></i>Youtube</a>
        </div>
      </div>
      <p class="text-center mt-3 mb-0 pb-1">
        &copy; 2023 TakaiPhone. All right reserved
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComp',
}
</script>

<style>
.footer {
  background: rgba(255, 255, 255, 0.872);
  backdrop-filter: blur(15px);
}

.footer a {
  width: max-content;
}
</style>
