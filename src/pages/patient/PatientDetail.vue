:
<template>
  <div>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb float-xl-end">
      <li class="breadcrumb-item"><router-link :to="{ name: 'home' }">หน้าหลัก</router-link></li>
      <li class="breadcrumb-item"><router-link :to="{ name: 'patient' }">ประวัติเวชระเบียน</router-link></li>
      <li class="breadcrumb-item active">รายละเอียดผู้ป่วย</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header mb-3">
      ประวัติเวชระเบียน <small>{{ curr_patient.name }} {{ curr_patient.last_name }}</small>
    </h1>

    <b-container fluid class="p-0">
      <b-row>
        <b-col md="12">
          <panel title="ข้อมูลบุคคล" bodyClass="p-0" class="">
            <b-card>
              <b-card-text>
                <b-row>
                  <b-col class="text-end">
                    <button type="button" class="btn btn-success ms-5px" @click="showPatientForm(curr_patient.id)"><i class="fas fa-pencil"></i> แก้ไขข้อมูลผู้ป่วย</button>
                    <button type="button" class="btn btn-xl btn-warning ms-5px" @click="showPatientAddCancer()"><i class="fas fa-pencil"></i> เพิ่มข้อมูลโรคมะเร็ง</button>
                    <button type="button" class="btn btn-xl btn-info ms-5px" @click="showPatientShowHistory()"><i class="fas fa-pencil"></i> ดูประวัติโรคมะเร็ง (anywhere)</button>
                    <button type="button" class="btn btn-xl btn-danger ms-5px" @click="showRefer(curr_patient.id, curr_patient.title_name + curr_patient.name + ' ' + curr_patient.last_name)"><i class="fas fa-truck"></i> ส่ง Refer</button>
                    <button type="button" class="btn btn-xl btn-primary ms-5px" @click="showPatientShowCancer()" v-show="currentUser.roleCancer == 'Y' && false ? true : false"><i class="fas fa-pencil"></i> ดูรายละเอียดโรคมะเร็ง</button>
                  </b-col>
                </b-row>
                <dl class="row pt-2">
                  <dt class="col-md-2 text-end topiclabel fs-5">สถานพยาบาล :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.hospital_name }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">HN :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.hn_no }}</dd>
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
                  <dt class="col-md-2 text-end topiclabel fs-5">โทรศัพท์ 1 :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.telephone_1 }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">โทรศัพท์ 2 :</dt>
                  <dd class="col-md-4 pt-1">{{ curr_patient.telephone_2 }}</dd>
                </dl>
              </b-card-text>
            </b-card>
          </panel>
        </b-col>
        <b-col md="5">
          <panel title="ข้อมูลการเข้ารับบริการ" bodyClass="p-0" class="">
            <b-card>
              <b-table bordered responsive :items="curr_cancers" :fields="cancer_field" @row-clicked="onRowSelected" class="tr-pointer">
                <template #cell(entrance_date)="data">
                  {{ data.value | moment('add', '543 years', 'DD/MM/YYYY') }}
                </template>
              </b-table>
            </b-card>
          </panel>
        </b-col>
        <b-col md="7" v-show="true">
          <b-row>
            <b-col md="12">
              <panel title="รายละเอียดข้อมูลโรคมะเร็ง" bodyClass="p-0" class="">
                <b-card>
                  <div class="table-responsive pt-5px">
                    <table class="table table-bordered">
                      <thead>
                        <tr class="align-middle text-center">
                          <th class="w-150px text-nowrap">รายการ</th>
                          <th class="">รายละเอียดข้อมูลโรคมะเร็ง</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">25. วันที่เข้ารับบริการ</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.entrance_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">26. สิทธิการรักษา</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.finance_support_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">27. ว/ด/ป ที่วินิจฉัย</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">28. วิธีวินิจฉัยในโรงพยาบาล</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.diagnosis_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">29. วินิจฉัยนอก รพ</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.diagnosis_out == null ? '' : curr_cancer.diagnosis_out == 1 ? 'Yes' : 'No' }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">30. วันที่ตัดชิ้นเนื้อ</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">31. วันที่อ่านชิ้นเนื้อ</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">32. Topography</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.topo_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">33. Recurrent</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.recurrent == null ? '' : curr_cancer.recurrent == 1 ? 'Yes' : 'No' }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">34. ว/ด/ป Recurrent</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">35. Morphology</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.morphology_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">36. Behaviour</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.behaviour_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">37. Grade</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.grade_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">38. T-N-M</th>
                          <td class="pt-1px pb-1px">{{ t_list_arr[curr_cancer.t_code] }} - {{ n_list_arr[curr_cancer.n_code] }} - {{ m_list_arr[curr_cancer.m_code] }}</td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">39. ว/ด/ป TNM/Stage</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">40. Stage</th>
                          <td class="pt-1px pb-1px">
                            {{ stage_list_arr[curr_cancer.stage_code] }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">41. Extend</th>
                          <td class="pt-1px pb-1px">
                            {{ extension_list_arr[curr_cancer.extension_code] }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">42. ICD-10</th>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.icd10_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">43. Metastasis</th>
                          <td class="pt-1px pb-1px">
                            <b-container fluid>
                              <b-row v-if="curr_cancer.met_1 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> Bone </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_1_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                              <b-row v-if="curr_cancer.met_2 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> Brain </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_2_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                              <b-row v-if="curr_cancer.met_3 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> Liver </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_3_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                              <b-row v-if="curr_cancer.met_4 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> Lung </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_4_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                              <b-row v-if="curr_cancer.met_5 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> Lymph Node </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_5_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                              <b-row v-if="curr_cancer.met_6 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> Peritoneum </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_6_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                              <b-row v-if="curr_cancer.met_7 == 1" class="pt-2">
                                <b-col md="6"><span class="fw-bold">ตำแหน่ง:</span> {{ curr_cancer.met_7_other }} </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ curr_cancer.met_7_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                              </b-row>
                            </b-container>
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">44. Treatment</th>
                          <td class="text-nowrap ps-0 pt-1px pb-1px">
                            <b-container fluid>
                              <b-row v-for="(treat, idx) in curr_cancer.treatments" :key="treat.id" class="pt-2">
                                <b-col md="12"><span class="fw-bold w-100px">Treatment :</span> {{ treat.treatment_code }}</b-col>
                                <b-col md="12">
                                  <span class="fw-bold">เริ่มต้น :</span> {{ treat.treatment_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                                  <span class="fw-bold">, สิ้นสุด :</span> {{ treat.treatment_date_end | moment('add', '543 years', 'DD/MM/YYYY') }}
                                </b-col>
                                <b-col md="12"><pre class="mb-2px">{{ treat.note }}</pre></b-col>
                                <b-col md="12" v-show="idx < curr_cancer.treatments.length - 1"><hr class="m-1" /></b-col>
                              </b-row>
                            </b-container>
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">45. Clinical Summary</th>
                          <td class="pt-1px pb-1px">
                            <pre class="mb-2px">{{ curr_cancer.clinical_summary }}</pre>
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <th class="w-150px text-nowrap">46. เอกสารแนบ</th>
                          <td class="text-nowrap ps-0 pt-1px pb-1px">
                            <b-container fluid>
                              <b-row v-for="file in curr_cancer.files" :key="file.id" class="pt-2">
                                <b-col md="5">
                                  {{ file_group_list[file.file_group_id] }}
                                </b-col>
                                <b-col md="7">
                                  <a :href="'https://canceranywhere.com:8081/' + file.file_path" target="_blank">{{ file.file_name }}</a>
                                </b-col>
                              </b-row>
                            </b-container>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <b-container>
                    <b-row>
                      <b-col class="text-end">
                        <button type="button" class="btn btn-danger ms-5px" @click="showDelete(curr_cancer.id)" :disabled="curr_cancer.id != undefined && curr_cancer.hospital_code == currentUser.hosCode ? false : true"><i class="fas fa-trash"></i> ลบข้อมูลโรคมะเร็ง</button>
                        <button type="button" class="btn btn-success ms-5px" @click="showPatientFormCancerUpdate(curr_cancer.id)" :disabled="curr_cancer.id != undefined && curr_cancer.hospital_code == currentUser.hosCode ? false : true"><i class="fas fa-pencil"></i> แก้ไขข้อมูลโรคมะเร็ง</button>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-card>
              </panel>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <patient-form-update ref="patient_form_update"></patient-form-update>
    <patient-form-cancer ref="patient_form_cancer"></patient-form-cancer>
    <patient-form-cancer-update ref="patient_form_cancer_update"></patient-form-cancer-update>
    <patient-form-cancer-sum ref="patient_form_cancer_sum"></patient-form-cancer-sum>
    <patient-form-history ref="patient_form_history"></patient-form-history>
    <patient-refer ref="patient_refer"></patient-refer>
  </div>
</template>

<script>
import moment from 'moment'
import Patient from '../../_models/patient'
import PatientCancer from '../../_models/patient_cancer'
import PatientFormUpdate from './PatientFormUpdate.vue'
import PatientFormCancer from './PatientFormCancer.vue'
import PatientFormCancerUpdate from './PatientFormCancerUpdate.vue'
import PatientFormCancerSum from './PatientFormCancerSum.vue'
import PatientFormHistory from './PatientFormHistory.vue'
import PatientRefer from './PatientRefer.vue'

export default {
  name: 'PatientDetail',
  components: {
    PatientFormUpdate,
    PatientFormCancer,
    PatientFormCancerUpdate,
    PatientFormCancerSum,
    PatientFormHistory,
    PatientRefer,
  },
  data() {
    return {
      curr_patient: new Patient(),
      curr_cancer: new PatientCancer(),
      curr_cancer_sum: new PatientCancer(),
      curr_cancers: [],
      cancer_field: [
        { key: 'entrance_date', label: 'วันที่รับบริการ', tdClass: 'text-center' },
        { key: 'name', label: 'โรงพยาบาล' },
        { key: 'icd10_code', label: 'ICD-10', tdClass: 'text-start' },
      ],
      diagnosis_list: [],
      icd10_list: [],
      icd10_list_arr: [],
      topo_list: [],
      treatment_list: [],
      morphology_list: [],
      behaviour_list: [],
      grade_list: [],
      t_list_arr: [],
      n_list_arr: [],
      m_list_arr: [],
      stage_list_arr: [],
      extension_list_arr: [],
      lifestatus_list: [],
      deathcause_list: [],
      recurent_list: [],
      laterality_list: [],
      file_group_list: ['', '1 Pathology report', '2 Imaging study', '3 LAB report', '4 Other'],
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
  mounted() {
    this.getReference()
    this.loadItems()
  },
  methods: {
    showPatientForm(id) {
      this.$refs.patient_form_update.showForm(id)
    },
    showPatientFormCancerUpdate(id) {
      this.$refs.patient_form_cancer_update.showForm(id)
      // console.log(id)
    },
    showRefer(id, full_name) {
      this.$refs.patient_refer.showForm(id, full_name)
    },
    // showPatientEditCancer(id) {
    //   this.$refs.patient_form_cancer.showForm(id)
    // },
    showDelete(id) {
      const h = this.$createElement
      const titleModal = h('div', { domProps: { innerHTML: '<i class="fa fa-trash"></i> ยืนยันการลบข้อมูล' } })
      this.$bvModal.msgBoxConfirm('ท่านต้องการลบข้อมูลโรคมะเร็งที่เลือกนี้ ใช่หรือไม่.', { title: [titleModal], size: 'sm', okVariant: 'danger', okTitle: 'ใช่', cancelTitle: 'ยกเลิก' }).then((value) => {
        if (value) {
          this.axios.delete(`tcb/cancers/${id}`).then(() => {
            this.$toast.success('ลบข้อมูลเรียบร้อย.')
            this.loadItems()
          })
        }
      })
    },
    showPatientAddCancer() {
      this.$refs.patient_form_cancer.showForm(this.curr_patient.id, {
        id: this.curr_patient.id,
        birth_date: moment(this.curr_patient.birth_date, 'YYYY-MM-DD').add(543, 'years').format('DD/MM/YYYY'),
        sex_code: this.curr_patient.sex_code,
      })
    },
    showPatientShowCancer() {
      this.$refs.patient_form_cancer_sum.showForm(this.curr_patient.id, {
        id: this.curr_patient.id,
        birth_date: moment(this.curr_patient.birth_date, 'YYYY-MM-DD').add(543, 'years').format('DD/MM/YYYY'),
        sex_code: this.curr_patient.sex_code,
      })
    },
    showPatientShowHistory() {
      this.$refs.patient_form_history.showForm(this.curr_patient.id, {
        id: this.curr_patient.id,
        birth_date: moment(this.curr_patient.birth_date, 'YYYY-MM-DD').add(543, 'years').format('DD/MM/YYYY'),
        sex_code: this.curr_patient.sex_code,
      })
    },
    loadItems() {
      let id = this.$route.params.id
      this.axios.get(`tcb/patients?t=get-patient-by-id&id=${id}`).then((res1) => {
        this.curr_patient = res1.data
        this.axios.get(`tcb/cancers?t=get-cancer-by-patient_id&patient_id=${this.curr_patient.id}`).then((res2) => {
          this.curr_cancers = res2.data
          this.$nextTick(() => {
            if (this.curr_cancers.length > 0) {
              this.curr_cancers[0]._rowVariant = 'danger'
              let loader = this.$loading.show()
              this.axios
                .get('tcb/cancers/' + this.curr_cancers[0].id)
                .then((response) => {
                  this.curr_cancer = response.data
                  loader.hide()
                })
                .catch((error) => {
                  console.log(error.response.data.message)
                  loader.hide()
                })
            }
          })
        })
        // this.axios.get(`tcb/cancersums?patient_id=${this.curr_patient.id}&detail=1`).then((res3) => {
        //   this.curr_cancer_sum = res3.data
        // })
      })
    },
    onRowSelected(items, idx) {
      if (this.curr_cancer.id != items.id) {
        this.curr_cancers.map((x) => (x._rowVariant = ''))
        this.curr_cancers[idx]._rowVariant = 'danger'
        let loader = this.$loading.show()
        this.axios
          .get('tcb/cancers/' + items.id)
          .then((response) => {
            this.curr_cancer = response.data
            loader.hide()
          })
          .catch((error) => {
            console.log(error.response.data.message)
            loader.hide()
          })
      }
    },
    getReference() {
      this.axios.get('tcb/cancers?t=get-reference').then((response) => {
        this.diagnosis_list = response.data.diagnosis_list
        this.icd10_list = response.data.icd10_list
        this.topo_list = response.data.topo_list
        this.treatment_list = response.data.treatment_list
        this.morphology_list = response.data.morphology_list
        this.behaviour_list = response.data.behaviour_list
        this.grade_list = response.data.grade_list
        this.lifestatus_list = response.data.lifestatus_list
        this.deathcause_list = response.data.deathcause_list
        this.recurent_list = response.data.recurent_list
        this.laterality_list = response.data.laterality_list

        Object.entries(response.data.t_list).map(([key, val]) => (this.t_list_arr[key] = val))
        Object.entries(response.data.n_list).map(([key, val]) => (this.n_list_arr[key] = val))
        Object.entries(response.data.m_list).map(([key, val]) => (this.m_list_arr[key] = val))
        Object.entries(response.data.icd10_list_arr).map(([key, val]) => (this.icd10_list_arr[key] = val))
        Object.entries(response.data.stage_list).map(([key, val]) => (this.stage_list_arr[key] = val))
        Object.entries(response.data.extension_list).map(([key, val]) => (this.extension_list_arr[key] = val))
        console.log(this.icd10_list_arr)
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
.tr-pointer tr {
  cursor: pointer;
}
</style>
