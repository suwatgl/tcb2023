<template>
  <div>
    <b-modal id="modal-refer-form-request" ref="modalReferFormRequest" size="lg" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> ระบุข้อมูลการขอข้อมูลเพิ่มเติมสำหรับการรับ Refer</template>
      <b-container fluid no-padding>
        <b-card no-body class="bg-gray-100">
          <validation-observer tag="form" ref="form">
            <form @submit.stop.prevent="handleSubmit">
              <b-container fluid>
                <b-row class="mt-2">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">บันทึข้อมูลรับ Refer</h6>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label class="fs-5">Refer จาก :</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="9" xl="9" class="pb-1">
                    <b-form-input autocomplete="off" type="text" v-model="from_hospital_name" disabled></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label class="fs-5">ชื่อ-สกุล ผู้ป่วย :</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="9" xl="9" class="pb-1">
                    <b-form-input autocomplete="off" type="text" v-model="patient_name" disabled></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label class="fs-5">ข้อความแจ้งขอข้อมูล :</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="9" xl="9" class="pb-1">
                    <b-form-textarea autocomplete="off" type="text" v-model="message" rows="10"></b-form-textarea>
                  </b-col>
                </b-row>
              </b-container>
            </form>
          </validation-observer>
        </b-card>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'referFormRequest',
  data() {
    return {
      patient_id: null,
      refer_id: null,
      from_hospital_name: '',
      patient_name: '',
      appoint_date: null,
      message: '',
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
    showForm(patient_id, refer_id) {
      this.patient_id = patient_id
      this.refer_id = refer_id
      let loader = this.$loading.show()
      this.axios.get(`tcb/refers/${refer_id}`).then((res) => {
        this.from_hospital_name = res.data.from_hospital_name
        this.patient_name = res.data.title_name + res.data.name + ' ' + res.data.last_name
        this.appoint_date= null
        this.message = ''
        this.$nextTick(() => {
          this.$refs['modalReferFormRequest'].show()
          loader.hide()
        })
      })
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          this.$toast.error('ข้อมูลไม่ครบถ้วนสมบูรณ์ กรุณาตรวจสอบอีกครั้ง !')
          return
        }

        let param = {
          status: 1, 
          message: this.message
        }

        let loader = this.$loading.show()
        this.axios.put(`tcb/refers/${this.refer_id}`, param).then(() => {
          this.$toast.success('ยืนยันการขอข้อมูล Refer เพิ่มเติมเรียบร้อย.')
          this.$nextTick(() => {
            this.$parent.loadItems()
            this.$bvModal.hide('modal-refer-form-request')
            loader.hide()
          })
        })
      })
    },
  },
}
</script>

<style scope>
.topiclabel {
  color: rgb(8, 88, 8);
  font-weight: bolder;
  text-align: right;
}
</style>