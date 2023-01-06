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
        <b-col>รังสิยา บัวส้ม</b-col>
      </b-row>
      <b-row>
        <b-col class="text-end">สิทธิ์การบันทึกข้อมูล :</b-col>
        <b-col>ทะเบียนมะเร็ง</b-col>
      </b-row>
      <b-row>
        <b-col class="text-end">Hospital :</b-col>
        <b-col>12250 : มะเร็งแห่งชาติ</b-col>
      </b-row>
      <b-row>
        <b-col class="text-center mt-5"> สถาบันมะเร็งแห่งชาติ กรมการแพทย์ กระทรวงสาธารณสุข </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'dashboard-v3',
  data() {},
  methods: {},
  filters: {},
}
</script>
