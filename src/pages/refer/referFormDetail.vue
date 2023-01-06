<template>
  <div>
    <b-modal id="modal-refer-form-detail" ref="modalReferFormDetail" size="xl" okOnly ok-title="ปิดหน้าต่าง" hide-footer>
      <template #modal-title> ข้อมูลการส่ง Refer ({{ refer_status[curr_refer.status] }})</template>
      <b-container fluid no-padding>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="ข้อมูลทั่วไป" active no-body>
              <b-container fluid>
                <b-row class="mt-2">
                  <b-col>
                    <h6 class="text-pink-600 fs-5">ข้อมูลทั่วไป</h6>
                  </b-col>
                </b-row>
              </b-container>
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
                <dt class="col-md-2 text-end topiclabel fs-5">เบอร์โทรศัพท์ 1 :</dt>
                <dd class="col-md-4 pt-1">{{ curr_patient.telephone_1 }}</dd>
                <dt class="col-md-2 text-end topiclabel fs-5">เบอร์โทรศัพท์ 2 :</dt>
                <dd class="col-md-4 pt-1">{{ curr_patient.telephone_2 }}</dd>
              </dl>
              <b-container fluid>
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
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis" value="1" unchecked-value="0" disabled><span class="fs-5 topiclabel"> วินิจฉัยเพิ่มเติม</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_excision" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> ส่งชิ้นเนื้อ</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_ct" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> CT</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_mri" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> MRI</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_bone" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> Bone Scan</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_mammogram" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> Mammogram</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_ultra" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> Ultrasound</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_diagnosis_other" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> อื่น ๆ</span> </b-form-checkbox>
                        <b-form-input v-model="curr_refer.reson_diagnosis_other_text" inline disabled></b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_treat" value="1" unchecked-value="0" disabled><span class="fs-5 topiclabel"> รักษาต่อ</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_treat_radiation" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> รังสี</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_treat_surgery" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> ผ่าตัด</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_treat_chemo" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> เคมี</span> </b-form-checkbox>
                        <b-form-checkbox plain v-model="curr_refer.reson_treat_pallative" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> Pallative Care</span> </b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="12" xl="12" class="ps-50px pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_treat_other" value="1" unchecked-value="0" inline disabled><span class="fs-5 topiclabel"> อื่น ๆ</span> </b-form-checkbox>
                        <b-form-input v-model="curr_refer.reson_treat_other_text" inline disabled></b-form-input>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_right" value="1" unchecked-value="0" disabled><span class="fs-5 topiclabel"> ตามสิทธิ</span> </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_wanted" value="1" unchecked-value="0" disabled><span class="fs-5 topiclabel"> ความต้องการของญาติผู้ป่วย</span> </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1"></b-col>
                  <b-col sm="4" md="4" lg="10" xl="11">
                    <b-row>
                      <b-col sm="4" md="4" lg="12" xl="12" class="pb-2">
                        <b-form-checkbox plain v-model="curr_refer.reson_other" value="1" unchecked-value="0" disabled><span class="fs-5 topiclabel"> อื่น ๆ</span> </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4" md="4" lg="1" xl="1" class="topiclabel"> </b-col>
                  <b-col sm="8" md="8" lg="10" xl="11" class="pb-3">
                    <validation-provider :rules="{}" name="note">
                      <b-form-group>
                        <b-form-textarea id="note" v-model="curr_refer.note" type="text" rows="5" disabled></b-form-textarea>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
            <b-tab title="ข้อมูลประวัติโรคมะเร็ง" no-body>
              <b-table-simple fixed responsive bordered>
                <b-thead>
                  <b-tr class="align-middle text-center">
                    <b-th class="w-150px" sticky-column variant="info">รายการ</b-th>
                    <b-th class="w-200px" v-for="(cancer, idx) in cancers" :key="cancer.id">รายละเอียดโรคมะเร็ง <br />ครั้งที่ {{ cancers.length - idx }}</b-th>
                    <b-th class="w-300px" v-show="sum_new.diagnosis_date">สรุปโรคมะเร็งครั้งปัจจุบัน</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">25. วันที่เข้ารับบริการ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">{{ cancer.entrance_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">26. สิทธิการรักษา</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.finance_support_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.finance_support_text }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">27. วันที่วินิจฉัย</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">28. วิธีวินิจฉัย</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.diagnosis_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.diagnosis_text }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">29. วินิจฉัยนอก รพ</b-td>
                    <b-td class="w-200px text-nowrap p-2" v-for="cancer in cancers" :key="cancer.id">
                      <b-form-checkbox plain v-model="cancer.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                    </b-td>
                    <b-td class="w-300px text-nowrap p-2" v-show="sum_new.diagnosis_date">
                      <b-form-checkbox plain v-model="sum_new.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">30. วันที่ตัดชิ้นเนื้อ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">31. วันที่อ่านชิ้นเนื้อ</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">32. Topography</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.topo_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.topo_text }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">33. Recurrent</b-td>
                    <b-td class="w-200px text-nowrap p-2" v-for="cancer in cancers" :key="cancer.id">
                      <b-form-checkbox plain v-model="cancer.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                    </b-td>
                    <b-td class="w-300px text-nowrap p-2" v-show="sum_new.diagnosis_date">
                      <b-form-checkbox plain v-model="sum_new.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">34. วันที่ Recurrent</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">35. Morphology</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.morphology_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.morphology_text }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">36. Behaviour</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.behaviour_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.behaviour_text }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">37. Grade</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.grade_text }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.grade_text }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">38. T-N-M</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id"> {{ t_list_arr[cancer.t_code] }} - {{ n_list_arr[cancer.n_code] }} - {{ m_list_arr[cancer.m_code] }} </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"> {{ t_list_arr[sum_new.t_code] }} - {{ n_list_arr[sum_new.n_code] }} - {{ m_list_arr[sum_new.m_code] }} </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">39. วันที่ TNM/Stage</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">40. Stage</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ stage_list_arr[cancer.stage_code] }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ stage_list_arr[sum_new.stage_code] }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">41. Extend</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ extension_list_arr[cancer.extension_code] }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ extension_list_arr[sum_new.extension_code] }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">42. ICD-10</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      {{ cancer.icd10_code }}
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      {{ sum_new.icd10_code }}
                    </b-td>
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
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">44. Treatment</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
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
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date"></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td class="w-150px fw-bold" sticky-column variant="info">45. Clinical Summary</b-td>
                    <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                      <pre class="mb-2px">{{ cancer.clinical_summary }}</pre>
                    </b-td>
                    <b-td class="w-300px" v-show="sum_new.diagnosis_date">
                      <pre class="mb-2px">{{ sum_new.clinical_summary }}</pre>
                    </b-td>
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
                  <b-tr v-if="files.length == 0">
                    <b-td colspan="3">
                      <b-container fluid>
                        <b-row>
                          <b-col class="text-center"><span class="fs-3 text-red-600">ไม่พบเอกสารแนบ</span></b-col>
                        </b-row>
                      </b-container>
                    </b-td>
                  </b-tr>
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
            <b-tab title="บันทึกข้อมูลเพิ่มเติม" no-body>
              <div class="widget-chat rounded">
                <vue-custom-scrollbar style="height: 450px" class="widget-chat-body">
                  <div class="widget-chat-item start">
                    <div class="widget-chat-info">
                      <div class="widget-chat-info-container">
                        <div class="widget-chat-name text-indigo">สถาบันมะเร็งแห่งชาติ</div>
                        <div class="widget-chat-message">ขอข้อมูลเพิ่มเติมการรักษาด้วยครับ</div>
                        <div class="widget-chat-message text-gray-600">02/01/2566 12:45 น.</div>
                      </div>
                    </div>
                  </div>
                  <div class="widget-chat-item end">
                    <div class="widget-chat-info">
                      <div class="widget-chat-info-container">
                        <div class="widget-chat-name text-red">โรงพยาบาลสุรินทร์</div>
                        <div class="widget-chat-message">Update ข้อมูลเพิ่มเติม ให้แล้วค่ะ</div>
                        <div class="widget-chat-message text-gray-600">02/01/2566 13:05 น.</div>
                      </div>
                    </div>
                  </div>
                  <div class="widget-chat-item start">
                    <div class="widget-chat-info">
                      <div class="widget-chat-info-container">
                        <div class="widget-chat-name text-indigo">สถาบันมะเร็งแห่งชาติ</div>
                        <div class="widget-chat-message">ยังไม่เห็นข้อมูลเลยครับ</div>
                        <div class="widget-chat-message text-gray-600">02/01/2566 14:30 น.</div>
                      </div>
                    </div>
                  </div>
                  <div class="widget-chat-item end">
                    <div class="widget-chat-info">
                      <div class="widget-chat-info-container">
                        <div class="widget-chat-name text-red">โรงพยาบาลสุรินทร์</div>
                        <div class="widget-chat-message">
                          #Avatar2 “คีรี” สองรูปล่างคือภาพคอนเซปต์อาร์ตดั้งเดิมค่ะ ซึ่งคุณ Sigourney Weaver (ผู้รับบทเกรซและคีรี) เห็นครั้งแรกแล้วไม่ค่อยชอบและคัดค้าน เพราะว่าการออกแบบแบบนี้ทำให้คีรีดู ‘สวยและเรียบร้อยเกินไป’ จากนั้นเธอก็แนะนำให้ออกแบบคีรีให้ดูเป็นวัยรุ่นที่มีความยุ่งเหยิง ให้ดูน่าอึดอัดใจมากขึ้น
                          โดยชี้ให้เห็นว่าเด็กผู้หญิงหลายคนไม่รู้สึกราวกับว่าพวกเธอ "สวย" จากภายในค่า
                        </div>
                        <div class="widget-chat-message text-gray-600">02/01/2566 16:15 น.</div>
                      </div>
                    </div>
                  </div>
                  <div class="widget-chat-item start">
                    <div class="widget-chat-info">
                      <div class="widget-chat-info-container">
                        <div class="widget-chat-name text-indigo">สถาบันมะเร็งแห่งชาติ</div>
                        <div class="widget-chat-message">ขอบคุณครับ</div>
                        <div class="widget-chat-message text-gray-600">02/01/2566 16:30 น.</div>
                      </div>
                    </div>
                  </div>
                </vue-custom-scrollbar>
                <div class="widget-input">
                  <form action="" method="POST" name="">
                    <div class="widget-input-container">
                      <div class="widget-input-box">
                        <input type="text" class="form-control" placeholder="เขียนข้อความ..." />
                      </div>
                      <div class="widget-input-icon">
                        <a href="#" class="text-gray-500"><i class="fas fa-location-arrow"></i></a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-container>
      <b-container fluid>
        <b-row>
          <b-col class="pt-3">
            <span class="fs-3 text-red-600">สถานะ : {{ refer_status[curr_refer.status] }}</span>
          </b-col>
          <b-col class="text-end pt-3">
            <button v-show="[0, 1].includes(curr_refer.status)" type="button" class="btn btn-lg btn-success ms-5px" @click="receiveRefer"><i class="fas fa-plus"></i> รับ Refer.</button>
            <button v-show="[0].includes(curr_refer.status)" type="button" class="btn btn-lg btn-warning ms-5px" @click="entreatRefer"><i class="fas fa-plus"></i> ขอข้อมูลเพิ่มเติม</button>
            <button v-show="[0, 1].includes(curr_refer.status)" type="button" class="btn btn-lg btn-danger ms-5px" @click="rejectRefer"><i class="fas fa-trash"></i> ปฏิเสธรับ Refer</button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'referFormDetail',
  data() {
    return {
      cancers: [],
      files: [],
      sum_new: {},
      patient_id: null,
      refer_id: null,
      curr_patient: {
        id: null,
        age: null,
        birth_date: null,
        sex_code: null,
      },
      curr_refer: {},
      file_group_list: ['', '1 Pathology report', '2 Imaging study', '3 LAB report', '4 Other'],
      t_list_arr: [],
      n_list_arr: [],
      m_list_arr: [],
      stage_list_arr: [],
      extension_list_arr: [],
      refer_status: ['รอรับ Refer', 'รอขอข้อมูลเพิ่มเติม', 'รับ Refer แล้ว', 'ปฏิเสธรับ Refer'],
    }
  },
  methods: {
    entreatRefer() {
      // ขอข้อมูลเพิ่มเติม
      const h = this.$createElement
      const titleModal = h('div', { domProps: { innerHTML: '<i class="fa fa-trash"></i> ยืนยันการขอข้อมูลการ Refer เพิ่มเติม' } })
      this.$bvModal.msgBoxConfirm('ท่านต้องการยืนยันการขอข้อมูลการ Refer เพิ่มเติมของผู้ป่วยที่เลือกนี้ ใช่หรือไม่.', { title: [titleModal], size: 'md', okVariant: 'warning', okTitle: 'ใช่', cancelTitle: 'ยกเลิก' }).then((value) => {
        if (value) {
          this.axios.put(`tcb/refers/${this.refer_id}`, { status: 1 }).then(() => {
            this.$toast.success('ยืนยันการขอข้อมูลการ Refer เพิ่มเติมเรียบร้อย.')
            this.$nextTick(() => {
              this.$parent.loadItems()
              this.$bvModal.hide('modal-refer-form-detail')
            })
          })
        }
      })
    },
    rejectRefer() {
      // ปฏิเสธการรับ Refer
      const h = this.$createElement
      const titleModal = h('div', { domProps: { innerHTML: '<i class="fa fa-trash"></i> ยืนยันการปฏิเสธการรับ Refer' } })
      this.$bvModal.msgBoxConfirm('ท่านต้องการยืนยันการปฏิเสธการรับ Refer ผู้ป่วยที่เลือกนี้ ใช่หรือไม่.', { title: [titleModal], size: 'md', okVariant: 'danger', okTitle: 'ใช่', cancelTitle: 'ยกเลิก' }).then((value) => {
        if (value) {
          this.axios.put(`tcb/refers/${this.refer_id}`, { status: 3 }).then(() => {
            this.$toast.success('ยืนยันการปฏิเสธการรับ Refer เรียบร้อย.')
            this.$nextTick(() => {
              this.$parent.loadItems()
              this.$bvModal.hide('modal-refer-form-detail')
            })
          })
        }
      })
    },
    receiveRefer() {
      // รับ Refer
      const h = this.$createElement
      const titleModal = h('div', { domProps: { innerHTML: '<i class="fa fa-plus"></i> ยืนยันการรับ Refer' } })
      this.$bvModal.msgBoxConfirm('ท่านต้องการยืนยันการรับ Refer ผู้ป่วยที่เลือกนี้ ใช่หรือไม่.', { title: [titleModal], size: 'md', okVariant: 'success', okTitle: 'ใช่', cancelTitle: 'ยกเลิก' }).then((value) => {
        if (value) {
          this.axios.put(`tcb/refers/${this.refer_id}`, { status: 2 }).then(() => {
            this.$toast.success('ยืนยันการรับ Refer เรียบร้อย.')
            this.$nextTick(() => {
              this.$parent.loadItems()
              this.$bvModal.hide('modal-refer-form-detail')
            })
          })
        }
      })
    },
    showForm(patient_id, refer_id) {
      this.patient_id = patient_id
      this.refer_id = refer_id
      this.getReference()
      let loader = this.$loading.show()
      if (patient_id) {
        this.axios.get(`tcb/refers?t=get-refer-full-detail&patient_id=${patient_id}&refer_id=${refer_id}`).then((response) => {
          this.curr_patient = response.data.curr_patient
          this.curr_refer = response.data.curr_refer
          this.cancers = response.data.curr_cancers
          this.files = response.data.curr_files
          this.$nextTick(() => {
            this.$refs['modalReferFormDetail'].show()
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
