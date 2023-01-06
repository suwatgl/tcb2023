<template>
  <div>
    <b-modal id="modal-patient-form-cancer-sum" ref="modalPatientFormCancerSum" size="xl" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> ข้อมูลโรคมะเร็ง </template>
      <div>
        <b-card no-body>
          <validation-observer tag="form" ref="form">
            <form @submit.stop.prevent="handleSubmit">
              <b-container fluid>
                <b-row class="mt-2">
                  <div class="table-responsive pt-5px">
                    <table class="table table-bordered">
                      <thead>
                        <tr class="align-middle text-center">
                          <th class="w-45px">ลำดับ</th>
                          <th class="min-w-150px text-nowrap">รายการ</th>
                          <th class="w-200px">ข้อมูลโรคมะเร็งครั้งล่าสุด</th>
                          <th class="w-200px">สรุปโรคมะเร็งครั้งที่แล้วโดยทะเบียนมะเร็ง</th>
                          <th class="w-300px">สรุปโรคมะเร็งครั้งปัจจุบัน</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr :class="'align-middle ' + (last_cancer.diagnosis_date != last_cancer_sum.diagnosis_date ? 'table-warning' : '')">
                          <td class="w-45px text-center">26</td>
                          <td class="min-w-150px text-nowrap">ว/ด/ป ที่วินิจฉัย</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.diagnosis_date }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.diagnosis_date }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider rules="required|date_format_th" name="diagnosis_date">
                              <b-form-group slot-scope="{ valid, errors }">
                                <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer_sum.diagnosis_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.diagnosis_text != last_cancer_sum.diagnosis_text ? 'table-warning' : '')">
                          <td class="w-45px text-center">27</td>
                          <td class="min-w-150px text-nowrap">วิธีวินิจฉัย</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.diagnosis_text }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.diagnosis_text }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider :rules="{ required: true }" name="diagnosis_text">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-input plain list="diagnosis-list" v-model="curr_cancer_sum.diagnosis_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                <datalist id="diagnosis-list">
                                  <option v-for="(value, key) in diagnosis_list" :key="key">{{ value }}</option>
                                </datalist>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.excision_in_cut_date != last_cancer_sum.excision_in_cut_date ? 'table-warning' : '')">
                          <td class="w-45px text-center">28</td>
                          <td class="min-w-150px text-nowrap">ว/ด/ป ที่ตัดชิ้นเนื้อ</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.excision_in_cut_date }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.excision_in_cut_date }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider rules="date_format_th" name="excision_in_cut_date">
                              <b-form-group slot-scope="{ valid, errors }">
                                <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="last_cancer_sum.excision_in_cut_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.topo_text != last_cancer_sum.topo_text ? 'table-warning' : '')">
                          <td class="w-45px text-center">29</td>
                          <td class="min-w-150px text-nowrap">Topography</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.topo_text }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.topo_text }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider :rules="{ required: true }" name="topo_text">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-input plain list="topo-list" v-model="curr_cancer_sum.topo_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                <datalist id="topo-list">
                                  <option v-for="(value, key) in topo_list" :key="key">{{ value }}</option>
                                </datalist>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.recurrent != last_cancer_sum.recurrent ? 'table-warning' : '')">
                          <td class="w-45px text-center">30</td>
                          <td class="min-w-150px text-nowrap">Recurrent</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.recurrent == 1 ? 'Yes' : 'No' }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.recurrent == 1 ? 'Yes' : 'No' }}
                          </td>
                          <td class="w-200px text-nowrap p1">
                            <b-form-checkbox plain id="recurrent" name="recurrent" v-model="curr_cancer_sum.recurrent" value="1" unchecked-value="0"><span> Recurrent</span> </b-form-checkbox>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.recurrent_date != last_cancer_sum.recurrent_date ? 'table-warning' : '')">
                          <td class="w-45px text-center">31</td>
                          <td class="min-w-150px text-nowrap">ว/ด/ป Recurrent</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.recurrent_date }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.recurrent_date }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider :rules="{ required: curr_cancer_sum.recurrent == 1 ? true : false }" name="recurrent_date">
                              <b-form-group slot-scope="{ valid, errors }">
                                <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer_sum.recurrent_date" :disabled="curr_cancer_sum.recurrent == 1 ? false : true" :state="errors[0] ? false : valid ? true : null"></masked-input>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.morphology_text != last_cancer_sum.morphology_text ? 'table-warning' : '')">
                          <td class="w-45px text-center">32</td>
                          <td class="min-w-150px text-nowrap">Morphology</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.morphology_text }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.morphology_text }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider :rules="{ required: true }" name="morphology_text">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-input plain list="morphology-list" v-model="curr_cancer_sum.morphology_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                <datalist id="morphology-list">
                                  <option v-for="(value, key) in morphology_list" :key="key">{{ value }}</option>
                                </datalist>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.behaviour_text != last_cancer_sum.behaviour_text ? 'table-warning' : '')">
                          <td class="w-45px text-center">33</td>
                          <td class="min-w-150px text-nowrap">Behaviour</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.behaviour_text }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.behaviour_text }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider :rules="{ required: true }" name="behaviour_text">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-input plain list="behaviour-list" v-model="last_cancer_sum.behaviour_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                <datalist id="behaviour-list">
                                  <option v-for="(value, key) in behaviour_list" :key="key">{{ value }}</option>
                                </datalist>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.grade_text != last_cancer_sum.grade_text ? 'table-warning' : '')">
                          <td class="w-45px text-center">34</td>
                          <td class="min-w-150px text-nowrap">Grade</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.grade_text }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.grade_text }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider :rules="{ required: true }" name="grade_text">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-input plain list="grade-list" v-model="last_cancer_sum.grade_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                <datalist id="grade-list">
                                  <option v-for="(value, key) in grade_list" :key="key">{{ value }}</option>
                                </datalist>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle' + (last_cancer.t_code != last_cancer_sum.t_code || last_cancer.n_code != last_cancer_sum.n_code || last_cancer.m_code != last_cancer_sum.m_code ? ' table-warning' : '')">
                          <td class="w-45px text-center">35</td>
                          <td class="min-w-150px text-nowrap">T-N-M</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">{{ t_list_arr[last_cancer.t_code] }} - {{ n_list_arr[last_cancer.n_code] }} - {{ m_list_arr[last_cancer.m_code] }}</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">{{ t_list_arr[last_cancer_sum.t_code] }} - {{ n_list_arr[last_cancer_sum.n_code] }} - {{ m_list_arr[last_cancer_sum.m_code] }}</td>
                          <td class="w-200px text-nowrap p1">
                            <b-row>
                              <b-col>
                                <b-form-group>
                                  <b-form-select :select-size="1" id="input-t" class="form-select" plain v-model="curr_cancer_sum.t_code" :options="t_list"></b-form-select>
                                </b-form-group>
                              </b-col>
                              <b-col>
                                <b-form-group>
                                  <b-form-select :select-size="1" id="input-n" class="form-select" plain v-model="curr_cancer_sum.n_code" :options="n_list"></b-form-select>
                                </b-form-group>
                              </b-col>
                              <b-col>
                                <b-form-group>
                                  <b-form-select :select-size="1" id="input-m" class="form-select" plain v-model="curr_cancer_sum.m_code" :options="m_list"></b-form-select>
                                </b-form-group>
                              </b-col>
                            </b-row>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.tnm_date != last_cancer_sum.tnm_date ? 'table-warning' : '')">
                          <td class="w-45px text-center">36</td>
                          <td class="min-w-150px text-nowrap">ว/ด/ป TNM/Stage</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.tnm_date }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.tnm_date }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider rules="required|date_format_th" name="tnm_date">
                              <b-form-group slot-scope="{ valid, errors }">
                                <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer_sum.tnm_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.stage_code != last_cancer_sum.stage_code ? 'table-warning' : '')">
                          <td class="w-45px text-center">37</td>
                          <td class="min-w-150px text-nowrap">Stage</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ stage_list_arr[last_cancer.stage_code] }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ stage_list_arr[curr_cancer_sum.stage_code] }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider rules="required" name="stage_code">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-select :select-size="1" id="input-stage" class="form-select" plain v-model="curr_cancer_sum.stage_code" :options="stage_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.extension_code != last_cancer_sum.extension_code ? 'table-warning' : '')">
                          <td class="w-45px text-center">38</td>
                          <td class="min-w-150px text-nowrap">Extend</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ extension_list_arr[last_cancer.extension_code] }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ extension_list_arr[curr_cancer_sum.extension_code] }}
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <validation-provider rules="required" name="extension_code">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-select :select-size="1" id="input-stage" class="form-select" plain v-model="curr_cancer_sum.extension_code" :options="extension_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr :class="'align-middle ' + (last_cancer.icd10_code != last_cancer_sum.icd10_code ? 'table-warning' : '')">
                          <td class="w-45px text-center">39</td>
                          <td class="min-w-150px text-nowrap">ICD-10</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer.icd10_code }}
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            {{ last_cancer_sum.icd10_code }}
                          </td>
                          <td class="w-200px text-nowrap p-1">
                            <validation-provider :rules="{ required: true }" name="icd10_code">
                              <b-form-group slot-scope="{ valid, errors }">
                                <b-form-input plain list="icd10-list" :disabled="icd10_disabled" v-model="curr_cancer_sum.icd10_code" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                <datalist id="icd10-list">
                                  <option v-for="(value, key) in icd10_list" :key="key">{{ value }}</option>
                                </datalist>
                              </b-form-group>
                            </validation-provider>
                          </td>
                        </tr>
                        <tr>
                          <td class="w-45px text-center">40</td>
                          <td class="min-w-150px text-nowrap">Metastasis</td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_1" value="1" unchecked-value="0" disabled> Bone</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_1_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_2" value="1" unchecked-value="0" disabled> Brain</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_2_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_3" value="1" unchecked-value="0" disabled> Liver</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_3_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_4" value="1" unchecked-value="0" disabled> Lung</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_4_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_5" value="1" unchecked-value="0" disabled> Lymph Node</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_5_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_6" value="1" unchecked-value="0" disabled> Peritoneum</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_6_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer.met_7" value="1" unchecked-value="0" disabled> Other</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer.met_7_date" disabled></b-form-input>
                              </b-col>
                              <b-col sm="4" md="4" lg="3" xl="3" class="mt-2">
                                <label>ระบุ:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="9" xl="9">
                                <b-form-input type="text" v-model="last_cancer.met_7_other" disabled></b-form-input>
                              </b-col>
                            </b-row>
                          </td>
                          <td class="w-200px text-nowrap pt-1px pb-1px">
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_1" value="1" unchecked-value="0" disabled> Bone</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_1_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_2" value="1" unchecked-value="0" disabled> Brain</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_2_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_3" value="1" unchecked-value="0" disabled> Liver</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_3_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_4" value="1" unchecked-value="0" disabled> Lung</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_4_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_5" value="1" unchecked-value="0" disabled> Lymph Node</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_5_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_6" value="1" unchecked-value="0" disabled> Peritoneum</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_6_date" disabled></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="6" xl="6" class="mt-2">
                                <b-form-checkbox plain v-model="last_cancer_sum.met_7" value="1" unchecked-value="0" disabled> Other</b-form-checkbox>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <b-form-input type="text" v-model="last_cancer_sum.met_7_date" disabled></b-form-input>
                              </b-col>
                              <b-col sm="4" md="4" lg="3" xl="3" class="mt-2">
                                <label>ระบุ:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="9" xl="9">
                                <b-form-input type="text" v-model="last_cancer_sum.met_7_other" disabled></b-form-input>
                              </b-col>
                            </b-row>
                          </td>
                          <td class="w-350px text-nowrap p-1">
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-1" name="met-1" v-model="curr_cancer_sum.met_1" value="1" unchecked-value="0"> Bone</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-1-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_1_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_1_date" :disabled="curr_cancer_sum.met_1 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-2" name="met-2" v-model="curr_cancer_sum.met_2" value="1" unchecked-value="0"> Brain</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-2-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_2_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_2_date" :disabled="curr_cancer_sum.met_2 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-3" name="met-3" v-model="curr_cancer_sum.met_3" value="1" unchecked-value="0"> Liver</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-3-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_3_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_3_date" :disabled="curr_cancer_sum.met_3 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-4" name="met-4" v-model="curr_cancer_sum.met_4" value="1" unchecked-value="0"> Lung</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-4-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_4_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_4_date" :disabled="curr_cancer_sum.met_4 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-5" name="met-5" v-model="curr_cancer_sum.met_5" value="1" unchecked-value="0"> Lymph Node</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-5-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_5_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_5_date" :disabled="curr_cancer_sum.met_5 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-6" name="met-6" v-model="curr_cancer_sum.met_6" value="1" unchecked-value="0"> Peritoneum</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-6-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_6_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_6_date" :disabled="curr_cancer_sum.met_6 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="8" md="8" lg="4" xl="4" class="mt-2">
                                <b-form-checkbox plain id="met-7" name="met-7" v-model="curr_cancer_sum.met_7" value="1" unchecked-value="0"> Other</b-form-checkbox>
                              </b-col>
                              <b-col sm="4" md="4" lg="2" xl="2" class="mt-2">
                                <label for="input-met-7-date">ว/ด/ป:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="6" xl="6" class="pb-1">
                                <validation-provider :rules="{ date_format_th: true }" name="met_7_date">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer_sum.met_7_date" :disabled="curr_cancer_sum.met_7 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                              <b-col sm="4" md="4" lg="3" xl="3" class="mt-2">
                                <label for="input-met-7-other">ระบุ:</label>
                              </b-col>
                              <b-col sm="8" md="8" lg="9" xl="9">
                                <validation-provider :rules="{}" name="met_7_other">
                                  <b-form-group slot-scope="{ valid, errors }">
                                    <b-form-input id="input-met-7-other" type="text" v-model="curr_cancer_sum.met_7_other" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                                  </b-form-group>
                                </validation-provider>
                              </b-col>
                            </b-row>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
import PatientCancer from '../../_models/patient_cancer'

export default {
  name: 'PatientFormCancerSum',
  data() {
    return {
      patient_id: null,
      curr_patient: {
        id: null,
        age: null,
        birth_date: null,
        sex_code: null,
      },
      last_cancer: new PatientCancer(),
      last_cancer_sum: new PatientCancer(),
      curr_cancer_sum: new PatientCancer(),
      curr_treatments: [{ treatment_code: null, treatment_date: null, note: '' }],
      icd10_disabled: false,

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
  methods: {
    showForm(patient_id, patient) {
      let loader = this.$loading.show()
      this.curr_patient = patient
      this.getReference()
      if (patient_id) {
        this.axios.get(`tcb/cancers?patient_id=${patient_id}&detail=1`).then((response) => {
          // ข้อมูลมะเร็งล่าสุดที่บันทึกเข้าระบบ
          this.last_cancer = response.data
          this.last_cancer.entrance_date = moment(response.data.entrance_date).add(543, 'years').format('DD/MM/YYYY')
          this.last_cancer.diagnosis_date = moment(response.data.diagnosis_date).add(543, 'years').format('DD/MM/YYYY')
          this.last_cancer.excision_in_cut_date = response.data.excision_in_cut_date ? moment(response.data.excision_in_cut_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.recurrent_date = response.data.recurrent_date ? moment(response.data.recurrent_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.tnm_date = response.data.tnm_date ? moment(response.data.tnm_date).add(543, 'years').format('DD/MM/YYYY') : null

          this.last_cancer.met_1_date = response.data.met_1_date ? moment(response.data.met_1_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.met_2_date = response.data.met_2_date ? moment(response.data.met_2_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.met_3_date = response.data.met_3_date ? moment(response.data.met_3_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.met_4_date = response.data.met_4_date ? moment(response.data.met_4_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.met_5_date = response.data.met_5_date ? moment(response.data.met_5_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.met_6_date = response.data.met_6_date ? moment(response.data.met_6_date).add(543, 'years').format('DD/MM/YYYY') : null
          this.last_cancer.met_7_date = response.data.met_7_date ? moment(response.data.met_7_date).add(543, 'years').format('DD/MM/YYYY') : null

          // ข้อมูลสรุปล่าสุดที่บันทึกเข้าระบบ
          let topo_id = this.last_cancer.topo_text.substr(0, 2)
          this.axios.get(`tcb/cancersums?patient_id=${patient_id}&topo_id=${topo_id}&detail=1`).then((response) => {
            this.last_cancer_sum = response.data
            this.last_cancer_sum.entrance_date = moment(response.data.entrance_date).add(543, 'years').format('DD/MM/YYYY')
            this.last_cancer_sum.diagnosis_date = moment(response.data.diagnosis_date).add(543, 'years').format('DD/MM/YYYY')
            this.last_cancer_sum.excision_in_cut_date = response.data.excision_in_cut_date ? moment(response.data.excision_in_cut_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.recurrent_date = response.data.recurrent_date ? moment(response.data.recurrent_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.tnm_date = response.data.tnm_date ? moment(response.data.tnm_date).add(543, 'years').format('DD/MM/YYYY') : null

            this.last_cancer_sum.met_1_date = response.data.met_1_date ? moment(response.data.met_1_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.met_2_date = response.data.met_2_date ? moment(response.data.met_2_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.met_3_date = response.data.met_3_date ? moment(response.data.met_3_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.met_4_date = response.data.met_4_date ? moment(response.data.met_4_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.met_5_date = response.data.met_5_date ? moment(response.data.met_5_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.met_6_date = response.data.met_6_date ? moment(response.data.met_6_date).add(543, 'years').format('DD/MM/YYYY') : null
            this.last_cancer_sum.met_7_date = response.data.met_7_date ? moment(response.data.met_7_date).add(543, 'years').format('DD/MM/YYYY') : null

            // ข้อมูลที่ได้จากการตรวจสอบจาก API
            let local_cancer_sum = JSON.parse(localStorage.getItem('new_cancer_sum'))
            this.curr_cancer_sum = {
              id: this.last_cancer_sum.id,
              patient_id: this.last_cancer_sum.patient_id,
              entrance_date: null,
              diagnosis_date: local_cancer_sum.diag_date ? moment(local_cancer_sum.diag_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              diagnosis_text: local_cancer_sum.diagnosis_text, // local_cancer_sum.basis,
              excision_in_cut_date: this.last_cancer.excision_in_cut_date == this.last_cancer_sum.excision_in_cut_date ? (this.last_cancer.excision_in_cut_date ? moment(this.last_cancer.excision_in_cut_date).add(543, 'years').format('DD/MM/YYYY') : null) : null,
              diagnosis_out: this.last_cancer.diagnosis_out == this.last_cancer_sum.diagnosis_out ? this.last_cancer_sum.diagnosis_out : null,
              topo_text: local_cancer_sum.topo_text, // local_cancer_sum.topography,
              recurrent: this.last_cancer.recurrent == this.last_cancer_sum.recurrent ? this.last_cancer_sum.recurrent : null,
              recurrent_date: this.last_cancer.recurrent_date == this.last_cancer_sum.recurrent_date ? (this.last_cancer.recurrent_date ? moment(this.last_cancer.recurrent_date).add(543, 'years').format('DD/MM/YYYY') : null) : null,
              morphology_text: local_cancer_sum.morphology_text, // local_cancer_sum.morphology,
              behaviour_text: local_cancer_sum.behaviour_text, // local_cancer_sum.behaviour,
              grade_text: local_cancer_sum.grade_text, // local_cancer_sum.grade,
              t_code: this.last_cancer.t_code == this.last_cancer_sum.t_code ? this.last_cancer.t_code : null,
              n_code: this.last_cancer.n_code == this.last_cancer_sum.n_code ? this.last_cancer.n_code : null,
              m_code: this.last_cancer.m_code == this.last_cancer_sum.m_code ? this.last_cancer.m_code : null,
              tnm_date: this.last_cancer.tnm_date == this.last_cancer_sum.tnm_date ? (this.last_cancer.tnm_date ? moment(this.last_cancer.tnm_date).add(543, 'years').format('DD/MM/YYYY') : null) : null,
              stage_code: local_cancer_sum.stage,
              extension_code: local_cancer_sum.extend,
              icd10_code: this.last_cancer.icd10_code == this.last_cancer_sum.icd10_code ? this.last_cancer.icd10_code : null,
              met_1: local_cancer_sum.metastasis_bone == 'Y' ? 1 : 0,
              met_1_date: local_cancer_sum.metastasis_bone_date ? moment(local_cancer_sum.metastasis_bone_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_2: local_cancer_sum.metastasis_brain == 'Y' ? 1 : 0,
              met_2_date: local_cancer_sum.metastasis_brain_date ? moment(local_cancer_sum.metastasis_brain_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_3: local_cancer_sum.metastasis_liver == 'Y' ? 1 : 0,
              met_3_date: local_cancer_sum.metastasis_liver_date ? moment(local_cancer_sum.metastasis_liver_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_4: local_cancer_sum.metastasis_lung == 'Y' ? 1 : 0,
              met_4_date: local_cancer_sum.metastasis_lung_date ? moment(local_cancer_sum.metastasis_lung_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_5: local_cancer_sum.metastasis_lymph_node == 'Y' ? 1 : 0,
              met_5_date: local_cancer_sum.metastasis_lymph_node_date ? moment(local_cancer_sum.metastasis_lymph_node_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_6: local_cancer_sum.metastasis_peritoneum == 'Y' ? 1 : 0,
              met_6_date: local_cancer_sum.metastasis_peritoneum_date ? moment(local_cancer_sum.metastasis_peritoneum_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_7: local_cancer_sum.metastasis_other == 'Y' ? 1 : 0,
              met_7_date: local_cancer_sum.metastasis_other_date ? moment(local_cancer_sum.metastasis_other_date, 'YYYYMMDD', true).format('DD/MM/YYYY') : null,
              met_7_other: local_cancer_sum.metastasis_other_orgen,
            }
          })
        })
        this.$nextTick(() => {
          this.$refs['modalPatientFormCancerSum'].show()
          loader.hide()
        })
      }
    },
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

      this.curr_cancer_sum.icd10_code = ''
      this.icd10_disabled = false
      // console.log(0)

      if (['1', '2', '9'].indexOf(this.curr_patient.sex_code.toString()) != -1) {
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

      if (this.curr_cancer_sum.diagnosis_date != null && moment(this.curr_cancer_sum.diagnosis_date, 'DD/MM/YYYY', true).isValid()) {
        param.diag_date = this.curr_cancer_sum.diagnosis_date?.substr(6, 4) + this.curr_cancer_sum.diagnosis_date?.substr(3, 2) + this.curr_cancer_sum.diagnosis_date?.substr(0, 2)
        // console.log(3)
      } else {
        return
      }

      if (moment(this.curr_patient.birth_date, 'DD/MM/YYYY', true).isValid() && moment(this.curr_cancer_sum.diagnosis_date, 'DD/MM/YYYY', true).isValid()) {
        param.age = moment(this.curr_cancer_sum.diagnosis_date, 'DD/MM/YYYY').diff(moment(this.curr_patient.birth_date, 'DD/MM/YYYY'), 'years')
        // console.log(4)
      } else {
        return
      }

      if (this.curr_cancer_sum.topo_text == '') return
      let topo_codex = this.curr_cancer_sum.topo_text?.substr(0, this.curr_cancer_sum.topo_text.indexOf(' '))
      if (Object.keys(this.topo_list).indexOf(topo_codex) != -1) {
        param.topography = topo_codex
        // console.log(5)
      } else {
        return
      }

      if (this.curr_cancer_sum.morphology_text == '') return
      let mopho_codex = this.curr_cancer_sum.morphology_text?.substr(0, this.curr_cancer_sum.morphology_text.indexOf(' '))
      let mopho_array = Object.values(this.morphology_list).map((obj) => obj?.substr(0, obj.indexOf(' ')))
      if (mopho_array.indexOf(mopho_codex) != -1) {
        param.morphology = mopho_codex
        // console.log(6)
      } else {
        return
      }

      if (this.curr_cancer_sum.behaviour_text == '') return
      let behav_codex = this.curr_cancer_sum.behaviour_text?.substr(0, this.curr_cancer_sum.behaviour_text.indexOf(' '))
      if (Object.keys(this.behaviour_list).indexOf(behav_codex) != -1) {
        param.behaviour = behav_codex
        // console.log(7)
      } else {
        return
      }

      // console.log(8)

      this.axios.get(`tcb/patients`, { params: param }).then((response) => {
        // console.log(response)
        if (response.data.valid) {
          this.curr_cancer_sum.icd10_code = response.data.icd10
          this.icd10_disabled = true
        } else {
          this.$toast.warning(response.data.message)
          this.curr_cancer_sum.icd10_code = ''
          this.icd10_disabled = false
        }
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
          .put(`tcb/cancersums/${this.curr_cancer_sum.id}`, this.curr_cancer_sum)
          .then((res) => {
            if (res.data.status) {
              this.$toast.success(res.data.message)
              this.$parent.loadItems()
              this.$nextTick(() => {
                this.$bvModal.hide('modal-patient-form-cancer-sum')
              })
            } else {
              this.$toast.error(res.data.message)
            }
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
          })
      })
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
  watch: {
    'curr_cancer_sum.recurrent'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.recurrent_date = null
      }
    },
    'curr_cancer_sum.met_1'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_1_date = null
      }
    },
    'curr_cancer_sum.met_2'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_2_date = null
      }
    },
    'curr_cancer_sum.met_3'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_3_date = null
      }
    },
    'curr_cancer_sum.met_4'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_4_date = null
      }
    },
    'curr_cancer_sum.met_5'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_5_date = null
      }
    },
    'curr_cancer_sum.met_6'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_6_date = null
      }
    },
    'curr_cancer_sum.met_7'(newVal) {
      if (newVal == 0) {
        this.curr_cancer_sum.met_7_date = null
        this.curr_cancer_sum.met_7_other = null
      }
    },
    'curr_cancer_sum.diagnosis_date'(newVal) {
      // console.log(10)
      if (newVal == null || newVal == '') return
      if (moment(newVal, 'DD/MM/YYYY', true).isValid()) {
        this.getIcd10()
      }
    },
    'curr_cancer_sum.topo_text'(newVal) {
      // console.log(20)
      if (newVal == null || newVal == '') return
      let topo_codex = newVal?.substr(0, newVal.indexOf(' '))
      if (Object.keys(this.topo_list).indexOf(topo_codex) != -1) {
        this.getIcd10()
      }
    },
    'curr_cancer_sum.morphology_text'(newVal) {
      // console.log(30)
      if (newVal == null || newVal == '') return
      let mopho_codex = newVal?.substr(0, newVal.indexOf(' '))
      let mopho_array = Object.values(this.morphology_list).map((obj) => obj?.substr(0, obj.indexOf(' ')))
      if (mopho_array.indexOf(mopho_codex) != -1) {
        this.getIcd10()
      }
    },
    'curr_cancer_sum.behaviour_text'(newVal) {
      // console.log(40)
      if (newVal == null || newVal == '') return
      let behav_codex = newVal?.substr(0, newVal.indexOf(' '))
      if (Object.keys(this.behaviour_list).indexOf(behav_codex) != -1) {
        this.getIcd10()
      }
    },
  },
}
</script>

<style></style>
