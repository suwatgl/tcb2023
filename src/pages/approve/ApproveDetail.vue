<template>
  <div>
    <b-modal id="modal-cancer-detail" ref="modalCancerDetail" size="xl" @ok="handleOk" cancel-title="ยกเลิก" ok-title="อนุมัติ">
      <template #modal-title> ข้อมูลประวัติโรคมะเร็ง</template>
      <validation-observer tag="form" ref="formsum">
        <form @submit.stop.prevent="handleSubmit">
          <b-container fluid no-padding>
            <b-table-simple fixed responsive bordered>
              <b-thead>
                <b-tr class="align-middle text-center">
                  <b-th class="w-150px" sticky-column variant="info">รายการ</b-th>
                  <b-th class="w-300px">สรุปโรคมะเร็งครั้งปัจจุบัน</b-th>
                  <b-th class="w-200px" v-show="old_cancer.diagnosis_date != null">สรุปโรคมะเร็งครั้งที่แล้ว<br />โดยทะเบียนมะเร็ง</b-th>
                  <b-th class="w-200px" v-for="cancer in cancers" :key="cancer.id">รายละเอียดโรคมะเร็ง</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">25. วันที่เข้ารับบริการ</b-td>
                  <b-td class="w-300px"></b-td>
                  <b-td class="w-200px" v-show="old_cancer.entrance_date != null"></b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">{{ cancer.entrance_date | moment('add', '543 years', 'DD/MM/YYYY') }}</b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">26. สิทธิการรักษา</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="finance_support_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="finance-support-list" v-model="curr_cancer.finance_support_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="finance-support-list">
                          <option v-for="(value, key) in finance_support_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.finance_support_text = e.target.innerHTML)">{{ old_cancer.finance_support_text }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.finance_support_text = e.target.innerHTML)">{{ cancer.finance_support_text }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">27. วันที่วินิจฉัย</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider rules="required|date_format_th" name="diagnosis_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.diagnosis_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.diagnosis_date = e.target.innerHTML)">{{ old_cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.diagnosis_date = e.target.innerHTML)">{{ cancer.diagnosis_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">28. วิธีวินิจฉัย</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="diagnosis_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="diagnosis-list" v-model="curr_cancer.diagnosis_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="diagnosis-list">
                          <option v-for="(value, key) in diagnosis_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.diagnosis_text = e.target.innerHTML)">{{ old_cancer.diagnosis_text }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.diagnosis_text = e.target.innerHTML)">{{ cancer.diagnosis_text }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">29. วินิจฉัยนอก รพ</b-td>
                  <b-td class="w-300px text-nowrap p-2">
                    <b-form-checkbox plain v-model="curr_cancer.diagnosis_out" value="1" unchecked-value="0"><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <b-form-checkbox plain v-model="old_cancer.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                  </b-td>
                  <b-td class="w-200px text-nowrap p-2" v-for="cancer in cancers" :key="cancer.id">
                    <b-form-checkbox plain v-model="cancer.diagnosis_out" value="1" unchecked-value="0" disabled><span> วินิจฉัยนอก รพ</span> </b-form-checkbox>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">30. วันที่ตัดชิ้นเนื้อ</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider rules="date_format_th" name="excision_in_cut_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.excision_in_cut_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.excision_in_cut_date = e.target.innerHTML)">{{ old_cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.excision_in_cut_date = e.target.innerHTML)">{{ cancer.excision_in_cut_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">31. วันที่อ่านชิ้นเนื้อ</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider rules="date_format_th" name="excision_in_read_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.excision_in_read_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.excision_in_read_date = e.target.innerHTML)">{{ old_cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.excision_in_read_date = e.target.innerHTML)">{{ cancer.excision_in_read_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">32. Topography</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="topo_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="topo-list" v-model="curr_cancer.topo_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="topo-list">
                          <option v-for="(value, key) in topo_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.topo_text = e.target.innerHTML)">{{ old_cancer.topo_text }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.topo_text = e.target.innerHTML)">{{ cancer.topo_text }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">33. Recurrent</b-td>
                  <b-td class="w-300px text-nowrap p-2">
                    <b-form-checkbox plain v-model="curr_cancer.recurrent" value="1" unchecked-value="0"><span> Recurrent</span> </b-form-checkbox>
                  </b-td>
                  <b-td class="w-200px text-nowrap p-2" v-show="old_cancer.diagnosis_date != null">
                    <b-form-checkbox plain v-model="old_cancer.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                  </b-td>
                  <b-td class="w-200px text-nowrap p-2" v-for="cancer in cancers" :key="cancer.id">
                    <b-form-checkbox plain v-model="cancer.recurrent" value="1" unchecked-value="0" disabled><span> Recurrent</span> </b-form-checkbox>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">34. วันที่ Recurrent</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: curr_cancer.recurrent == 1 ? true : false }" name="recurrent_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.recurrent_date" :disabled="curr_cancer.recurrent == 1 ? false : true" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.recurrent_date = e.target.innerHTML)">{{ old_cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.recurrent_date = e.target.innerHTML)">{{ cancer.recurrent_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">35. Morphology</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="morphology_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="morphology-list" v-model="curr_cancer.morphology_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="morphology-list">
                          <option v-for="(value, key) in morphology_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.morphology_text = e.target.innerHTML)">{{ old_cancer.morphology_text }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.morphology_text = e.target.innerHTML)">{{ cancer.morphology_text }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">36. Behaviour</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="behaviour_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="behaviour-list" v-model="curr_cancer.behaviour_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="behaviour-list">
                          <option v-for="(value, key) in behaviour_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.behaviour_text = e.target.innerHTML)">{{ old_cancer.behaviour_text }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.behaviour_text = e.target.innerHTML)">{{ cancer.behaviour_text }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">37. Grade</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="grade_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="grade-list" v-model="curr_cancer.grade_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="grade-list">
                          <option v-for="(value, key) in grade_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.grade_text = e.target.innerHTML)">{{ old_cancer.grade_text }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.grade_text = e.target.innerHTML)">{{ cancer.grade_text }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">38. T-N-M</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <b-row class="p-0">
                      <b-col>
                        <b-form-group>
                          <b-form-select :select-size="1" id="input-t" class="form-select" plain v-model="curr_cancer.t_code" :options="t_list"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group>
                          <b-form-select :select-size="1" id="input-n" class="form-select" plain v-model="curr_cancer.n_code" :options="n_list"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group>
                          <b-form-select :select-size="1" id="input-m" class="form-select" plain v-model="curr_cancer.m_code" :options="m_list"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a
                      href="#"
                      @click.stop.prevent="
                        () => {
                          curr_cancer.t_code = old_cancer.t_code
                          curr_cancer.n_code = old_cancer.n_code
                          curr_cancer.m_code = old_cancer.m_code
                        }
                      "
                    >
                      {{ t_list_arr[old_cancer.t_code] }} - {{ n_list_arr[old_cancer.n_code] }} - {{ m_list_arr[old_cancer.m_code] }}
                    </a>
                  </b-td>
                  <b-td class="w-200px" v-for="(cancer, idx) in cancers" :key="cancer.id">
                    <a
                      href="#"
                      @click.stop.prevent="
                        () => {
                          curr_cancer.t_code = cancers[idx].t_code
                          curr_cancer.n_code = cancers[idx].n_code
                          curr_cancer.m_code = cancers[idx].m_code
                        }
                      "
                    >
                      {{ t_list_arr[cancer.t_code] }} - {{ n_list_arr[cancer.n_code] }} - {{ m_list_arr[cancer.m_code] }}
                    </a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">39. วันที่ TNM/Stage</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider rules="date_format_th" name="tnm_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.tnm_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.tnm_date = e.target.innerHTML)">{{ old_cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.tnm_date = e.target.innerHTML)">{{ cancer.tnm_date | moment('add', '543 years', 'DD/MM/YYYY') }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">40. Stage</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider rules="required" name="stage_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-stage" class="form-select" plain v-model="curr_cancer.stage_code" :options="stage_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="() => (curr_cancer.stage_code = old_cancer.stage_code)">{{ stage_list_arr[old_cancer.stage_code] }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="() => (curr_cancer.stage_code = cancers[idx].stage_code)">{{ stage_list_arr[cancer.stage_code] }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">41. Extend</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider rules="required" name="extension_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-stage" class="form-select" plain v-model="curr_cancer.extension_code" :options="extension_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="() => (curr_cancer.extension_code = old_cancer.extension_code)">{{ extension_list_arr[old_cancer.extension_code] }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="() => (curr_cancer.extension_code = cancers[idx].extension_code)">{{ extension_list_arr[cancer.extension_code] }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">42. ICD-10</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{ required: true }" name="icd10_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="icd10-list" :disabled="icd10_disabled" v-model="curr_cancer.icd10_code" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="icd10-list">
                          <option v-for="(value, key) in icd10_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.icd10_code = e.target.innerHTML)">{{ old_cancer.icd10_code }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="(e) => (curr_cancer.icd10_code = e.target.innerHTML)">{{ cancer.icd10_code }}</a>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">43. Metastasis</b-td>
                  <b-td class="w-300px text-nowrap pt-1px pb-1px">
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_1" value="1" unchecked-value="0"> Bone</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_1_date"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_2" value="1" unchecked-value="0"> Brain</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_2_date"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_3" value="1" unchecked-value="0"> Liver</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_3_date"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_4" value="1" unchecked-value="0"> Lung</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_4_date"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_5" value="1" unchecked-value="0"> Lymph Node</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_5_date"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_6" value="1" unchecked-value="0"> Peritoneum</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_6_date"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                        <b-form-checkbox plain v-model="curr_cancer.met_7" value="1" unchecked-value="0"> Other</b-form-checkbox>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                        <b-form-input type="text" v-model="curr_cancer.met_7_date"></b-form-input>
                      </b-col>
                      <b-col sm="4" md="4" lg="3" xl="3" class="mt-2">
                        <label>ระบุ:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="9" xl="9">
                        <b-form-input type="text" v-model="curr_cancer.met_7_other"></b-form-input>
                      </b-col>
                    </b-row>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <b-row>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_1" value="1" unchecked-value="0" disabled class="pb-20px">
                          Bone <span v-show="old_cancer.met_1 == 1"> ({{ old_cancer.met_1_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_2" value="1" unchecked-value="0" disabled class="pb-20px">
                          Brain <span v-show="old_cancer.met_2 == 1"> ({{ old_cancer.met_2_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_3" value="1" unchecked-value="0" disabled class="pb-20px">
                          Liver <span v-show="old_cancer.met_3 == 1"> ({{ old_cancer.met_3_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_4" value="1" unchecked-value="0" disabled class="pb-20px">
                          Lung <span v-show="old_cancer.met_4 == 1"> ({{ old_cancer.met_4_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_5" value="1" unchecked-value="0" disabled class="pb-20px">
                          Lymph Node <span v-show="old_cancer.met_5 == 1"> ({{ old_cancer.met_5_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_6" value="1" unchecked-value="0" disabled class="pb-20px">
                          Peritoneum <span v-show="old_cancer.met_6 == 1"> ({{ old_cancer.met_6_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="old_cancer.met_7" value="1" unchecked-value="0" disabled class="pb-20px">
                          Other <span v-show="old_cancer.met_7 == 1"> ({{ old_cancer.met_7_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-td>
                  <b-td class="w-200px" v-for="cancer in cancers" :key="cancer.id">
                    <b-row>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_1" value="1" unchecked-value="0" disabled class="pb-20px">
                          Bone <span v-show="cancer.met_1 == 1"> ({{ cancer.met_1_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_2" value="1" unchecked-value="0" disabled class="pb-20px">
                          Brain <span v-show="cancer.met_2 == 1"> ({{ cancer.met_2_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_3" value="1" unchecked-value="0" disabled class="pb-20px">
                          Liver <span v-show="cancer.met_3 == 1"> ({{ cancer.met_3_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_4" value="1" unchecked-value="0" disabled class="pb-20px">
                          Lung <span v-show="cancer.met_4 == 1"> ({{ cancer.met_4_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_5" value="1" unchecked-value="0" disabled class="pb-20px">
                          Lymph Node <span v-show="cancer.met_5 == 1"> ({{ cancer.met_5_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_6" value="1" unchecked-value="0" disabled class="pb-20px">
                          Peritoneum <span v-show="cancer.met_6 == 1"> ({{ cancer.met_6_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                      <b-col md="12">
                        <b-form-checkbox plain v-model="cancer.met_7" value="1" unchecked-value="0" disabled class="pb-20px">
                          Other <span v-show="cancer.met_7 == 1"> ({{ cancer.met_7_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </b-form-checkbox>
                      </b-col>
                    </b-row>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">44. Treatment</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <b-row v-for="(treat, idx) in curr_cancer.treatmentsn" :key="treat.id">
                      <b-col md="12">
                        <span class="fw-bold">
                          {{ treat.treatment_code }}<span v-show="treat.treatment_date"> ({{ treat.treatment_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </span>
                      </b-col>
                      <b-col md="12">{{ treat.note }}</b-col>
                      <b-col md="12" v-show="idx < curr_cancer.treatmentsn.length - 1"><hr class="m-1" /></b-col>
                    </b-row>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <b-row v-for="(treat, idx) in old_cancer.treatments" :key="treat.id">
                      <b-col md="12">
                        <span class="fw-bold">
                          {{ treat.treatment_code }}<span v-show="treat.treatment_date"> ({{ treat.treatment_date | moment('add', '543 years', 'DD/MM/YYYY') }})</span>
                        </span>
                      </b-col>
                      <b-col md="12">{{ treat.note }}</b-col>
                      <b-col md="12" v-show="idx < old_cancer.treatments.length - 1"><hr class="m-1" /></b-col>
                    </b-row>
                  </b-td>
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
                </b-tr>
                <b-tr>
                  <b-td class="w-150px fw-bold" sticky-column variant="info">45. Clinical Summary</b-td>
                  <b-td class="w-300px text-nowrap p-1">
                    <validation-provider :rules="{}" name="clinical_summary">
                      <b-form-group>
                        <b-form-textarea v-model="curr_cancer.clinical_summary" type="text" rows="3"></b-form-textarea>
                      </b-form-group>
                    </validation-provider>
                  </b-td>
                  <b-td class="w-200px" v-show="old_cancer.diagnosis_date != null">
                    <a href="#" @click.stop.prevent="() => (curr_cancer.clinical_summary = old_cancer.clinical_summary)">{{ old_cancer.clinical_summary }}</a>
                  </b-td>
                  <b-td class="w-200px" v-for="(cancer, idx) in cancers" :key="cancer.id">
                    <a href="#" @click.stop.prevent="() => (curr_cancer.clinical_summary = cancers[idx].clinical_summary)">{{ cancer.clinical_summary }}</a>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-container>
        </form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import PatientCancer from '../../_models/patient_cancer'

export default {
  name: 'AppreveDetail',
  data() {
    return {
      cancers: [],
      old_cancer: new PatientCancer(),
      curr_cancer: new PatientCancer(),
      curr_patient: {
        id: null,
        age: null,
        birth_date: null,
        sex_code: null,
      },
      file_group_list: ['', '1 Pathology report', '2 Imaging study', '3 LAB report', '4 Other'],
      icd10_disabled: false,

      finance_support_list: [],
      diagnosis_list: [],
      icd10_list: [],
      topo_list: [],
      treatment_list: [],
      morphology_list: [],
      behaviour_list: [],
      grade_list: [],
      stage_list: [],
      t_list: [],
      n_list: [],
      m_list: [],
      t_list_arr: [],
      n_list_arr: [],
      m_list_arr: [],
      extension_list: [],
      lifestatus_list: [],
      deathcause_list: [],
      recurent_list: [],
      laterality_list: [],
      metastasis_list: [
        { text: 'Bone', value: 1 },
        { text: 'Brain', value: 2 },
        { text: 'Liver', value: 3 },
        { text: 'Lung', value: 4 },
        { text: 'Lymph Node', value: 5 },
        { text: 'Peritoneum', value: 6 },
        { text: 'Other', value: 7 },
      ],
      stage_list_arr: [],
      extension_list_arr: [],
    }
  },
  watch: {
    'curr_cancer.recurrent'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.recurrent_date = null
      }
    },
    'curr_cancer.met_1'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_1_date = null
      }
    },
    'curr_cancer.met_2'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_2_date = null
      }
    },
    'curr_cancer.met_3'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_3_date = null
      }
    },
    'curr_cancer.met_4'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_4_date = null
      }
    },
    'curr_cancer.met_5'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_5_date = null
      }
    },
    'curr_cancer.met_6'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_6_date = null
      }
    },
    'curr_cancer.met_7'(newVal) {
      if (newVal == 0) {
        this.curr_cancer.met_7_date = null
        this.curr_cancer.met_7_other = null
      }
    },
    'curr_cancer.diagnosis_date'(newVal) {
      // console.log(10)
      if (newVal == null || newVal == '') return
      if (moment(newVal, 'DD/MM/YYYY', true).isValid()) {
        this.getIcd10()
      }
    },
    'curr_cancer.topo_text'(newVal) {
      // console.log(20)
      if (newVal == null || newVal == '') return
      let topo_x = newVal?.substr(0, newVal.indexOf(' '))
      if (Object.keys(this.topo_list).indexOf(topo_x) != -1) {
        this.getIcd10()
      }
    },
    'curr_cancer.morphology_text'(newVal) {
      // console.log(30)
      if (newVal == null || newVal == '') return
      let mopho_x = newVal?.substr(0, newVal.indexOf(' '))
      let mopho_array = Object.values(this.morphology_list).map((obj) => obj?.substr(0, obj.indexOf(' ')))
      if (mopho_array.indexOf(mopho_x) != -1) {
        this.getIcd10()
      }
    },
    'curr_cancer.behaviour_text'(newVal) {
      // console.log(40)
      if (newVal == null || newVal == '') return
      let behav_x = newVal?.substr(0, newVal.indexOf(' '))
      if (Object.keys(this.behaviour_list).indexOf(behav_x) != -1) {
        this.getIcd10()
      }
    },
  },
  methods: {
    getIcd10() {
      let param = {
        t: 'get-icd10',
        sex: null,
        birth_date: null,
        diag_date: null,
        age: null,
        topography: null,
        morphology: null,
        behaviour: null,
      }

      this.curr_cancer.icd10_code = ''
      this.icd10_disabled = false
      // console.log(0)

      if (this.curr_patient.sex_code && ['1', '2', '9'].indexOf(this.curr_patient.sex_code.toString()) != -1) {
        param.sex = this.curr_patient.sex_code
        // console.log(1)
      } else {
        return
      }

      if (this.curr_patient.birth_date != null && moment(this.curr_patient.birth_date, 'DD/MM/YYYY', true).isValid()) {
        param.birth_date = this.curr_patient.birth_date?.substr(6, 4) + this.curr_patient.birth_date?.substr(3, 2) + this.curr_patient.birth_date?.substr(0, 2)
        // console.log(2)
      } else {
        return
      }

      if (this.curr_cancer.diagnosis_date != null && moment(this.curr_cancer.diagnosis_date, 'DD/MM/YYYY', true).isValid()) {
        param.diag_date = this.curr_cancer.diagnosis_date?.substr(6, 4) + this.curr_cancer.diagnosis_date?.substr(3, 2) + this.curr_cancer.diagnosis_date?.substr(0, 2)
        // console.log(3)
      } else {
        return
      }

      if (moment(this.curr_patient.birth_date, 'DD/MM/YYYY', true).isValid() && moment(this.curr_cancer.diagnosis_date, 'DD/MM/YYYY', true).isValid()) {
        param.age = moment(this.curr_cancer.diagnosis_date, 'DD/MM/YYYY').diff(moment(this.curr_patient.birth_date, 'DD/MM/YYYY'), 'years')
        // console.log(4)
      } else {
        return
      }

      if (this.curr_cancer.topo_text == '') return
      let topo_x = this.curr_cancer.topo_text?.substr(0, this.curr_cancer.topo_text.indexOf(' '))
      if (Object.keys(this.topo_list).indexOf(topo_x) != -1) {
        param.topography = topo_x
        // console.log(5)
      } else {
        return
      }

      if (this.curr_cancer.morphology_text == '') return
      let mopho_x = this.curr_cancer.morphology_text?.substr(0, this.curr_cancer.morphology_text.indexOf(' '))
      let mopho_array = Object.values(this.morphology_list).map((obj) => obj?.substr(0, obj.indexOf(' ')))
      if (mopho_array.indexOf(mopho_x) != -1) {
        param.morphology = mopho_x
        // console.log(6)
      } else {
        return
      }

      if (this.curr_cancer.behaviour_text == '') return
      let behav_x = this.curr_cancer.behaviour_text?.substr(0, this.curr_cancer.behaviour_text.indexOf(' '))
      if (Object.keys(this.behaviour_list).indexOf(behav_x) != -1) {
        param.behaviour = behav_x
        // console.log(7)
      } else {
        return
      }

      // console.log(8)

      this.axios.get(`tcb/patients`, { params: param }).then((response) => {
        // console.log(response)
        if (response.data.valid) {
          this.curr_cancer.icd10_code = response.data.icd10
          this.icd10_disabled = true
        } else {
          this.$toast.warning(response.data.message)
          this.curr_cancer.icd10_code = ''
          this.icd10_disabled = false
        }
      })
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      this.$refs.formsum.validate().then((success) => {
        if (!success) {
          this.$toast.error('ข้อมูลไม่ครบถ้วนสมบูรณ์ กรุณาตรวจสอบอีกครั้ง !')
          return
        }

        let param = {
          ...this.curr_patient,
          ...this.curr_cancer,
        }

        this.axios
          .post('tcb/cancersums', param)
          .then((res) => {
            if (res.data.status) {
              this.$nextTick(() => {
                this.$parent.loadItems()
                this.$bvModal.hide('modal-cancer-detail')
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
    showForm(patient_id) {
      let loader = this.$loading.show()
      this.getReference()
      this.axios.get(`tcb/cancers?t=get-patient-cancer-approve&patient_id=${patient_id}&history=1&detail=1`).then((response) => {
        this.curr_patient = response.data.curr_patient
        this.cancers = response.data.cancers
        this.old_cancer = response.data.old_cancer ? response.data.old_cancer : new PatientCancer()
        this.curr_cancer = response.data.curr_cancer ? response.data.curr_cancer : new PatientCancer()

        this.curr_cancer.diagnosis_date = this.curr_cancer.diagnosis_date ? moment(this.curr_cancer.diagnosis_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.excision_in_cut_date = this.curr_cancer.excision_in_cut_date ? moment(this.curr_cancer.excision_in_cut_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.excision_in_read_date = this.curr_cancer.excision_in_read_date ? moment(this.curr_cancer.excision_in_read_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.recurrent_date = this.curr_cancer.recurrent_date ? moment(this.curr_cancer.recurrent_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.tnm_date = this.curr_cancer.tnm_date ? moment(this.curr_cancer.tnm_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_1_date = this.curr_cancer.met_1_date ? moment(this.curr_cancer.met_1_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_2_date = this.curr_cancer.met_2_date ? moment(this.curr_cancer.met_2_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_3_date = this.curr_cancer.met_3_date ? moment(this.curr_cancer.met_3_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_4_date = this.curr_cancer.met_4_date ? moment(this.curr_cancer.met_4_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_5_date = this.curr_cancer.met_5_date ? moment(this.curr_cancer.met_5_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_6_date = this.curr_cancer.met_6_date ? moment(this.curr_cancer.met_6_date).add(543, 'years').format('DD/MM/YYYY') : null
        this.curr_cancer.met_7_date = this.curr_cancer.met_7_date ? moment(this.curr_cancer.met_7_date).add(543, 'years').format('DD/MM/YYYY') : null

        this.$nextTick(() => {
          this.$refs['modalCancerDetail'].show()
          loader.hide()
        })
      })
    },
    getReference() {
      this.axios.get('tcb/cancers?t=get-reference').then((response) => {
        this.finance_support_list = response.data.finance_support_list
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

        Object.entries(response.data.t_list).map(([key, val]) => (this.t_list_arr[key] = val))
        Object.entries(response.data.n_list).map(([key, val]) => (this.n_list_arr[key] = val))
        Object.entries(response.data.m_list).map(([key, val]) => (this.m_list_arr[key] = val))

        Object.entries(response.data.stage_list).map(([key, val]) => (this.stage_list_arr[key] = val))
        Object.entries(response.data.extension_list).map(([key, val]) => (this.extension_list_arr[key] = val))

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

<style scoped>
.min-min-w-150px {
  min-width: 150px;
}
</style>
