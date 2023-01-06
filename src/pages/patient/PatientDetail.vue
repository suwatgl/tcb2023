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
                    <button type="button" class="btn btn-xl btn-primary ms-5px" @click="showPatientShowCancer()" v-show="currentUser.roleCancer == 'Y' && false ? true : false"><i class="fas fa-pencil"></i> ดูรายละเอียดโรคมะเร็ง</button>
                  </b-col>
                </b-row>
                <dl class="row pt-2">
                  <dt class="col-md-2 text-end topiclabel fs-5">HN :</dt>
                  <dd class="col-md-4">{{ curr_patient.hn_no }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">ชื่อ-สกุล :</dt>
                  <dd class="col-md-4">{{ curr_patient.title_name }}{{ curr_patient.name }} {{ curr_patient.last_name }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">เลขบัตรประชาชน :</dt>
                  <dd class="col-md-4">{{ curr_patient.cid }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">ว/ด/ป เกิด :</dt>
                  <dd class="col-md-4">{{ curr_patient.birth_date | moment('add', '543 years', 'DD/MM/YYYY') }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">เพศ :</dt>
                  <dd class="col-md-4">{{ curr_patient.sex_name }}</dd>
                  <dt class="col-md-2 text-end topiclabel fs-5">อายุ :</dt>
                  <dd class="col-md-4">{{ curr_patient.birth_date | moment('from', 'now') }}</dd>
                </dl>
              </b-card-text>
            </b-card>
          </panel>
        </b-col>
        <b-col md="5">
          <panel title="ข้อมูลการเข้ารับบริการ" bodyClass="p-0" class="">
            <b-card>
              <b-table :items="cancer_item" :fields="cancer_field" select-mode="single" ref="selectableTable" selectable selected-variant="danger" @row-selected="onRowSelected" hover bordered responsive>
                <template #cell(index)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(hospital_code)="data">
                  {{ data.value }}
                </template>
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
                          <th class="w-45px">ลำดับ</th>
                          <th class="w-150px text-nowrap">รายการ</th>
                          <th class="">รายละเอียดข้อมูลโรคมะเร็ง</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="align-middle">
                          <td class="w-45px text-center">25</td>
                          <td class="w-150px text-nowrap">วันที่เข้ารับบริการ</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.entrance_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">26</td>
                          <td class="w-150px text-nowrap">สิทธิการรักษา</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.finance_support_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">27</td>
                          <td class="w-150px text-nowrap">ว/ด/ป ที่วินิจฉัย</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">28</td>
                          <td class="w-150px text-nowrap">วิธีวินิจฉัยในโรงพยาบาล</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.diagnosis_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">29</td>
                          <td class="w-150px text-nowrap">วินิจฉัยนอก รพ</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.diagnosis_out == 1 ? 'Yes' : 'No' }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">30</td>
                          <td class="w-150px text-nowrap">วันที่ตัดชิ้นเนื้อ</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">31</td>
                          <td class="w-150px text-nowrap">วันที่อ่านชิ้นเนื้อ</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">32</td>
                          <td class="w-150px text-nowrap">Topography</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.topo_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">33</td>
                          <td class="w-150px text-nowrap">Recurrent</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.recurrent == 1 ? 'Yes' : 'No' }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">34</td>
                          <td class="w-150px text-nowrap">ว/ด/ป Recurrent</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">35</td>
                          <td class="w-150px text-nowrap">Morphology</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.morphology_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">36</td>
                          <td class="w-150px text-nowrap">Behaviour</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.behaviour_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">37</td>
                          <td class="w-150px text-nowrap">Grade</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.grade_text }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">38</td>
                          <td class="w-150px text-nowrap">T-N-M</td>
                          <td class="pt-1px pb-1px">{{ curr_cancer.t_code }} - {{ curr_cancer.n_code }} - {{ curr_cancer.m_code }}</td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">39</td>
                          <td class="w-150px text-nowrap">ว/ด/ป TNM/Stage</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">40</td>
                          <td class="w-150px text-nowrap">Stage</td>
                          <td class="pt-1px pb-1px">
                            {{ stage_list[curr_cancer.stage_code] }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">41</td>
                          <td class="w-150px text-nowrap">Extend</td>
                          <td class="pt-1px pb-1px">
                            {{ extend_list[curr_cancer.extension_code] }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">42</td>
                          <td class="w-150px text-nowrap">ICD-10</td>
                          <td class="pt-1px pb-1px">
                            {{ curr_cancer.icd10_code }}
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">43</td>
                          <td class="w-150px text-nowrap">Metastasis</td>
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
                          <td class="w-45px text-center">44</td>
                          <td class="w-150px text-nowrap">Treatment</td>
                          <td class="text-nowrap ps-0 pt-1px pb-1px">
                            <b-container fluid>
                              <b-row v-for="(treat, idx) in curr_cancer.treatments" :key="treat.id" class="pt-2">
                                <b-col md="6">
                                  <span class="fw-bold">{{ treat.treatment_code }}</span>
                                </b-col>
                                <b-col md="6"><span class="fw-bold">วันที่:</span> {{ treat.treatment_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                                <b-col md="12">
                                  <span class="fw-bold">Note:</span>
                                  <pre class="mb-2px">{{ treat.note }}</pre>
                                </b-col>
                                <b-col md="12" v-show="idx < curr_cancer.treatments.length - 1"><hr class="m-1" /></b-col>
                              </b-row>
                            </b-container>
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">45</td>
                          <td class="w-150px text-nowrap">Clinical Summary</td>
                          <td class="pt-1px pb-1px">
                            <pre class="mb-2px">{{ curr_cancer.clinical_summary }}</pre>
                          </td>
                        </tr>
                        <tr class="align-middle">
                          <td class="w-45px text-center">46</td>
                          <td class="w-150px text-nowrap">เอกสารแนบ</td>
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
                        <button type="button" class="btn btn-success ms-5px" @click="showPatientFormCancerUpdate(curr_cancer.id)" :disabled="curr_cancer.id != undefined ? false : true"><i class="fas fa-pencil"></i> แก้ไขข้อมูลโรคมะเร็ง</button>
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

export default {
  name: 'PatientDetail',
  components: {
    PatientFormUpdate,
    PatientFormCancer,
    PatientFormCancerUpdate,
    PatientFormCancerSum,
    PatientFormHistory,
  },
  data() {
    return {
      curr_patient: new Patient(),
      curr_cancer: new PatientCancer(),
      curr_cancer_sum: new PatientCancer(),
      cancer_item: [],
      cancer_field: [
        { key: 'entrance_date', label: 'วันที่รับบริการ', tdClass: 'text-center' },
        { key: 'name', label: 'โรงพยาบาล' },
        { key: 'icd10_code', label: 'ICD-10', tdClass: 'text-start' },
      ],
      stage_list: [],
      extend_list: [],
      diagnosis_list: [],
      icd10_list: [],
      topo_list: [],
      treatment_list: [],
      morphology_list: [],
      behaviour_list: [],
      grade_list: [],
      t_list: [],
      n_list: [],
      m_list: [],
      extension_list: [],
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
    this.stage_list[0] = 'Stage 0'
    this.stage_list[1] = 'Stage 1'
    this.stage_list[2] = 'Stage 2'
    this.stage_list[3] = 'Stage 3'
    this.stage_list[4] = 'Stage 4'
    this.stage_list[9] = 'ไม่ระบุ'
    this.stage_list[10] = 'Stage 1a'
    this.stage_list[11] = 'Stage 1a1'
    this.stage_list[12] = 'Stage 1a2'
    this.stage_list[13] = 'Stage 1b'
    this.stage_list[14] = 'Stage 1b1'
    this.stage_list[15] = 'Stage 1b2'
    this.stage_list[16] = 'Stage 1c'
    this.stage_list[17] = 'Stage 1s'
    this.stage_list[20] = 'Stage 2a'
    this.stage_list[21] = 'Stage 2a1'
    this.stage_list[22] = 'Stage 2a2'
    this.stage_list[23] = 'Stage 2b'
    this.stage_list[24] = 'Stage 2c'
    this.stage_list[30] = 'Stage 3a'
    this.stage_list[31] = 'Stage 3b'
    this.stage_list[32] = 'Stage 3c'
    this.stage_list[33] = 'Stage 3c1'
    this.stage_list[34] = 'Stage 3c2'
    this.stage_list[39] = 'Locally Advanced'
    this.stage_list[40] = 'Stage 4a'
    this.stage_list[41] = 'Stage 4a1'
    this.stage_list[42] = 'Stage 4a2'
    this.stage_list[43] = 'Stage 4b'
    this.stage_list[44] = 'Stage 4c'

    this.extend_list[1] = 'In situ'
    this.extend_list[2] = 'Localized'
    this.extend_list[3] = 'Direct extension'
    this.extend_list[4] = 'Regional lymph nodes'
    this.extend_list[5] = 'Distant metastasis'
    this.extend_list[8] = 'Not applicable'
    this.extend_list[9] = 'Not know'

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
    // showPatientEditCancer(id) {
    //   this.$refs.patient_form_cancer.showForm(id)
    // },
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
      this.axios.get(`tcb/patients/${id}?detail=1`).then((response) => {
        this.curr_patient = response.data
        this.axios.get(`tcb/cancers?t=get-patient-cancer-item&patient_id=${this.curr_patient.id}&detail=1`).then((response) => {
          this.cancer_item = response.data
        })
        this.axios.get(`tcb/cancersums?patient_id=${this.curr_patient.id}&detail=1`).then((response) => {
          this.curr_cancer_sum = response.data
        })
      })
    },
    onRowSelected(items) {
      if (items[0]) {
        this.axios.get('tcb/cancers/' + items[0].id).then((response) => {
          this.curr_cancer = response.data
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
        this.stage_list = response.data.stage_list
        this.t_list = response.data.t_list
        this.n_list = response.data.n_list
        this.m_list = response.data.m_list
        this.extension_list = response.data.extension_list
        this.lifestatus_list = response.data.lifestatus_list
        this.deathcause_list = response.data.deathcause_list
        this.recurent_list = response.data.recurent_list
        this.laterality_list = response.data.laterality_list
      })
    },
  },
}
</script>

<style></style>
