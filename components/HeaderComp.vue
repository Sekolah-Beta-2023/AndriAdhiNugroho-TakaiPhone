<template>
  <nav class="navbar navbar-expand-lg justify-content-between fixed-top">
    <div class="container">
      <div class="brand d-flex justify-content-between mb-2 mb-lg-0">
        <a class="navbar-brand" href="#">TakaiPhone</a>
        <div class="d-flex d-lg-none gap-2">
          <button
            class="icon"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-search"></i>
          </button>
          <button class="icon" @click="navigate('/cart')">
            <i class="bi bi-cart2"></i>
          </button>
          <button
            class="icon"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>

      <!-- collapse search start -->
      <div
        class="center-nav collapse w-100 d-lg-none"
        id="navbarToggleExternalContent"
      >
        <form @submit.prevent="searchData" class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            v-model="searchValue"
            placeholder="Cari produk"
            aria-label="Search"
          />
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
      <!-- collapse search end -->

      <div class="d-none d-lg-inline center-nav collapse w-100 px-0 px-lg-4">
        <!-- search lg start -->
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            v-model="searchValue"
            placeholder="Cari produk"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-dark"
            type="button"
            @click="searchData"
          >
            Search
          </button>
        </form>
        <!-- search lg end -->

        <!-- nav lg start -->
        <ul class="navbar-nav d-flex mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link active" to="/">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/about">About</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/syarat&ket">Syarat & Ket</NuxtLink>
          </li>
        </ul>
        <!-- nav lg end -->
      </div>

      <div class="wraper">
        <div class="d-none d-lg-flex gap-1">
          <button class="icon m-0 mx-lg-3" @click="navigate('/cart')">
            <i class="bi bi-cart2"></i>
          </button>
          <div
            :class="{
              'd-flex align-items-center gap-2': userStatus,
              'd-flex align-items-center gap-1': !userStatus,
            }"
          >
            <!-- if user has loged in -->
            <button
              class="btn btn-dark"
              type="button"
              v-show="userStatus"
              @click="navigate('/transaction')"
            >
              <i class="bi bi-credit-card me-2"></i>
              Transaksi
            </button>
            <NuxtLink to="/profile">
              <img
                src="../static/guest.png"
                class="bg-dark rounded-circle"
                style="width: 35px; height: 35px"
                v-show="userStatus"
            /></NuxtLink>
            <!-- if not login -->
            <button
              class="btn btn-outline-dark"
              type="button"
              v-show="!userStatus"
              @click="navigate('/login')"
            >
              Sign In
            </button>
            <button
              class="btn btn-dark"
              type="button"
              v-show="!userStatus"
              @click="navigate('/login')"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div
          class="address d-flex align-items-center gap-2 mt-1 mt-lg-0 py-0 py-lg-2"
        >
          <i class="bi bi-geo-alt ms-0 ms-lg-3"></i>
          <p class="address-text m-0">
            {{
              guestAddress && userData.address !== ''
                ? userData.address
                : 'Alamat belum diisi!'
            }}
          </p>
        </div>
      </div>

      <!-- offcanvas start-->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">TakaiPhone</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="d-inline d-lg-none navbar-nav">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/profile">Profile</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/about">About</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/syarat&ket"
                >Syarat & Ket</NuxtLink
              >
            </li>
          </ul>
          <div
            :class="{
              'd-flex d-lg-none mt-2': userStatus,
              'd-flex d-lg-none gap-1 mt-2': !userStatus,
            }"
          >
            <!-- if user has logged in -->
            <button
              class="btn btn-outline-dark"
              type="submit"
              v-show="userStatus"
              @click="navigate('/transaction')"
            >
              <i class="bi bi-credit-card me-2"></i>
              Transaksi
            </button>

            <!-- if user not login -->
            <button
              class="btn btn-outline-dark"
              type="submit"
              v-show="!userStatus"
              @click="navigate('/register')"
            >
              Sign In
            </button>
            <button
              class="btn btn-dark"
              type="submit"
              v-show="!userStatus"
              @click="navigate('/login')"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <!-- offcanvas end -->
    </div>
  </nav>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { mapState } from 'vuex'

export default {
  name: 'HeaderComp',
  data() {
    return {
      searchValue: '',
      guestAddress: true,
    }
  },
  computed: {
    ...mapState('user', ['userData']),
    userStatus() {
      if (process.client) {
        return localStorage.getItem('userStatus')
      }
      return null
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$auth.loggedIn) {
        this.guestAddress = true
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        const body = {
          userId: decoded._id,
          token,
        }
        this.$store.dispatch('user/getUser', body)
      } else {
        this.guestAddress = false
      }
    },
    searchData() {
      this.$store.dispatch('product/searchProducts', this.searchValue)
      this.$router.push('/search')
    },
    navigate(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style>
button {
  width: max-content;
}

button.icon {
  border: none;
  outline: none;
  font-size: 1.5rem;
  background: transparent;
}

.navbar {
  background: rgba(255, 255, 255, 0.646);
  backdrop-filter: blur(15px);
}

.navbar .brand {
  width: max-content;
}

.navbar .nav-item a {
  color: black;
}

.navbar .nav-item a.nuxt-link-exact-active {
  color: rgb(182, 23, 23);
}

.navbar .wraper {
  border-left: 1px solid rgb(110, 110, 110);
}

.navbar .wraper .address .address-text {
  cursor: pointer;
  white-space: nowrap;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar .wraper .address .address-text:hover {
  text-decoration: underline;
}

/* layar lg */
@media screen and (max-width: 992px) {
  button.icon {
    font-size: 1.4rem;
  }

  .navbar {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.8);
  }

  .navbar .brand {
    width: 100%;
  }

  .navbar .wraper {
    border-left: none;
  }

  .navbar .wraper .address {
    font-size: 0.9rem;
  }
}
</style>
