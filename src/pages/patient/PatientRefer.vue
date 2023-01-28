<template>
  <div>
    <b-modal id="modal-patient-refer" ref="modalPatientRefer" size="lg" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> ส่งต่อผู้ป่วย </template>
      <div>
        <b-card no-body class="bg-gray-100">
          <validation-observer tag="form" ref="form">
            <form @submit.stop.prevent="handleSubmit">
              <b-container fluid>
                <b-row class="mt-2">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">บันทึข้อมูลการส่งต่อผู้ป่วย</h6>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label class="fs-5">ชื่อ-สกุล ผู้ป่วย:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="9" xl="9" class="pb-1">
                    <b-form-input autocomplete="off" type="text" v-model="patient_name" disabled></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label class="fs-5">สถานพยาบาลรับส่งต่อ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="9" xl="9" class="pb-1">
                    <validation-provider :rules="{ required: true }" name="hospital_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="hospitals-list" v-model="hospital_code" :state="errors[0] ? false : valid ? true : null" autocomplete="off"></b-form-input>
                        <datalist id="hospitals-list">
                          <option v-for="(value, key) in hospitals_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">เหตุผลการส่ง Refer</h6>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="reson_diagnosis" value="1" unchecked-value="0"><span class="fs-5 topiclabel"> วินิจฉัยเพิ่มเติม</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="reson_diagnosis_excision" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> ส่งชิ้นเนื้อ</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_diagnosis_ct" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> CT</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_diagnosis_mri" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> MRI</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_diagnosis_bone" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> Bone Scan</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_diagnosis_mammogram" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> Mammogram</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_diagnosis_ultra" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> Ultrasound</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="reson_diagnosis_other" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> อื่น ๆ</span> </b-form-checkbox>
                        <b-form-input v-model="reson_diagnosis_other_text" inline></b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="reson_treat" value="1" unchecked-value="0"><span class="fs-5 topiclabel"> รักษาต่อ</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="reson_treat_radiation" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> รังสี</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_treat_surgery" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> ผ่าตัด</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_treat_chemo" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> เคมี</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="reson_treat_pallative" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> Pallative Care</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="reson_treat_other" value="1" unchecked-value="0" inline><span class="fs-5 topiclabel"> อื่น ๆ</span> </b-form-checkbox>
                        <b-form-input v-model="reson_treat_other_text" inline></b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="reson_right" value="1" unchecked-value="0"><span class="fs-5 topiclabel"> ตามสิทธิ</span> </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="reson_wanted" value="1" unchecked-value="0"><span class="fs-5 topiclabel"> ความต้องการของญาติผู้ป่วย</span> </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="reson_other" value="1" unchecked-value="0"><span class="fs-5 topiclabel"> อื่น ๆ</span> </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1" class="topiclabel"> </b-col>
                  <b-col sm="8" md="8" lg="10" xl="11" class="pb-3">
                    <validation-provider :rules="{}" name="note">
                      <b-form-group>
                        <b-form-textarea id="note" v-model="note" type="text" rows="5"></b-form-textarea>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </b-container>
            </form>
          </validation-observer>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'PatientRefer',
  data() {
    return {
      patient_id: null,
      patient_name: null,
      hospital_code: null,
      reson_diagnosis: 0,
      reson_diagnosis_excision: 0,
      reson_diagnosis_ct: 0,
      reson_diagnosis_mri: 0,
      reson_diagnosis_bone: 0,
      reson_diagnosis_mammogram: 0,
      reson_diagnosis_ultra: 0,
      reson_diagnosis_other: 0,
      reson_diagnosis_other_text: '',
      reson_treat: 0,
      reson_treat_radiation: 0,
      reson_treat_surgery: 0,
      reson_treat_chemo: 0,
      reson_treat_pallative: 0,
      reson_treat_other: 0,
      reson_treat_other_text: '',
      reson_right: 0,
      reson_wanted: 0,
      reson_other: 0,
      note: '',
      hospitals_list: [],
    }
  },
  watch: {
    hospital_code(newVal) {
      if (newVal != '') {
        this.getHospitals()
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
    showForm(id, full_name) {
      this.patient_id = id
      this.patient_name = full_name
      this.getReference()
      let loader = this.$loading.show()

      this.$nextTick(() => {
        this.$refs['modalPatientRefer'].show()
        loader.hide()
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
          patient_id: this.patient_id,
          from_hospital_code: this.currentUser.hosCode,
          to_hospital_code: this.hospital_code,
          reson_diagnosis: this.reson_diagnosis,
          reson_diagnosis_excision: this.reson_diagnosis_excision,
          reson_diagnosis_ct: this.reson_diagnosis_ct,
          reson_diagnosis_mri: this.reson_diagnosis_mri,
          reson_diagnosis_bone: this.reson_diagnosis_bone,
          reson_diagnosis_mammogram: this.reson_diagnosis_mammogram,
          reson_diagnosis_ultra: this.reson_diagnosis_ultra,
          reson_diagnosis_other: this.reson_diagnosis_other,
          reson_diagnosis_other_text: this.reson_diagnosis_other_text,
          reson_treat: this.reson_treat,
          reson_treat_radiation: this.reson_treat_radiation,
          reson_treat_surgery: this.reson_treat_surgery,
          reson_treat_chemo: this.reson_treat_chemo,
          reson_treat_pallative: this.reson_treat_pallative,
          reson_treat_other: this.reson_treat_other,
          reson_treat_other_text: this.reson_treat_other_text,
          reson_right: this.reson_right,
          reson_wanted: this.reson_wanted,
          reson_other: this.reson_other,
          note: this.note,
        }

        let loader = this.$loading.show()
        this.axios
          .post('tcb/refers', param)
          .then((res) => {
            if (res.data.status) {
              this.$nextTick(() => {
                this.$parent.loadItems()
                this.$bvModal.hide('modal-patient-refer')
                loader.hide()
              })
            } else {
              this.$toast.error(res.data.message)
              loader.hide()
            }
          })
          .catch((error) => {
            console.log(error.response.data.message)
            loader.hide()
          })
      })
    },
    getReference() {
      // this.axios.get('tcb/patients?t=get-hospitals-list').then((response) => {
      //   this.hospitals_list = response.data.hospitals_list
      // })
    },
    getHospitals() {
      this.axios.get('tcb/patients?t=get-hospitals-list&hospital_code=' + this.hospital_code).then((response) => {
        this.hospitals_list = response.data.hospitals_list
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
