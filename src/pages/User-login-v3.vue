<template>
  <!-- BEGIN login -->
  <div class="login login-with-news-feed">
    <!-- BEGIN news-feed -->
    <div class="news-feed">
      <div class="news-image" style="background-image: url(/assets/img/login-bg/login-bg-10.jpg)"></div>
      <div class="news-caption">
        <h4 class="caption-title"><b>TCB</b> 2023 <small class="text-red-600"></small></h4>
        <p>Thai Cancer Base 2023 by National Cancer Institute.</p>
      </div>
    </div>
    <!-- END news-feed -->

    <!-- BEGIN login-container -->
    <div class="login-container">
      <!-- BEGIN login-header -->
      <div class="login-header mb-30px">
        <div class="brand">
          <div class="d-flex align-items-center">
            <span class="logo"></span>
            <b>TCB</b> 2023 <small class="text-red-600 pt-10px"></small>
          </div>
          <small>Thai Cancer Base 2023.</small>
        </div>
        <div class="icon">
          <i class="fa fa-sign-in-alt"></i>
        </div>
      </div>
      <!-- END login-header -->

      <!-- BEGIN login-content -->
      <div class="login-content">
        <validation-observer v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(checkForm)" class="fs-13px">
            <validation-provider name="username" rules="required" v-slot="{ classes, errors }">
              <div class="form-floating mb-15px">
                <input v-model="user.username" :class="classes" autocomplete="username" type="text" class="form-control h-45px fs-13px" placeholder="ชื่อผู้ใช้" id="username" name="username" />
                <label for="username" class="d-flex align-items-center fs-13px text-gray-600">ชื่อผู้ใช้</label>
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider name="password" rules="required" v-slot="{ classes, errors }">
              <div class="form-floating mb-15px">
                <input v-model="user.password" :class="classes" autocomplete="current-password" type="password" class="form-control h-45px fs-13px" placeholder="หรัสผ่าน" id="password" />
                <label for="password" class="d-flex align-items-center fs-13px text-gray-600">รหัสผ่าน</label>
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <div class="mb-40px pb-40px">
              <button type="submit" class="btn btn-success d-block h-45px w-100 btn-lg fs-14px" :disabled="invalid">เข้าสู่ระบบ</button>
            </div>
            <hr class="bg-gray-600 opacity-2" />
            <div class="text-gray-600 text-center text-gray-500-darker mb-0">&copy; TCB2023 All Right Reserved 2021</div>
          </form>
        </validation-observer>
      </div>
      <!-- END login-content -->
    </div>
    <!-- END login-container -->
  </div>
  <!-- END login -->
</template>

<script>
import AppOptions from '../config/AppOptions.vue'
import User from '../_models/user'

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '', null, null),
      loading: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ path: '/home' })
    }
    AppOptions.appEmpty = true
  },
  beforeRouteLeave(to, from, next) {
    AppOptions.appEmpty = false
    next()
  },
  methods: {
    checkForm: function () {
      this.loading = true
      var loader = this.$loading.show()
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$nextTick(() => {
              loader.hide()
              this.$toast.success('ยินดีต้อนรับสู่ Thai Cancer Base 2023.')
              this.$router.push({ path: '/home' }).catch((error) => {
                console.info(error.message)
              })
            })
          },
          () => {
            this.loading = false
            loader.hide()
          }
        )
      }
    },
  },
}
</script>
