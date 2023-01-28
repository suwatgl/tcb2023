<template>
  <div>
    <b-modal id="modal-patient-import-refer" ref="modalPatientImportRefer" size="xl" :hide-footer="true">
      <template #modal-title> นำเข้าจากข้อมูลรับ Refer </template>
      <div>
        <b-card no-body class="bg-gray-100">
          <b-table :items="curr_refers" :fields="fields" :per-page="perPage" :current-page="currentPage">
            <template #cell(name)="data"> {{ data.item.title_name }}{{ data.item.name }} {{ data.item.last_name }} </template>
            <template #cell(birth_date)="data"> {{ data.item.birth_date | moment('add', '543 years', 'DD/MM/YYYY') }} </template>
            <template #cell(created_at)="data"> {{ data.item.created_at | moment('add', '543 years', 'DD/MM/YYYY HH:ss') }} </template>
            <template #cell(actions)="data">
              <button type="button" class="btn btn-sm btn-success ms-5px" @click="importItem(data.item.id, data.item.patient_id, data.item.title_name + data.item.name + ' ' + data.item.last_name)"><i class="fas fa-plus"></i> นำเข้า</button>
            </template>
            <template #cell()="data">
              <i>{{ data.value }}</i>
            </template>
          </b-table>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
          </b-col>
        </b-card>
      </div>
    </b-modal>

    <b-modal id="modal-prevent-closing" ref="modal" title="กรุณาระบุ HN เพื่อนำเข้าข้อมูลจากการ Refer" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <validation-observer tag="form" ref="form">
        <form @submit.stop.prevent="handleSubmit">
          <b-container fluid>
            <b-row class="mt-2">
              <b-col sm="4" md="4" lg="4" xl="4" class="mt-2 topiclabel">
                <label class="fs-5">ชื่อ-สกุล ผู้ป่วย :</label>
              </b-col>
              <b-col sm="8" md="8" lg="8" xl="8" class="pb-1">
                <b-form-input autocomplete="off" type="text" v-model="patient_name" disabled></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="4" md="4" lg="4" xl="4" class="mt-2 topiclabel">
                <label class="fs-5">HN No. :</label>
              </b-col>
              <b-col sm="8" md="8" lg="8" xl="8" class="pb-1">
                <validation-provider rules="required" name="hn_no">
                  <b-form-group slot-scope="{ valid, errors }">
                    <b-form-input autocomplete="off" type="text" v-model="hn_no" :state="errors[0] ? false : valid ? true : null"></b-form-input>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
          </b-container>
        </form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'PatientImportRefer',
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      curr_refers: [],
      fields: [
        { key: 'created_at', label: 'วัน/เวลาที่ส่ง Refer' },
        { key: 'from_hospital_name', label: 'Refer จาก' },
        { key: 'name', label: 'ชื่อ-สกุล' },
        { key: 'birth_date', label: 'ว/ด/ป เกิด' },
        { key: 'cid', label: 'เลขบัตรประชาชน' },
        { key: 'telephone_1', label: 'โทรศัพท์' },
        { key: 'actions', label: 'นำเข้า' },
      ],
      patient_id: null,
      hn_no: '',
      patient_name: '',
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
      this.curr_refers = []
      this.axios.get(`tcb/refers?t=get-refer-import`).then((res) => {
        this.curr_refers = res.data
        this.totalRows = res.data.length
        this.$nextTick(() => {
          this.$refs['modalPatientImportRefer'].show()
          loader.hide()
        })
      })
    },
    importItem(id, patient_id, patient_name) {
      this.patient_name = patient_name
      this.patient_id = patient_id,
      this.$refs['modal'].show()
    },
    resetModal() {
      this.hn_no = ''
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

      let loader = this.$loading.show()
        this.axios
          .get(`tcb/patients?t=get-patient-import-other-hospital&id=${this.patient_id}&hn_no=${this.hn_no}`)
          .then((response) => {
            if (response.data.status) {
              this.$nextTick(() => {
                this.$parent.loadItems()
                this.$bvModal.hide('modal-prevent-closing')
                this.$bvModal.hide('modal-patient-import-refer')
                loader.hide()
              })
            } else {
              loader.hide()
              this.$toast.error(response.data.message)
            }
          })
          .catch((error) => {
            loader.hide()
            console.log(error.response.data.message)
          })
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
