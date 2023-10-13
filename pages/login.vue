<template>
  <div class="auth-wraper position-relative">
    <div
      class="text-light position-relative"
      :class="[login ? 'login-drop' : reg ? 'login-hide' : 'login']"
    >
      <div class="container">
        <h2>Masuk</h2>
        <p v-if="userStatus" class="mb-4">
          Register berhasil!<br />Silahkan login terlebih dahulu.
        </p>
        <p v-else class="mb-4">Silahkan login dengan akun antum.</p>
        <FormAuth id="1" />
      </div>
      <div class="kabut"></div>
    </div>
    <div class="text-dark" :class="[reg ? 'reg-up' : 'reg']">
      <div class="container">
        <h2>Daftar</h2>
        <p class="mb-4">Antum belum punya akun? Daftar dulu bos!</p>
        <FormAuth id="2" @setLayout="setLayout" />
      </div>
      <div class="kabut-putih" :class="[login ? 'd-none' : '']"></div>
    </div>
    <div
      class="d-flex"
      :class="[login ? 'arrow-drop' : reg ? 'arrow-up' : 'arrow']"
    >
      <div class="btn-login">
        <div v-if="login">
          <NuxtLink to="/">
            <div class="circle2 text-dark">
              <i class="bi bi-house"></i>
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          <div class="circle2" :class="[reg ? 'rotate' : '']" @click="regUp">
            <i class="bi bi-chevron-up"></i>
          </div>
        </div>
      </div>
      <div class="btn-reg">
        <div v-if="reg">
          <NuxtLink to="/">
            <div class="circle1 text-light">
              <i class="bi bi-house"></i>
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          <div
            class="circle1 text-light"
            :class="[login ? 'rotate' : '']"
            @click="loginDrop"
          >
            <i class="bi bi-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  auth: false,
  data() {
    return {
      login: false,
      reg: false,
      userStatus: false,
    }
  },
  methods: {
    setLayout(triger) {
      if (triger === 201) {
        this.userStatus = true
        this.login = !this.login
        this.reg = false
      }
    },
    loginDrop() {
      this.login = !this.login
      this.reg = false
    },
    regUp() {
      this.reg = !this.reg
      this.login = false
    },
  },
}
</script>

<style>
.auth-wraper {
  overflow: hidden;
  height: 100vh;
}

.login {
  text-align: center;
  height: 50vh;
  background: rgb(20, 20, 20);
  padding: 50px 0;
  transition: 0.5s;
  overflow: hidden;
}

.reg {
  height: 50vh;
  text-align: center;
  background: rgb(237, 238, 237);
  padding: 50px 0;
  transition: 0.5s;
  overflow: hidden;
}

.kabut,
.kabut-putih {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 2;
}

.kabut {
  height: 80px;
  background: linear-gradient(rgba(20, 20, 20, 0) 0%, rgb(20, 20, 20) 50%);
}

.kabut-putih {
  height: 80px;
  background: linear-gradient(rgba(237, 238, 237, 0), rgb(237, 238, 237));
}

.login-drop {
  height: 96.5vh;
  transition: 0.5s;
  text-align: center;
  padding: 50px 0;
  overflow: hidden;
}

.login-hide {
  height: 3.5vh;
  transition: 0.5s;
  text-align: center;
  overflow: hidden;
}

.reg-up {
  height: 96.5vh;
  transition: 0.5s;
  text-align: center;
  padding: 50px 0;
  background: rgb(237, 238, 237);
  overflow: hidden;
}

.arrow,
.arrow-drop,
.arrow-up {
  position: absolute;
  left: 50%;
  transition: 0.5s;
  z-index: 3;
}

.arrow {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.arrow-drop {
  top: 100%;
  transform: translateX(-50%) translateY(-100%);
}

.arrow-up {
  top: 0%;
  transform: translateX(-50%) translateY(0%);
}

.circle1,
.circle2 {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.5s;
}

.circle1 {
  background: rgb(20, 20, 20);
}
.circle2 {
  background: rgb(237, 238, 237);
}

.circle1.rotate,
.circle2.rotate {
  rotate: 180deg;
  transition: 0.5s;
}
</style>
