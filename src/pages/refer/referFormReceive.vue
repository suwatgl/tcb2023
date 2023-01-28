<template>
  <div>
    <b-modal id="modal-refer-form-receive" ref="modalReferFormReceive" size="lg" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> ระบุข้อมูลการรับ Refer</template>
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
                    <label class="fs-5">วันที่นัดหมาย :</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="9" xl="9" class="pb-1">
                    <validation-provider rules="required|date_format_th" name="appoint_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="appoint_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label class="fs-5">ข้อความแจ้งเตือน :</label>
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
import moment from 'moment'

export default {
  name: 'referFormReceive',
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
  watch: {
    appoint_date(newVal) {
      this.message = null
      if (newVal == null || newVal == '') return
      if (moment(newVal, 'DD/MM/YYYY', true).isValid()) {
        this.message = `กรุณาติดต่อ ${this.currentUser.hosName} ในวันที่ ${newVal}
ถ้าไม่สะดวกกรุณาติดต่อ...`
      }
    },
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
          this.$refs['modalReferFormReceive'].show()
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
          status: 2, 
          appoint_date: this.appoint_date, 
          message: this.message
        }

        let loader = this.$loading.show()
        this.axios.put(`tcb/refers/${this.refer_id}`, param).then(() => {
          this.$toast.success('ยืนยันการรับ Refer เรียบร้อย.')
          this.$nextTick(() => {
            this.$parent.loadItems()
            this.$bvModal.hide('modal-refer-form-receive')
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
