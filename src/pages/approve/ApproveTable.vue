<template>
  <div>
    <panel title="รายชื่อรอ Approve ครั้งแรก" bodyClass="p-0" class="">
      <table1></table1>
    </panel>

    <panel title="รายชื่อที่มีประวัติเพิ่มเติม รอ Approve" bodyClass="p-0" class="">
      <table2></table2>
    </panel>
  </div>
</template>

<script>
import Table1 from './Table1.vue'
import Table2 from './Table2.vue'

export default {
  name: 'ApproveTable',
  components: {
    Table1,
    Table2,
  },
}
</script>

<style></style>
