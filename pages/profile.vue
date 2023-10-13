<template>
  <div class="profile container">
    <div
      class="d-flex justify-content-between align-items-center text-light border-bottom border-2 p-2"
    >
      <h2>My Profile</h2>
      <div class="flex gap-2">
        <button v-show="isEdit" class="btn btn-light" @click="submit">
          Update
        </button>
        <button class="btn btn-light" @click="editData">
          {{ isEdit ? 'Cancel' : 'Edit' }}
        </button>
        <button class="btn btn-danger" @click="logout()">
          <i class="bi bi-box-arrow-right"></i> Log Out
        </button>
      </div>
    </div>
    <div class="d-flex flex-wrap min-vh-100 text-light mt-4">
      <div class="col-lg-5 d-flex justify-content-center mb-4 mb-lg-0">
        <div class="d-flex flex-column gap-3">
          <h5>Profil Image:</h5>
          <div class="profile-img">
            <img src="../static/guest.png" alt="..." />
            <button v-show="isEdit" class="btn-edit-img btn btn-light">
              Edit
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <h5>Username:</h5>
        <p v-show="!isEdit">
          {{ userData.username }}
        </p>
        <input
          v-show="isEdit"
          class="form-control"
          :value="userData.username"
          @change="setName"
          type="text"
          required
        />
        <p class="mt-2 p-2 bg-light text-dark rounded">
          Tolong ya kalau buat username itu yang waras dikit! Minimal ada
          unsur-unsur nama orang lah. Jangan sampai saya liat nama alien
          dijadikan username.
        </p>

        <hr />

        <h5>Email:</h5>
        <p>{{ userData.email }}</p>
        <p class="p-2 bg-light text-dark rounded">
          Kami tidak pernah ngeshare email pengguna ke siapapun walaupun
          emailnya gak penting-penting amat. Ini semua demi kenyamanan pengguna.
        </p>

        <hr />

        <h5>Address:</h5>
        <p v-show="!isEdit">
          {{ userData.address ? userData.address : 'Alamat belum diisi.' }}
        </p>
        <input
          v-show="isEdit"
          class="form-control"
          :value="userData.address"
          @change="setAddress"
          type="text"
          required
        />
        <p class="mt-2 p-2 bg-light text-dark rounded">
          Tolong ya kalau isi alamat itu yang bener bambang, kasian kurir saya
          udah nyasar berkali-kali. Mending kalau nyasarnya gak jauh-jauh amat
          lha ini udah kelewat batas njir.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { mapState } from 'vuex'

export default {
  name: 'ProfilePage',
  middleware: ['authenticated'],
  data() {
    return {
      isEdit: false,
      userId: '',
      username: '',
      address: '',
    }
  },
  computed: {
    ...mapState('user', ['userData']),
  },
  mounted() {
    this.getData()
  },
  methods: {
    setName(event) {
      const value = event.target.value
      this.username = value
    },
    setAddress(event) {
      const value = event.target.value
      this.address = value
    },
    async logout() {
      localStorage.clear()
      sessionStorage.clear()
      try {
        await this.$auth.logout()
        window.location.replace('/')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
    getData() {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const body = {
        userId: decoded._id,
        token,
      }
      this.$store.dispatch('user/getUser', body)
      this.userId = decoded._id
    },
    editData() {
      this.isEdit = !this.isEdit
    },
    async submit() {
      const token = localStorage.getItem('token')

      if (this.username === '') this.username = this.userData.username
      if (this.address === '') this.address = this.userData.address

      const dataUser = {
        id: this.userId,
        username: this.username,
        address: this.address,
      }

      try {
        await this.$axios.patch('api/v1/user', dataUser, {
          headers: { 'auth-token': token },
        })
        window.location.reload()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>

<style>
.profile {
  margin-top: 120px;
}

.profile .profile-img {
  width: 200px;
  height: 200px;
  position: relative;
}

.profile .profile-img img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.profile .btn-edit-img {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
