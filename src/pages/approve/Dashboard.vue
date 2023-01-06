<template>
  <div>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb float-xl-end">
      <li class="breadcrumb-item"><a href="javascript:;">หน้าหลัก</a></li>
      <li class="breadcrumb-item active">ประวัติรอ Approve</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header mb-3">
      ประวัติรอ Approve <small>{{ currentUser ? currentUser.hosName : '' }}</small>
    </h1>

    <b-container fluid class="">
      <b-row>
        <b-col>
          <approve-table></approve-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ApproveTable from './ApproveTable.vue'

export default {
  name: 'Dashboard',
  components: {
    ApproveTable,
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
