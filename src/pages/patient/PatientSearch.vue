<template>
  <div>
    <b-modal id="modal-patient-search" ref="modalPatientSearch" size="xl" :hide-footer="true">
      <template #modal-title> ค้นหาข้อมูลผู้ป่วยต่างโรงพยาบาล </template>
      <div>
        <b-card no-body class="bg-gray-100">
          <validation-observer tag="form" ref="form">
            <form @submit.stop.prevent="handleSubmit">
              <b-container fluid class="pb-10px">
                <b-row class="mt-2">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">ค้นหาข้อมูลผู้ป่วยต่างโรงพยาบาล</h6>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label for="input-hn-no" class="fs-5"> HN:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="43" xl="3" class="pb-1">
                    <validation-provider rules="required" name="hn_no">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input autocomplete="off" type="text" v-model="hn_no" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-0 mb-0">
                  <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                    <label for="input-hn-no" class="fs-5"> เลขบัตรประชาชน:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider rules="required|citizen_id_format" name="cid">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="1-1111-11111-11-1" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="cid" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="8" md="8" lg="4" xl="4" class="pb-1">
                    <button type="button" class="btn btn-xl btn-warning ms-5px" @click="patientSearch()"><i class="fas fa-plus"></i> ค้นหาผู้ป่วยต่าง รพ.</button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2" v-show="status">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">ผลการค้นหาข้อมูลผู้ป่วยต่างโรงพยาบาล</h6>
                  </b-col>
                </b-row>
                <dl class="row pt-2" v-show="status">
                  <dt class="col-md-2 text-end topiclabel fs-5">ชื่อ-สกุล :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.title_name }}{{ curr_patient.name }} {{ curr_patient.last_name }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">เลขบัตรประชาชน :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.cid }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">เพศ :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.sex_name }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">ว/ด/ป เกิด :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.birth_date | moment('add', '543 years', 'DD/MM/YYYY') }} (อายุปัจจุบัน {{ curr_patient.birth_date | moment('from', 'now', true) }})</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">ที่อยู่ :</dt>
                  <dd class="col-md-4 pt-1">เลขที่ {{ curr_patient.address_no }} ม.{{ curr_patient.address_moo }} ต.{{ curr_patient.sub_district_name_th }} อ.{{ curr_patient.district_name_th }} จ.{{ curr_patient.province_name_th }} {{ curr_patient.address_zipcode }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">อีเมล์ :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.email }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">เบอร์โทรศัพท์ 1 :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.telephone_1 }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">เบอร์โทรศัพท์ 2 :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.telephone_2 }}</dd>
                </dl>
                <div v-show="status">
                  <b-card no-body>
                    <b-tabs card>
                      <b-tab title="ประวัติข้อมูลโรคมะเร็ง" active>
                        <b-table-simple fixed responsive bordered>
                          <b-thead>
                            <b-tr class="align-middle text-center">
                              <b-th class="w-150px" sticky-column variant="info">รายการ</b-th>
                              <b-th class="w-200px" v-for="(cancer, idx) in curr_cancers" :key="cancer.id">รายละเอียดโรคมะเร็ง <br />ครั้งที่ {{ curr_cancers.length - idx }}</b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">สถานพยาบาล</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">{{ cancer.hospital_name }}</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">25. วันที่เข้ารับบริการ</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">{{ cancer.entrance_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">26. สิทธิการรักษา</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.finance_support_text }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">27. วันที่วินิจฉัย</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">28. วิธีวินิจฉัย</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.diagnosis_text }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">29. วินิจฉัยนอก รพ</b-td>
                              <b-td class="w-200px text-nowrap p-2" v-for="cancer in curr_cancers" :key="cancer.id">
                                <b-form-checkbox plain v-model="cancer.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">30. วันที่ตัดชิ้นเนื้อ</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">31. วันที่อ่านชิ้นเนื้อ</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">32. Topography</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.topo_text }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">33. Recurrent</b-td>
                              <b-td class="w-200px text-nowrap p-2" v-for="cancer in curr_cancers" :key="cancer.id">
                                <b-form-checkbox plain v-model="cancer.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">34. วันที่ Recurrent</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">35. Morphology</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.morphology_text }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">36. Behaviour</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.behaviour_text }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">37. Grade</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.grade_text }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">38. T-N-M</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id"> {{ t_list_arr[cancer.t_code] }} - {{ n_list_arr[cancer.n_code] }} - {{ m_list_arr[cancer.m_code] }} </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">39. วันที่ TNM/Stage</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">40. Stage</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ stage_list_arr[cancer.stage_code] }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">41. Extend</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ extension_list_arr[cancer.extension_code] }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">42. ICD-10</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                {{ cancer.icd10_code }}
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">43. Metastasis</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                <b-row>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_1" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Bone <span v-show="cancer.met_1 == 1"> ({{ cancer.met_1_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_2" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Brain <span v-show="cancer.met_2 == 1"> ({{ cancer.met_2_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_3" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Liver <span v-show="cancer.met_3 == 1"> ({{ cancer.met_3_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_4" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Lung <span v-show="cancer.met_4 == 1"> ({{ cancer.met_4_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_5" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Lymph Node <span v-show="cancer.met_5 == 1"> ({{ cancer.met_5_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_6" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Peritoneum <span v-show="cancer.met_6 == 1"> ({{ cancer.met_6_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                  <b-col md="12">
                                    <b-form-checkbox plain v-model="cancer.met_7" value="1" unchecked-value="0" disabled class="pb-5px">
                                      Other <span v-show="cancer.met_7 == 1"> ({{ cancer.met_7_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </b-form-checkbox>
                                  </b-col>
                                </b-row>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">44. Treatment</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                <b-row v-for="(treat, idx) in cancer.treatments" :key="treat.id">
                                  <b-col md="12">
                                    <span class="fw-bold">
                                      {{ treat.treatment_code }}<span v-show="treat.treatment_date"> ({{ treat.treatment_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                                    </span>
                                  </b-col>
                                  <b-col md="12">{{ treat.note }}</b-col>
                                  <b-col md="12" v-show="idx < cancer.treatments.length - 1"><hr class="m-1" /></b-col>
                                </b-row>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="w-150px fw-bold" sticky-column variant="info">45. Clinical Summary</b-td>
                              <b-td class="w-200px" v-for="cancer in curr_cancers" :key="cancer.id">
                                <pre class="mb-2px">{{ cancer.clinical_summary }}</pre>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </b-tab>
                      <b-tab title="ข้อมูลไฟล์แนบ">
                        <b-table-simple fixed responsive bordered>
                          <b-thead>
                            <b-tr class="align-middle text-center">
                              <b-th class="w-200px">วันที่ Upload เอกสาร</b-th>
                              <b-th class="w-200px">ประเภทเอกสาร</b-th>
                              <b-th class="">เอกสาร</b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody>
                            <b-tr v-if="curr_files.length == 0">
                              <b-td colspan="3" class="text-center"><span class="fs-3 text-red-600">ไม่พบไฟล์เอกสารแนบ</span></b-td>
                            </b-tr>
                            <b-tr v-for="file in curr_files" :key="file.id">
                              <b-td class="w-150px fw-bold text-center">{{ file.created_at | moment('add', '543 years', 'DD/MM/YYYY HH:mm:ss') }}</b-td>
                              <b-td class="w-200px">{{ file_group_list[file.file_group_id] }}</b-td>
                              <b-td class="">
                                <a :href="'https://canceranywhere.com:8081/' + file.file_path" target="_blank">{{ file.file_name }}</a>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </b-tab>
                    </b-tabs>
                  </b-card>
                  <b-row>
                    <b-col class="pt-2 pb-1 text-end">
                      <button type="button" class="btn btn-lg btn-primary ms-5px" @click="patientSearch()"><i class="fas fa-plus"></i> นำไปใช้ ทะเบียนมะเร็ง/Anywhere</button>
                    </b-col>
                  </b-row>
                </div>
              </b-container>
            </form>
          </validation-observer>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Patient from '../../_models/patient'
// import PatientCancer from '../../_models/patient_cancer'

export default {
  name: 'PatientSearch',
  data() {
    return {
      status: false,
      hn_no: null,
      cid: null,
      curr_patient: new Patient(null, null),
      curr_cancers: [],
      curr_files: [],
      file_group_list: ['', '1 Pathology report', '2 Imaging study', '3 LAB report', '4 Other'],
      t_list_arr: [],
      n_list_arr: [],
      m_list_arr: [],
      stage_list_arr: [],
      extension_list_arr: [],
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
    showForm() {
      let loader = this.$loading.show()
      this.getReference()
      this.status = false
      this.curr_patient = new Patient(null, null)
      this.curr_cancers = []
      this.curr_files = []

      this.$nextTick(() => {
        this.$refs['modalPatientSearch'].show()
        loader.hide()
      })
    },
    patientSearch() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          this.$toast.error('ข้อมูลไม่ครบถ้วนสมบูรณ์ กรุณาตรวจสอบอีกครั้ง !')
          return
        }

        let loader = this.$loading.show()
        this.axios
          .get(`tcb/patients?t=get-patient-search&cid=${this.cid}`)
          .then((response) => {
            this.status = response.data.status
            if (response.data.status) {
              this.curr_patient = response.data.curr_patient
              this.curr_cancers = response.data.curr_cancers
              this.curr_files = response.data.curr_files
            } else {
              this.curr_patient = new Patient(null, null)
              this.curr_cancers = []
              this.curr_files = []
              this.$toast.error(response.data.message)
            }

            this.$nextTick(() => {
              loader.hide()
            })
          })
          .catch((error) => {
            loader.hide()
            console.log(error.response.data.message)
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
      })
    },
    getReference() {
      this.axios.get('tcb/cancers?t=get-reference').then((response) => {
        Object.entries(response.data.t_list).map(([key, val]) => (this.t_list_arr[key] = val))
        Object.entries(response.data.n_list).map(([key, val]) => (this.n_list_arr[key] = val))
        Object.entries(response.data.m_list).map(([key, val]) => (this.m_list_arr[key] = val))

        Object.entries(response.data.stage_list).map(([key, val]) => (this.stage_list_arr[key] = val))
        Object.entries(response.data.extension_list).map(([key, val]) => (this.extension_list_arr[key] = val))
      })
    },
  },
}
</script>

<style></style>
