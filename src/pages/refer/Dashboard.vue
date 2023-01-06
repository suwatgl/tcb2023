<template>
  <div>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb float-xl-end">
      <li class="breadcrumb-item"><router-link :to="{ name: 'home' }">หน้าหลัก</router-link></li>
      <li class="breadcrumb-item active">รับ Refer</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header mb-3">
      รับ Refer <small>{{ currentUser ? currentUser.hosName : '' }}</small>
    </h1>

    <panel title="รายชื่อผู้ป่วยรอรับ Refer จากสถานพยาบาลอื่น" bodyClass="p-0" class="">
      <refer-receive-table></refer-receive-table>
    </panel>
  </div>
</template>

<script>
import ReferReceiveTable from './ReferReceiveTable.vue'

export default {
  name: 'Dashboard',
  components: {
    ReferReceiveTable,
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
