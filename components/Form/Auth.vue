<template>
  <div class="form-auth w-100 d-flex align-items-center justify-content-center">
    <form
      @submit.prevent="submitData(form_id)"
      class="text-start col-12 col-sm-9 col-md-7 col-lg-4"
    >
      <!-- Error message -->
      <div v-if="errStatus" class="error-massage w-100 rounded p-2 mb-3">
        <h6>
          <span><i class="bi bi-exclamation-circle me-2"></i></span>
          Warning!
        </h6>
        <p>{{ errMsg }}</p>
      </div>

      <!-- Input Username -->
      <div v-if="form_id === '2'" class="mb-3">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="dataSubmit.username"
          class="form-control"
          :id="'username' + form_id"
          required
        />
      </div>

      <!-- input email -->
      <div class="mb-3">
        <label :for="email" class="form-label">Email address</label>
        <input
          type="email"
          v-model="dataSubmit.email"
          class="form-control"
          :id="email"
          aria-describedby="emailHelp"
          required
        />
        <div :id="'emailHelp' + id" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <!-- Input password -->
      <div class="mb-3">
        <label :for="pass" class="form-label">Password</label>
        <input
          type="password"
          v-model="dataSubmit.password"
          class="form-control"
          :id="pass"
          required
        />
      </div>
      <div v-if="form_id === '2'" class="mb-3">
        <label :for="confirmPass" class="form-label">Confirm Password</label>
        <input
          type="password"
          v-model="dataSubmit.confirmPass"
          class="form-control"
          :id="confirmPass"
          required
        />
      </div>

      <!-- Input checkbox -->
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          v-model="dataSubmit.checkbox"
          class="form-check-input"
          :id="check"
          required
        />
        <label class="form-check-label" :for="check"
          >Saya setuju dengan syarat & ket yang berlaku</label
        >
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary w-100 mb-2">Submit</button>
      <button type="button" class="btn btn-light w-100">
        <i class="bi bi-google me-2"></i>With Google
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormAuth',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    const id = this.id
    return {
      form_id: id,

      // unique id
      check: `exampleCheck${id}`,
      email: `exampleInputEmail${id}`,
      pass: `exampleInputPassword${id}`,
      confirmPass: `confirmPass${id}`,

      // data error
      errStatus: '',
      errMsg: '',

      // data submit
      dataSubmit: {
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        checkbox: false,
      },
    }
  },
  methods: {
    async submitData(id) {
      const { username, email, password, confirmPass, checkbox } =
        this.dataSubmit

      if (id === '2') {
        if (password !== confirmPass) {
          return alert('Pastikan confirm Password sama dengan password!')
        }
      }
      if (checkbox === false) return

      const dataReg = {
        username,
        email,
        password,
        address: 'Bumi, Bimasakti',
      }
      const dataLogin = {
        email,
        password,
      }

      try {
        if (id === '2') {
          // register
          const response = await this.$axios.post(
            '/api/v1/auth/register',
            dataReg
          )
          this.$emit('setLayout', response.status)
        } else {
          // login
          const response = await this.$auth.loginWith('local', {
            data: dataLogin,
          })

          // save data to session storage
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userStatus', true)

          // redirect to home
          window.location.replace('/')
        }
      } catch (err) {
        this.errStatus = err.response.status
        this.errMsg = err.response.data.message
      }
    },
  },
}
</script>

<style>
.form-auth .error-massage {
  background-color: #dc43436e;
}
</style>
