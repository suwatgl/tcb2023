<template>
  <div>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb float-xl-end">
      <li class="breadcrumb-item"><router-link :to="{ name: 'home' }">หน้าหลัก</router-link></li>
      <li class="breadcrumb-item active">ประวัติเวชระเบียน</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header mb-3">
      ประวัติเวชระเบียน <small>{{ currentUser ? currentUser.hosName : '' }}</small>
    </h1>

    <b-container fluid class="">
      <b-row>
        <b-col>
          <patient-table></patient-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PatientTable from './PatientTable.vue'

export default {
  name: 'Dashboard',
  components: {
    PatientTable,
  },
  data() {
    return {}
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {},
}
</script>

<style></style>
