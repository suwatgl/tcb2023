<template>
  <div>
    <!-- BEGIN #header -->
    <div id="header" class="app-header" v-bind:class="{ 'app-header-inverse': appOptions.appHeaderInverse }">
      <!-- BEGIN navbar-header -->
      <div class="navbar-header">
        <button type="button" class="navbar-mobile-toggler" v-on:click="toggleSidebarEndMobile" v-if="appOptions.appSidebarTwo">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand"><span class="navbar-logo"></span> <b>TCB</b> 2023</router-link> <small class="text-red-600 pt-5px"></small>
        <button type="button" class="navbar-mobile-toggler" v-on:click="toggleTopMenuMobile" v-if="appOptions.appTopMenu && !appOptions.appSidebarNone">
          <span class="fa-stack fa-lg text-inverse">
            <i class="far fa-square fa-stack-2x"></i>
            <i class="fa fa-cog fa-stack-1x"></i>
          </span>
        </button>
        <button type="button" class="navbar-mobile-toggler" v-on:click="toggleTopMenuMobile" v-if="appOptions.appTopMenu && appOptions.appSidebarNone">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <button type="button" class="navbar-mobile-toggler" v-on:click="toggleHeaderMegaMenuMobile" v-if="appOptions.appHeaderMegaMenu">
          <span class="fa-stack fa-lg text-inverse m-t-2">
            <i class="far fa-square fa-stack-2x"></i>
            <i class="fa fa-cog fa-stack-1x"></i>
          </span>
        </button>
        <button type="button" class="navbar-mobile-toggler" v-on:click="toggleSidebarMobile" v-if="!appOptions.appSidebarNone">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- END navbar-header -->

      <!-- BEGIN header-nav -->
      <div class="navbar-nav">
        <header-mega-menu v-if="appOptions.appHeaderMegaMenu"></header-mega-menu>

        <b-nav-item-dropdown right menu-class="me-1" class="navbar-item navbar-user dropdown" toggle-class="navbar-link dropdown-toggle d-flex align-items-center" no-caret>
          <template slot="button-content">
            <div class="image image-icon bg-gray-800 text-gray-600">
              <i class="fa fa-user"></i>
            </div>
            <span class="d-none d-md-inline">{{ currentUser ? currentUser.displayname : '' }}</span> <b class="caret"></b>
          </template>
          <a href="javascript:;" class="dropdown-item">แก้ไข Profile</a>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" @click.prevent="logOut" class="dropdown-item">ออกจากระบบ</a>
        </b-nav-item-dropdown>
        <div class="navbar-divider d-none d-md-block" v-if="appOptions.appSidebarTwo"></div>
        <div class="navbar-item d-none d-md-block" v-if="appOptions.appSidebarTwo">
          <a href="javascript:;" v-on:click="toggleSidebarEnd" class="navbar-link icon">
            <i class="fa fa-th"></i>
          </a>
        </div>
      </div>
      <!-- end header navigation right -->
    </div>
    <!-- end #header -->
  </div>
</template>

<script>
import AppOptions from '../../config/AppOptions.vue'
import HeaderMegaMenu from './HeaderMegaMenu.vue'

export default {
  name: 'Header',
  components: {
    HeaderMegaMenu,
  },
  data() {
    return {
      appOptions: AppOptions,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push({ path: '/user/login-v3' })
    },
    toggleSidebarMobile() {
      this.appOptions.appSidebarMobileToggled = !this.appOptions.appSidebarMobileToggled
    },
    toggleSidebarEnd() {
      this.appOptions.appSidebarEndToggled = !this.appOptions.appSidebarEndToggled
    },
    toggleSidebarEndMobile() {
      this.appOptions.appSidebarEndMobileToggled = !this.appOptions.appSidebarEndMobileToggled
    },
    toggleTopMenuMobile() {
      this.appOptions.appTopMenuMobileToggled = !this.appOptions.appTopMenuMobileToggled
    },
    toggleHeaderMegaMenuMobile() {
      this.appOptions.appHeaderMegaMenuMobileToggled = !this.appOptions.appHeaderMegaMenuMobileToggled
    },
  },
}
</script>
