<template>
  <div>
    <b-modal id="modal-refer-form-reject" ref="modalReferFormReject" size="lg" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> ระบุข้อมูลการปฏิเสธการ Refer</template>
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
                  <b-col>
                    <h6 class="text-pink-600 fs-5">เหตุผลการปฏิเสธการรับ Refer</h6>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-1 topiclabel">
                    <label class="fs-5">ด้านบุคลากร :</label>
                  </b-col>
                  <b-col sm="4" md="4" lg="1" xl="1" class="pt-2 pb-2">
                    <b-form-checkbox plain v-model="reson_reject_1" value="1" unchecked-value="0"><span class="fs-5 topiclabel"></span> </b-form-checkbox>
                  </b-col>
                  <b-col sm="8" md="8" lg="8" xl="8" class="pb-2">
                    <b-form-textarea autocomplete="off" v-model="reson_reject_1_text" rows="3" :disabled="reson_reject_1 == 0 ? true : false"></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-1 topiclabel">
                    <label class="fs-5">ด้านเครื่องมือ :</label>
                  </b-col>
                  <b-col sm="4" md="4" lg="1" xl="1" class="pt-2 pb-2">
                    <b-form-checkbox plain v-model="reson_reject_2" value="1" unchecked-value="0"><span class="fs-5 topiclabel"></span> </b-form-checkbox>
                  </b-col>
                  <b-col sm="8" md="8" lg="8" xl="8" class="pb-2">
                    <b-form-textarea autocomplete="off" v-model="reson_reject_2_text" rows="3" :disabled="reson_reject_2 == 0 ? true : false"></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-1 topiclabel">
                    <label class="fs-5">ด้านระบบบริการ :</label>
                  </b-col>
                  <b-col sm="4" md="4" lg="1" xl="1" class="pt-2 pb-2">
                    <b-form-checkbox plain v-model="reson_reject_3" value="1" unchecked-value="0"><span class="fs-5 topiclabel"></span> </b-form-checkbox>
                  </b-col>
                  <b-col sm="8" md="8" lg="8" xl="8" class="pb-2">
                    <b-form-textarea autocomplete="off" v-model="reson_reject_3_text" rows="3" :disabled="reson_reject_3 == 0 ? true : false"></b-form-textarea>
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
  name: 'referFormReject',
  data() {
    return {
      patient_id: null,
      refer_id: null,
      from_hospital_name: '',
      patient_name: '',
      reson_reject_1: 0,
      reson_reject_1_text: '',
      reson_reject_2: 0,
      reson_reject_2_text: '',
      reson_reject_3: 0,
      reson_reject_3_text: '',
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
  watch: {
    reson_reject_1(newVal) {
      if (newVal == 0) {
        this.reson_reject_1_text = ''
      } else {
        this.reson_reject_1_text = 'กรุณาอธิบายเพิ่มเติม...'
      }
    },
    reson_reject_2(newVal) {
      if (newVal == 0) {
        this.reson_reject_2_text = ''
      } else {
        this.reson_reject_2_text = 'กรุณาอธิบายเพิ่มเติม...'
      }
    },
    reson_reject_3(newVal) {
      if (newVal == 0) {
        this.reson_reject_3_text = ''
      } else {
        this.reson_reject_3_text = 'กรุณาอธิบายเพิ่มเติม...'
      }
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
        this.reson_reject_1 = 0
        this.reson_reject_1_text = ''
        this.reson_reject_2 = 0
        this.reson_reject_2_text = ''
        this.reson_reject_3 = 0
        this.reson_reject_3_text = ''
        this.$nextTick(() => {
          this.$refs['modalReferFormReject'].show()
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
          status: 3,
          reson_reject_1: this.reson_reject_1,
          reson_reject_1_text: this.reson_reject_1 == 1 ? this.reson_reject_1_text : '',
          reson_reject_2: this.reson_reject_2,
          reson_reject_2_text: this.reson_reject_2 == 1 ? this.reson_reject_2_text : '',
          reson_reject_3: this.reson_reject_3,
          reson_reject_3_text: this.reson_reject_3 == 1 ? this.reson_reject_3_text : '',
        }

        let loader = this.$loading.show()
        this.axios.put(`tcb/refers/${this.refer_id}`, param).then(() => {
          this.$toast.success('ยืนยันการปฏิเสธการรับ Refer เรียบร้อย.')
          this.$nextTick(() => {
            this.$parent.loadItems()
            this.$bvModal.hide('modal-refer-form-reject')
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
