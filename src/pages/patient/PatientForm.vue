<template>
  <div>
    <b-modal id="modal-patient-form" ref="modalPatientForm" size="xl" @ok="handleOk" cancel-title="ยกเลิก" ok-title="บันทึก">
      <template #modal-title> ข้อมูลผู้ป่วย </template>
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
              <b-container v-if="create_mode == true" fluid>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2">
                    <h6 class="text-pink-600 fs-5 pt-2">ข้อมูลโรคมะเร็ง</h6>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-entrance-date" class="fs-5">25. วันที่เข้ารับบริการ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider rules="required" name="entrance_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.entrance_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-finance-support" class="fs-5">26. สิทธิการรักษา:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider :rules="{ required: true }" name="finance_support_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="finance-support-list" v-model="curr_cancer.finance_support_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="finance-support-list">
                          <option v-for="(value, key) in finance_support_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-diagnosis-date" class="fs-5">27. ว/ด/ป ที่วินิจฉัย:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider rules="required|date_format_th" name="diagnosis_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.diagnosis_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-diagnosis" class="fs-5">28. วิธีวินิจฉัย:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider :rules="{ required: true }" name="diagnosis_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="diagnosis-list" v-model="curr_cancer.diagnosis_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="diagnosis-list">
                          <option v-for="(value, key) in diagnosis_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pt-2">
                    <b-form-checkbox plain id="recurrent" name="recurrent" v-model="curr_cancer.diagnosis_out" value="1" unchecked-value="0"><span class="topiclabel fs-5">29 วินิจฉัยนอก รพ</span> </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-excision-in-cut-date" class="fs-5">30. ว/ด/ป ที่ตัดชิ้นเนื้อ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider rules="date_format_th" name="excision_in_cut_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.excision_in_cut_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-excision-in-read-date" class="fs-5">31. ว/ด/ป ที่อ่านชิ้นเนื้อ:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="date_format_th" name="excision_in_read_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.excision_in_read_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-topo" class="fs-5">32. Topography:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider :rules="{ required: currentUser.roleCancer == 'Y' ? true : false }" name="topo_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="topo-list" v-model="curr_cancer.topo_text" :state="errors[0] ? false : valid ? true : null" :disabled="currentUser.roleCancer == 'Y' ? false : true"></b-form-input>
                        <datalist id="topo-list">
                          <option v-for="(value, key) in topo_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                    <label for="input-recurent" class="fs-5">33.</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pt-2">
                    <b-form-checkbox plain id="recurrent" name="recurrent" v-model="curr_cancer.recurrent" value="1" unchecked-value="0"><span class="topiclabel fs-5"> Recurrent</span> </b-form-checkbox>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-laterality" class="fs-5">34. ว/ด/ป Recurrent:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider :rules="{ required: curr_cancer.recurrent == 1 ? true : false }" name="recurrent_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.recurrent_date" :disabled="curr_cancer.recurrent == 1 ? false : true" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-morphology" class="fs-5">35. Morphology:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider :rules="{ required: currentUser.roleCancer == 'Y' ? true : false }" name="morphology_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="morphology-list" v-model="curr_cancer.morphology_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="morphology-list">
                          <option v-for="(value, key) in morphology_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-behaviour" class="fs-5">36. Behaviour:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider :rules="{ required: currentUser.roleCancer == 'Y' ? true : false }" name="behaviour_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="behaviour-list" v-model="curr_cancer.behaviour_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="behaviour-list">
                          <option v-for="(value, key) in behaviour_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel ps-0">
                    <label for="input-grade" class="fs-5">37. Grade:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider :rules="{ required: currentUser.roleCancer == 'Y' ? true : false }" name="grade_text">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="grade-list" v-model="curr_cancer.grade_text" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="grade-list">
                          <option v-for="(value, key) in grade_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-t" class="fs-5">38. T-N-M:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="1" xl="1" class="pb-1">
                    <b-form-group>
                      <b-form-select :select-size="1" id="input-t" class="form-select" plain v-model="curr_cancer.t_code" :options="t_list"></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="8" md="8" lg="1" xl="1" class="pb-1">
                    <b-form-group>
                      <b-form-select :select-size="1" id="input-n" class="form-select" plain v-model="curr_cancer.n_code" :options="n_list"></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="8" md="8" lg="1" xl="1" class="pb-1">
                    <b-form-group>
                      <b-form-select :select-size="1" id="input-m" class="form-select" plain v-model="curr_cancer.m_code" :options="m_list"></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-tnm" class="fs-5">39. ว/ด/ป TNM/Stage:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider rules="date_format_th" name="tnm_date">
                      <b-form-group slot-scope="{ valid, errors }">
                        <masked-input autocomplete="off" pattern="11/11/1111" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" v-model="curr_cancer.tnm_date" :state="errors[0] ? false : valid ? true : null"></masked-input>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel ps-0">
                    <label for="input-stage" class="fs-5">40. stage:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                    <validation-provider :rules="{ required: currentUser.roleCancer == 'Y' ? true : false }" name="stage_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-stage" class="form-select" plain v-model="curr_cancer.stage_code" :options="stage_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-extension" class="fs-5">41. Extend:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                    <validation-provider :rules="{ required: currentUser.roleCancer == 'Y' ? true : false }" name="extension_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-select :select-size="1" id="input-extension" class="form-select" plain v-model="curr_cancer.extension_code" :options="extension_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-extension" class="fs-5">42. ICD-10:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="5" xl="5" class="pb-1">
                    <validation-provider :rules="{ required: true }" name="icd10_code">
                      <b-form-group slot-scope="{ valid, errors }">
                        <b-form-input plain list="icd10-list" :disabled="icd10_disabled" v-model="curr_cancer.icd10_code" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                        <datalist id="icd10-list">
                          <option v-for="(value, key) in icd10_list" :key="key">{{ value }}</option>
                        </datalist>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                    <label for="input-metastasis" class="fs-5">43. Metastasis:</label>
                  </b-col>
                  <b-col sm="8" md="8" lg="10" xl="10" class="pb-1">
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-1" name="met-1" v-model="curr_cancer.met_1" value="1" unchecked-value="0"> Bone</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-1-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_1_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_1_date" :disabled="curr_cancer.met_1 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-2" name="met-2" v-model="curr_cancer.met_2" value="1" unchecked-value="0"> Brain</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-2-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_2_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_2_date" :disabled="curr_cancer.met_2 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-3" name="met-3" v-model="curr_cancer.met_3" value="1" unchecked-value="0"> Liver</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-3-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_3_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_3_date" :disabled="curr_cancer.met_3 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-4" name="met-4" v-model="curr_cancer.met_4" value="1" unchecked-value="0"> Lung</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-4-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_4_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_4_date" :disabled="curr_cancer.met_4 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-5" name="met-5" v-model="curr_cancer.met_5" value="1" unchecked-value="0"> Lymph Node</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-5-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_5_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_5_date" :disabled="curr_cancer.met_5 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-6" name="met-6" v-model="curr_cancer.met_6" value="1" unchecked-value="0"> Peritoneum</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-6-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_6_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_6_date" :disabled="curr_cancer.met_6 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="8" md="8" lg="2" xl="2" class="mt-2">
                        <b-form-checkbox plain id="met-7" name="met-7" v-model="curr_cancer.met_7" value="1" unchecked-value="0"> Other</b-form-checkbox>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-7-date" class="fs-5">ว/ด/ป:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="2" xl="2" class="pb-1">
                        <validation-provider :rules="{ date_format_th: true }" name="met_7_date">
                          <b-form-group slot-scope="{ valid, errors }">
                            <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_cancer.met_7_date" :disabled="curr_cancer.met_7 == 1 ? false : true" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                        <label for="input-met-7-other" class="fs-5">ระบุ:</label>
                      </b-col>
                      <b-col sm="8" md="8" lg="6" xl="6">
                        <validation-provider :rules="{}" name="met_7_other">
                          <b-form-group slot-scope="{ valid, errors }">
                            <b-form-input autocomplete="off" type="text" v-model="curr_cancer.met_7_other" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2">
                    <h6 class="text-pink-600 fs-5 pt-2">44. Treatment</h6>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mb-2">
                    <b-button size="sm" variant="success" @click="addTradtment"><i class="fas fa-plus"></i> เพิ่มรายการ Treatment</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <div v-for="(treat, idx) in curr_treatments" :key="treat.id">
                  <b-row class="mt-2">
                    <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                      <label for="input-met-7-other" class="fs-5">Treatment ครั้งที่ {{ idx + 1 }}:</label>
                    </b-col>
                    <b-col sm="8" md="8" lg="4" xl="4">
                      <validation-provider :rules="{ required: true }" :name="'treatment_code_' + idx">
                        <b-form-group slot-scope="{ valid, errors }">
                          <b-form-input plain :list="'treatment-list_' + idx" v-model="curr_treatments[idx].treatment_code" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                          <datalist :id="'treatment-list_' + idx">
                            <option v-for="(value, key) in treatment_list" :key="key">{{ value }}</option>
                          </datalist>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col sm="4" md="4" lg="3" xl="3" class="mt-2 topiclabel">
                      <label for="input-met-7-other" class="fs-5">ว/ด/ป (พ.ศ.) Treatment :</label>
                    </b-col>
                    <b-col sm="8" md="8" lg="2" xl="2">
                      <validation-provider :rules="{ required: true, date_format_th: true }" :name="'treatment_date_' + idx">
                        <b-form-group slot-scope="{ valid, errors }">
                          <masked-input autocomplete="off" pattern="11/11/1111" v-model="curr_treatments[idx].treatment_date" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></masked-input>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col sm="4" md="4" lg="1" xl="1" class="mt-1">
                      <b-button size="sm" variant="danger" @click="removeTreatment(idx)">
                        <i class="fas fa-trash"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                      <label for="input-met-7-other" class="fs-5"></label>
                    </b-col>
                    <b-col sm="8" md="8" lg="2" xl="2" class="pt-2">
                      <b-form-checkbox plain v-model="curr_treatments[idx].none_protocol" value="1" unchecked-value="0"><span class="topiclabel fs-5">Non protocol</span> </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel">
                      <label for="input-met-7-other" class="fs-5">Non protocol regimen</label>
                    </b-col>
                    <b-col sm="8" md="8" lg="4" xl="4" class="mt-2 mb-2">
                      <validation-provider :rules="{}">
                        <b-form-group>
                          <b-form-textarea v-model="curr_treatments[idx].none_protocol_note" type="text" rows="3"></b-form-textarea>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                      <label for="input-met-7-other" class="fs-5">Note :</label>
                    </b-col>
                    <b-col sm="8" md="8" lg="4" xl="4" class="mt-2 mb-2">
                      <validation-provider :rules="{}" :name="'note_' + idx">
                        <b-form-group>
                          <b-form-textarea :id="'note_' + idx" v-model="curr_treatments[idx].note" type="text" rows="3"></b-form-textarea>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>
                </div>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="12" xl="12">
                    <h6 class="text-pink-600 fs-5 pt-2">45. Clinical Summary</h6>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2"></b-col>
                  <b-col sm="8" md="8" lg="10" xl="10" class="mt-2 mb-2">
                    <validation-provider :rules="{}" name="clinical_summary">
                      <b-form-group>
                        <b-form-textarea id="clinical_summary" v-model="curr_cancer.clinical_summary" type="text" rows="3"></b-form-textarea>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="4" md="4" lg="2" xl="2">
                    <h6 class="text-pink-600 fs-5 pt-2">46. เอกสารแนบ</h6>
                  </b-col>
                  <b-col sm="4" md="4" lg="2" xl="2" class="mb-2">
                    <b-button size="sm" variant="success" @click="addFile"><i class="fas fa-plus"></i> เพิ่มเอกสารแนบ</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
                </b-row>
                <div v-for="(file, idx) in curr_files" :key="file.id">
                  <b-row class="mt-2">
                    <b-col sm="4" md="4" lg="2" xl="2" class="mt-2 topiclabel ps-0">
                      <label for="input-stage" class="fs-5">เอกสารแนบ ที่ {{ idx + 1 }}:</label>
                    </b-col>
                    <b-col sm="8" md="8" lg="3" xl="3" class="pb-1">
                      <validation-provider rules="required" :name="'file_group_id_' + idx">
                        <b-form-group slot-scope="{ valid, errors }">
                          <b-form-select :select-size="1" id="input-stage" class="form-select" plain v-model="curr_files[idx].file_group_id" :options="file_group_list" :state="errors[0] ? false : valid ? true : null"></b-form-select>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col sm="4" md="4" lg="1" xl="1" class="mt-2 topiclabel">
                      <label for="input-met-7-other" class="fs-5">File :</label>
                    </b-col>
                    <b-col sm="8" md="8" lg="5" xl="5">
                      <validation-provider :rules="{ required: true }" :name="'file_' + idx">
                        <b-form-group slot-scope="{ valid, errors }">
                          <b-form-file plain v-model="curr_files[idx].file" :ref="'file_' + idx" accept="image/jpeg, image/png, application/pdf" :class="'form-control ' + (errors[0] ? 'is-invalid' : valid ? 'is-valid' : '')" :state="errors[0] ? false : valid ? true : null"></b-form-file>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col sm="4" md="4" lg="1" xl="1" class="mt-1">
                      <b-button size="sm" variant="danger" @click="removeFile(idx)">
                        <i class="fas fa-trash"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </div>
                <b-row>
                  <b-col><hr class="m-1" /></b-col>
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
import PatientCancer from '../../_models/patient_cancer'

export default {
  name: 'PatientForm',
  data() {
    return {
      create_mode: true,
      curr_patient: new Patient(null, null),
      curr_cancer: new PatientCancer(),
      curr_treatments: [],
      curr_files: [],
      icd10_disabled: false,
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
      extension_list: [],
      lifestatus_list: [],
      recurent_list: [],
      laterality_list: [],
      file_group_list: [
        { text: '1 Pathology report', value: 1 },
        { text: '2 Imaging study', value: 2 },
        { text: '3 LAB report', value: 3 },
        { text: '4 Other', value: 4 },
      ],
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
    'curr_patient.sex_code'(newVal) {
      if (newVal == null || newVal == '') return
      if (['1', '2', '9'].indexOf(newVal) != -1) {
        this.getIcd10()
      }
    },
    'curr_patient.birth_date'(newVal) {
      if (newVal == null || newVal == '') return
      if (moment(newVal, 'DD/MM/YYYY', true).isValid()) {
        this.getIcd10()
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
    showForm(id) {
      let loader = this.$loading.show()
      if (id) {
        this.create_mode = false
        this.getReference(id)
        this.axios.get(`tcb/patients/${id}`).then((response) => {
          this.curr_patient = response.data
          this.curr_patient.birth_date = moment(response.data.birth_date).add(543, 'years').format('DD/MM/YYYY')
          this.$nextTick(() => {
            this.$refs['modalPatientForm'].show()
            loader.hide()
          })
        })
      } else {
        this.create_mode = true
        this.resetForm()
        this.getReferenceCancer()
        this.getReference(null)
        this.$nextTick(() => {
          this.$refs['modalPatientForm'].show()
          loader.hide()
        })
      }
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

        // ถ้าเป็นการเพิ่มข้อมูลใหม่
        if (this.create_mode) {
          let param = {
            ...this.curr_patient,
            ...this.curr_cancer,
            ...{ curr_treatments: this.curr_treatments },
            ...{ curr_files: this.curr_files },
            ...{
              cancer_add: true,
            },
          }

          this.axios
            .post('tcb/patients', param, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
              if (res.data.status) {
                this.$toast.success(res.data.message)
                this.$parent.loadItems()
                this.$nextTick(() => {
                  this.$bvModal.hide('modal-patient-form')
                })
              } else {
                this.$toast.error(res.data.message)
              }
            })
            .catch((error) => {
              console.log(error.response.data.message)
            })
          // ถ้าเป็นการ Update ข้อมูล Patient
        } else {
          let param = {
            ...this.curr_patient,
            ...{
              cancer_add: false,
            },
          }

          this.axios
            .put(`tcb/patients/${this.curr_patient.id}`, param)
            .then((res) => {
              if (res.data.status) {
                this.$toast.success(res.data.message)
                this.$parent.loadItems()
                this.$nextTick(() => {
                  this.$bvModal.hide('modal-patient-form')
                })
              } else {
                this.$toast.error(res.data.message)
              }
            })
            .catch((error) => {
              console.log(error.response.data.message)
            })
        }
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
    getReferenceCancer() {
      this.axios.get('tcb/cancers?t=get-reference').then((response) => {
        this.finance_support_list = response.data.finance_support_list
        this.diagnosis_list = response.data.diagnosis_list
        this.topo_list = response.data.topo_list
        this.morphology_list = response.data.morphology_list
        this.behaviour_list = response.data.behaviour_list
        this.grade_list = response.data.grade_list
        this.t_list = response.data.t_list
        this.n_list = response.data.n_list
        this.m_list = response.data.m_list
        this.stage_list = response.data.stage_list
        this.extension_list = response.data.extension_list
        this.icd10_list = response.data.icd10_list
        this.treatment_list = response.data.treatment_list
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
    resetForm() {
      this.curr_patient = new Patient()
      this.curr_treatments = []
      this.curr_files = []
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
    addTradtment() {
      this.curr_treatments.push({ treatment_code: null, treatment_date: null, none_protocol: 0, none_protocol_note: '', note: '' })
    },
    removeTreatment(idx) {
      this.$nextTick(() => {
        this.curr_treatments.splice(idx, 1)
      })
    },
    addFile() {
      this.curr_files.push({ file_group_id: null, file: null })
    },
    removeFile(idx) {
      this.$nextTick(() => {
        this.curr_files.splice(idx, 1)
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
