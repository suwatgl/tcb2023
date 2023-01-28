<template>
  <div>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb float-xl-end">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">หน้าหลัก</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header mb-3">หน้าหลัก</h1>
    <!-- END page-header -->
    <b-container fluid class="p-4 bg-cyan-100">
      <b-row>
        <b-col class="text-center mb-3">
          <b-img center thumbnail fluid src="/assets/img/logo/tcb2023.png" alt="Center image"></b-img>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-end">ชื่อ-สกุล :</b-col>
        <b-col>{{ currentUser ? currentUser.displayname : '' }}</b-col>
      </b-row>
      <b-row>
        <b-col class="text-end">สิทธิ์การบันทึกข้อมูล :</b-col>
        <b-col>{{ currentUser ? (currentUser.roleCancer == 'Y' ? 'ทะเบียนมะเร็ง' : 'Anywhere') : '' }}</b-col>
      </b-row>
      <b-row>
        <b-col class="text-end">Hospital :</b-col>
        <b-col>{{ currentUser ? currentUser.hosCode : '' }} : {{ currentUser ? currentUser.hosName : '' }}</b-col>
      </b-row>
      <b-row>
        <b-col class="text-center mt-5"> สถาบันมะเร็งแห่งชาติ กรมการแพทย์ กระทรวงสาธารณสุข </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AppOptions from '../config/AppOptions.vue'

export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {
    AppOptions.appEmpty = false
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    currentUser() {
      return this.$store.state.auth.user
    },
  },
}
</script>
