<template>
  <div>
    <b-modal id="modal-patient-form-cancer" ref="modalPatientFormCancer" size="xl" okOnly ok-title="ปิดหน้าต่าง">
      <template #modal-title> ข้อมูลประวัติโรคมะเร็ง</template>
      <b-container fluid no-padding>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="ประวัติโรคมะเร็ง" active no-body>
              <b-table-simple fixed responsive bordered>
                <b-thead>
                  <b-tr class="align-middle text-center">
                    <b-th class="w-150px" sticky-column variant="info">รายการ</b-th>
                    <b-th class="w-200px" v-for="(cancer, idx) in cancers" :key="cancer.id">รายละเอียดโรคมะเร็ง <br />ครั้งที่ {{ cancers.length - idx }}</b-th>
                    <b-th class="w-300px" v-show="sum_new.diagnosis_date">สรุปโรคมะเร็งครั้งปัจจุบัน</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">25. วันที่เข้ารับบริการ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">{{ cancer.entrance_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"></b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">26. สิทธิการรักษา</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.finance_support_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.finance_support_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">27. วันที่วินิจฉัย</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">28. วิธีวินิจฉัย</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.diagnosis_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.diagnosis_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">29. วินิจฉัยนอก รพ</b-td>
                    <b-td class="w-200px text-nowrap p-2" v-for="cancer in cancers" :key="cancer.id">
                      <b-form-checkbox plain v-model="cancer.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                    </b-td>
                    <b-td class="w-300px text-nowrap p-2" v-show="sum_new.diagnosis_date">
                      <b-form-checkbox plain v-model="sum_new.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">30. วันที่ตัดชิ้นเนื้อ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">31. วันที่อ่านชิ้นเนื้อ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">32. Topography</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.topo_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.topo_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">33. Recurrent</b-td>
                    <b-td class="w-200px text-nowrap p-2" v-for="cancer in cancers" :key="cancer.id">
                      <b-form-checkbox plain v-model="cancer.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                    </b-td>
                    <b-td class="w-300px text-nowrap p-2" v-show="sum_new.diagnosis_date">
                      <b-form-checkbox plain v-model="sum_new.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">34. วันที่ Recurrent</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">35. Morphology</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.morphology_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.morphology_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">36. Behaviour</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.behaviour_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.behaviour_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">37. Grade</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.grade_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.grade_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">38. T-N-M</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id"> {{ t_list_arr[cancer.t_code] }} - {{ n_list_arr[cancer.n_code] }} - {{ m_list_arr[cancer.m_code] }} </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"> {{ t_list_arr[sum_new.t_code] }} - {{ n_list_arr[sum_new.n_code] }} - {{ m_list_arr[sum_new.m_code] }} </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">39. วันที่ TNM/Stage</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">40. Stage</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ stage_list_arr[cancer.stage_code] }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ stage_list_arr[sum_new.stage_code] }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">41. Extend</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ extension_list_arr[cancer.extension_code] }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ extension_list_arr[sum_new.extension_code] }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">42. ICD-10</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.icd10_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.icd10_text }}
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">43. Metastasis</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
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
                    <b-td class="w-300px text-nowrap pt-1px pb-1px" v-show="sum_new.diagnosis_date">
                      <b-row>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_1" value="1" unchecked-value="0" disabled class="pb-5px">
                            Bone <span v-show="sum_new.met_1 == 1"> ({{ sum_new.met_1_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_2" value="1" unchecked-value="0" disabled class="pb-5px">
                            Brain <span v-show="sum_new.met_2 == 1"> ({{ sum_new.met_2_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_3" value="1" unchecked-value="0" disabled class="pb-5px">
                            Liver <span v-show="sum_new.met_3 == 1"> ({{ sum_new.met_3_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_4" value="1" unchecked-value="0" disabled class="pb-5px">
                            Lung <span v-show="sum_new.met_4 == 1"> ({{ sum_new.met_4_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_5" value="1" unchecked-value="0" disabled class="pb-5px">
                            Lymph Node <span v-show="sum_new.met_5 == 1"> ({{ sum_new.met_5_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_6" value="1" unchecked-value="0" disabled class="pb-5px">
                            Peritoneum <span v-show="sum_new.met_6 == 1"> ({{ sum_new.met_6_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="12">
                          <b-form-checkbox plain v-model="sum_new.met_7" value="1" unchecked-value="0" disabled class="pb-5px">
                            Other <span v-show="sum_new.met_7 == 1"> ({{ sum_new.met_7_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                          </b-form-checkbox>
                        </b-col>
                      </b-row>
                    </b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">44. Treatment</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      <b-row v-for="(treat, idx) in cancer.treatments" :key="treat.id">
                        <b-col md="12"><span class="fw-bold w-100px">Treatment :</span> {{ treat.treatment_code }}</b-col>
                        <b-col md="12"><span class="fw-bold">เริ่มต้น :</span> {{ treat.treatment_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                        <b-col md="12"><span class="fw-bold">สิ้นสุด :</span> {{ treat.treatment_date_end | moment('add', '543 years', 'DD/MM/YYYY') }}</b-col>
                        <b-col md="12">{{ treat.note }}</b-col>
                        <b-col md="12" v-show="idx < cancer.treatments.length - 1"><hr class="m-1" /></b-col>
                      </b-row>
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"></b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">45. Clinical Summary</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">{{ cancer.clinical_summary }}</b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">{{ sum_new.clinical_summary }}</b-td>
                    <b-td></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">46. เอกสารแนบ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      <b-row v-for="(file, idx) in cancer.files" :key="file.id">
                        <b-col md="12">
                          {{ file_group_list[file.file_group_id] }}
                        </b-col>
                        <b-col md="12">
                          <a :href="'https://canceranywhere.com:8081/' + file.file_path" target="_blank">{{ file.file_name }}</a>
                        </b-col>
                        <b-col md="12" v-show="idx < cancer.files.length - 1"><hr class="m-1" /></b-col>
                      </b-row>
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"></b-td>
                    <b-td></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-tab>
            <b-tab title="เอกสารแนบ" no-body>
              <b-table-simple fixed responsive bordered>
                <b-thead>
                  <b-tr class="align-middle text-center">
                    <b-th class="w-200px">วันที่ Upload เอกสาร</b-th>
                    <b-th class="w-200px">ประเภทเอกสาร</b-th>
                    <b-th class="">เอกสาร</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="file in files" :key="file.id">
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
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'PatientFormHistory',
  data() {
    return {
      cancers: [],
      files: [],
      sum_new: {},
      patient_id: null,
      curr_patient: {
        id: null,
        age: null,
        birth_date: null,
        sex_code: null,
      },
      file_group_list: ['', '1 Pathology report', '2 Imaging study', '3 LAB report', '4 Other'],
      t_list_arr: [],
      n_list_arr: [],
      m_list_arr: [],
      stage_list_arr: [],
      extension_list_arr: [],
    }
  },
  methods: {
    showForm(patient_id, patient) {
      this.getReference()
      let loader = this.$loading.show()
      this.curr_patient = patient
      if (patient_id) {
        this.axios.get(`tcb/cancers?t=get-patient-cancer-history&patient_id=${patient_id}&history=1&detail=1`).then((response) => {
          this.cancers = response.data.cancers
          this.files = response.data.files
          this.$nextTick(() => {
            this.$refs['modalPatientFormCancer'].show()
            loader.hide()
          })
        })
      }
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

<style scoped>
.min-w-200px {
  min-width: 200px;
}
</style>
