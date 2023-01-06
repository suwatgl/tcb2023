<template>
  <div>
    <b-modal id="modal-patient-form-update" ref="modalPatientFormUpdate" size="xl" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> แก้ไขข้อมูลผู้ป่วย </template>
      <div>
        <b-card no-body>
          <validation-observer tag="form" ref="form">
            <form @submit.stop.prevent="handleSubmit">
              <b-container fluid>
                <b-row class="mt-2">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">ข้อมูลทั่วไป</h6>
                  </b-col>
                </b-row>
                <b-row class="mt-1 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-hos-code" class="fs-5">1. สถานพยาบาล:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                    <b-form-select class="form-select" id="input-hos-code" v-model="curr_patient.hospital_code" :options="hos_list" disabled></b-form-select>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-hn-no" class="fs-5">2. HN:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                    <validation-provider rules="required" name="hn_no">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.hn_no" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-title-code" class="fs-5">3. คำนำหน้า:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="title_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-title-code" class="form-select" plain v-model="curr_patient.title_code" :options="title_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-name" class="fs-5">4. ชื่อ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="name">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.name" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-last-name" class="fs-5">5. นามสกุล:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="last_name">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.last_name" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-cid" class="fs-5">6. เลขบัตรประชาชน:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required|citizen_id_format" name="cid">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="1-1111-11111-11-1" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_patient.cid" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-birth-date" class="fs-5">7. ว/ด/ป เกิด (พ.ศ.):</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required|date_format_th" name="birth_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_patient.birth_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-sex-code" class="fs-5">8. เพศ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="sex_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-sex-code" class="form-select" plain v-model="curr_patient.sex_code" :options="sex_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-nationality-code" class="fs-5">9. สัญชาติ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="nationality_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-nationality-code" class="form-select" plain v-model="curr_patient.nationality_code" :options="nationality_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-death" class="fs-5">10. ว/ด/ป ที่เสียชีวิต:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="date_format_th" name="death_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_patient.death_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-deathcause" class="fs-5">11. สาเหตุการเสียชีวิต:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="" name="deathcause_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-deathcause" class="form-select" plain v-model="curr_patient.deathcause_code" :options="deathcause_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2">
                    <h6 class="text-pink-600 fs-5 pt-2">ที่อยู่ตามทะเบียนบ้าน</h6>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mb-2">
                    <b-button size="sm" variant="success" @click="setAddress"><i class="fas fa-circle-chevron-down"></i></b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-address-no" class="fs-5">12. บ้านเลขที่:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="address_no">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.address_no" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-address-moo" class="fs-5">13. หมู่ที่:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="numeric" name="address_moo">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.address_moo" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-address-province-id" class="fs-5">14. จังหวัด:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="address_province_id">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-address-province-id" class="form-select" @change="changeProvince()" plain v-model="curr_patient.address_province_id" :options="address_province_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-address-district-id" class="fs-5">15. อำเภอ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="address_district_id">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-address-district-id" class="form-select" @change="changeDistrict()" plain v-model="curr_patient.address_district_id" :options="address_district_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-address-sub-district-id" class="fs-5">16. ตำบล:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="address_sub_district_id">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-address-sub-district-id" class="form-select" plain v-model="curr_patient.address_sub_district_id" :options="address_sub_district_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2">
                    <h6 class="text-pink-600 fs-5 pt-2">ที่อยู่ที่ติดต่อได้</h6>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mb-2">
                    <b-button size="sm" variant="success" @click="setAddressPer"><i class="fas fa-circle-chevron-up"></i></b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-premanent-address-no" class="fs-5">17. บ้านเลขที่:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="permanent_address_no">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.permanent_address_no" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-premanent-address-moo" class="fs-5">18. หมู่ที่:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="numeric" name="permanent_address_moo">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.permanent_address_moo" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-premanent-address-province-id" class="fs-5">19. จังหวัด:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="permanent_address_province_id">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-premanent-address-province-id" class="form-select" @change="changePerProvince()" plain v-model="curr_patient.permanent_address_province_id" :options="permanent_address_province_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-premanent-address-district-id" class="fs-5">20. อำเภอ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="permanent_address_district_id">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-premanent-address-district-id" class="form-select" @change="changePerDistrict()" plain v-model="curr_patient.permanent_address_district_id" :options="permanent_address_district_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-premanent-address-sub-district-id" class="fs-5">21. ตำบล:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="required" name="permanent_address_sub_district_id">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-premanent-address-sub-district-id" class="form-select" plain v-model="curr_patient.permanent_address_sub_district_id" :options="permanent_address_sub_district_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-email" class="fs-5">22. E-mail:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="email" name="email">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.email" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-telephone_1" class="fs-5">23. เบอร์โทรศัพท์ 1:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="" name="telephone_1">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.telephone_1" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-telephone_2" class="fs-5">24. เบอร์โทรศัพท์ 2:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="" name="telephone_2">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="curr_patient.telephone_2" :state="errors[0] ? false : valid ? true : null"></b-form-input>
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
import moment from 'moment'
import Patient from '../../_models/patient'

export default {
  name: 'PatientFormUpdate',
  data() {
    return {
      create_mode: true,
      curr_patient: new Patient(null, null),
      hos_list: [],
      title_list: [],
      sex_list: [],
      nationality_list: [],
      deathcause_list: [],
      address_province_list: [],
      address_district_list: [],
      address_sub_district_list: [],
      permanent_address_province_list: [],
      permanent_address_district_list: [],
      permanent_address_sub_district_list: [],
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
    showForm(id) {
      let loader = this.$loading.show()
      this.create_mode = false
      this.getReference(id)
      this.axios.get(`tcb/patients/${id}`).then((response) => {
        this.curr_patient = new Patient(response.data.id, response.data)
        this.curr_patient.birth_date = moment(response.data.birth_date).add(543, 'years').format('DD/MM/YYYY')
        this.$nextTick(() => {
          this.$refs['modalPatientFormUpdate'].show()
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

        this.axios
          .put(`tcb/patients/${this.curr_patient.id}`, this.curr_patient)
          .then((res) => {
            if (res.data.status) {
              this.$toast.success(res.data.message)
              this.$parent.loadItems()
              this.$nextTick(() => {
                this.$bvModal.hide('modal-patient-form-update')
              })
            } else {
              this.$toast.error(res.data.message)
            }
          })
          .catch((error) => {
            console.log(error.response.data.message)
          })
      })
    },
    getReference(id) {
      this.axios.get('tcb/patients?t=get-reference' + (id ? '&id=' + id : '')).then((response) => {
        this.curr_patient.hospital_code = this.currentUser.hosCode
        this.curr_patient.address_province_id = response.data.address_province_id
        this.curr_patient.address_district_id = response.data.address_district_id
        this.curr_patient.address_sub_district_id = response.data.address_sub_district_id
        this.curr_patient.permanent_address_province_id = response.data.permanent_address_province_id
        this.curr_patient.permanent_address_district_id = response.data.permanent_address_district_id
        this.curr_patient.permanent_address_sub_district_id = response.data.permanent_address_sub_district_id

        this.hos_list = [{ value: this.currentUser.hosCode, text: this.currentUser.hosName }]
        this.title_list = response.data.title_list
        this.sex_list = response.data.sex_list
        this.nationality_list = response.data.nationality_list
        this.deathcause_list = response.data.deathcause_list
        this.address_province_list = response.data.address_province_list
        this.address_district_list = response.data.address_district_list
        this.address_sub_district_list = response.data.address_sub_district_list
        this.permanent_address_province_list = response.data.permanent_address_province_list
        this.permanent_address_district_list = response.data.permanent_address_district_list
        this.permanent_address_sub_district_list = response.data.permanent_address_sub_district_list
      })
    },
    changeProvince() {
      this.address_sub_district_list = []
      this.address_district_list = []
      this.curr_patient.address_sub_district_id = ''
      this.curr_patient.address_district_id = ''
      if (this.curr_patient.address_province_id) {
        let url = `tcb/patients?t=get-reference-districts&province_id=${this.curr_patient.address_province_id}`
        this.axios.get(url).then((response) => {
          this.address_district_list = response.data.district_list
        })
      }
    },
    changeDistrict() {
      this.address_sub_district_list = []
      this.curr_patient.address_sub_district_id = ''
      if (this.curr_patient.address_district_id) {
        let url = `tcb/patients?t=get-reference-sub-districts&district_id=${this.curr_patient.address_district_id}`
        this.axios.get(url).then((response) => {
          this.address_sub_district_list = response.data.sub_district_list
        })
      }
    },
    changePerProvince() {
      this.permanent_address_sub_district_list = []
      this.permanent_address_district_list = []
      this.curr_patient.permanent_address_sub_district_id = ''
      this.curr_patient.permanent_address_district_id = ''
      if (this.curr_patient.permanent_address_province_id) {
        let url = `tcb/patients?t=get-reference-districts&province_id=${this.curr_patient.permanent_address_province_id}`
        this.axios.get(url).then((response) => {
          this.permanent_address_district_list = response.data.district_list
        })
      }
    },
    changePerDistrict() {
      this.permanent_address_sub_district_list = []
      this.curr_patient.permanent_address_sub_district_id = ''
      if (this.curr_patient.permanent_address_district_id) {
        let url = `tcb/patients?t=get-reference-sub-districts&district_id=${this.curr_patient.permanent_address_district_id}`
        this.axios.get(url).then((response) => {
          this.permanent_address_sub_district_list = response.data.sub_district_list
        })
      }
    },
    setAddress() {
      this.permanent_address_province_list = this.address_province_list
      this.permanent_address_district_list = this.address_district_list
      this.permanent_address_sub_district_list = this.address_sub_district_list

      this.curr_patient.permanent_address_no = this.curr_patient.address_no
      this.curr_patient.permanent_address_moo = this.curr_patient.address_moo
      this.curr_patient.permanent_address_zipcode = this.curr_patient.address_zipcode
      this.curr_patient.permanent_address_province_id = this.curr_patient.address_province_id
      this.curr_patient.permanent_address_district_id = this.curr_patient.address_district_id
      this.curr_patient.permanent_address_sub_district_id = this.curr_patient.address_sub_district_id
    },
    setAddressPer() {
      this.address_province_list = this.permanent_address_province_list
      this.address_district_list = this.permanent_address_district_list
      this.address_sub_district_list = this.permanent_address_sub_district_list
      this.curr_patient.address_no = this.curr_patient.permanent_address_no
      this.curr_patient.address_moo = this.curr_patient.permanent_address_moo
      this.curr_patient.address_zipcode = this.curr_patient.permanent_address_zipcode
      this.curr_patient.address_province_id = this.curr_patient.permanent_address_province_id
      this.curr_patient.address_district_id = this.curr_patient.permanent_address_district_id
      this.curr_patient.address_sub_district_id = this.curr_patient.permanent_address_sub_district_id
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
