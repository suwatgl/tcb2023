<template>
  <div>
    <panel title="ค้นหาผู้ป่วย" bodyClass="p-0" class="">
      <vue-good-table
        ref="patient_table"
        mode="remote"
        :columns="[
          { field: 'hn_no', label: 'HN' },
          { field: 'full_name', label: 'ชื่อ-สกุล' },
          { field: 'birth_date', label: 'ว/ด/ป เกิด' },
          { field: 'cid', label: 'เลขบัตรประชาชน' },
          { field: 'updated_at', label: 'Last Update' },
          { field: 'btn', width: '45px', thClass: 'text-center', tdClass: 'text-center p-4px', label: 'Ac', html: true },
        ]"
        :rows="rows"
        :lineNumbers="true"
        :select-options="{ enabled: false }"
        :search-options="{ enabled: true, skipDiacritics: true, placeholder: 'ค้นหาข้อมูล' }"
        :pagination-options="{ enabled: true }"
        :sort-options="{ enabled: false }"
        :totalRows="totalRecords"
        :isLoading.sync="isLoading"
        @on-search="onSearch"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        styleClass="vgt-table striped"
      >
        <div slot="emptystate">
          <b-container fluid>
            <b-row>
              <b-col class="text-center"><span class="fs-3 text-red-600">ไม่มีรายการข้อมูล</span></b-col>
            </b-row>
          </b-container>
        </div>
        <div slot="table-actions">
          <button type="button" class="btn btn-success ms-5px" @click="loadItems()"><i class="fas fa-rotate"></i></button>
          <button type="button" class="btn btn-success ms-5px" @click="showPatientForm()"><i class="fas fa-plus"></i> เพิ่มข้อมูลใหม่</button>
          <button type="button" class="btn btn-warning ms-5px" @click="showPatientSearch()"><i class="fas fa-plus"></i> ค้นหาผู้ป่วยต่าง รพ.</button>
          <button type="button" class="btn btn-danger ms-5px" @click="showPatientSearch()"><i class="fas fa-plus"></i> นำเข้าจาก Refer</button>
        </div>
        <div slot="selected-row-actions">
          <button class="btn btn-xs btn-primary me-2">Action 1</button>
          <button class="btn btn-xs btn-white">Action 2</button>
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'full_name'">
            <router-link :to="{ name: 'patient_detail', params: { id: props.row.id } }">{{ props.row.full_name }}</router-link>
          </span>
          <span v-else-if="props.column.field == 'birth_date'">
            {{ props.row.birth_date | moment('add', '543 years', 'DD/MM/YYYY') }}
          </span>
          <span v-else-if="props.column.field == 'updated_at'">
            {{ props.row.updated_at | moment('add', '543 years', 'DD/MM/YYYY HH:mm') }}
          </span>
          <span v-else-if="props.column.field == 'btn'">
            <b-dropdown size="xs" class="m-2px" variant="primary" right>
              <template v-slot:button-content>
                <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
              </template>
              <b-dropdown-item @click="showRefer(props.row.id, props.row.full_name)" :disabled="props.row.refer_id ? true : false"> <b-icon icon="truck" aria-hidden="true"></b-icon>&nbsp; ส่ง Refer </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="showEdit(props.row.id)"> <b-icon icon="pencil" aria-hidden="true"></b-icon>&nbsp; แก้ไข </b-dropdown-item>
              <b-dropdown-item @click="showDelete(props.row.id)"> <b-icon icon="trash" aria-hidden="true"></b-icon>&nbsp; ลบ </b-dropdown-item>
            </b-dropdown>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </panel>

    <patient-form ref="patient_form"></patient-form>
    <patient-refer ref="patient_refer"></patient-refer>
    <patient-search ref="patient_search"></patient-search>
  </div>
</template>

<script>
import _ from 'lodash'
// import moment from 'moment'
import PatientForm from './PatientForm.vue'
import PatientRefer from './PatientRefer.vue'
import PatientSearch from './PatientSearch.vue'

export default {
  name: 'PatientTable',
  components: {
    PatientForm,
    PatientRefer,
    PatientSearch,
  },
  data() {
    return {
      isLoading: false,
      totalRecords: 0,
      pagination: {
        current_page: 1,
        from: 0,
        last_page: 1,
        per_page: 10,
        searchTerm: '',
        to: 10,
        total: 0,
        path: '',
        first_page_url: '',
        prev_page_url: '',
        next_page_url: '',
        last_page_url: '',
      },
      serverParams: {
        t: 'get-patient-table',
        searchTerm: '',
        page: 1,
        per_page: 10,
      },
      rows: [],
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
    this.loadItems()
  },
  methods: {
    showEdit(id) {
      this.$refs.patient_form.showForm(id)
    },
    showRefer(id, full_name) {
      this.$refs.patient_refer.showForm(id, full_name)
    },
    showPatientSearch() {
      this.$refs.patient_search.showForm()
    },
    showDelete(id) {
      const h = this.$createElement
      const titleModal = h('div', { domProps: { innerHTML: '<i class="fa fa-trash"></i> ยืนยันการลบข้อมูล' } })
      this.$bvModal.msgBoxConfirm('ท่านต้องการลบข้อมูลที่เลือกนี้ ใช่หรือไม่.', { title: [titleModal], size: 'sm', okVariant: 'danger', okTitle: 'ใช่', cancelTitle: 'ยกเลิก' }).then((value) => {
        if (value) {
          this.axios.delete(`tcb/patients/${id}`).then(() => {
            this.$toast.success('ลบข้อมูลเรียบร้อย.')
            this.loadItems()
          })
        }
      })
    },
    loadItems() {
      this.isLoading = true
      this.axios.get('tcb/patients', { params: this.serverParams }).then((response) => {
        this.totalRecords = response.data.total
        this.rows = response.data.data
        this.updatePagination(response.data)
        localStorage.setItem('patient_server_params', JSON.stringify(this.serverParams))
        this.$nextTick(() => {
          this.isLoading = false
        })
      })
    },
    updatePagination(pageData) {
      this.$refs.patient_table.currentPage = pageData.current_page
      this.$refs.patient_table.currentPerPage = pageData.per_page
      this.pagination = Object.assign({}, this.pagination, {
        current_page: pageData.current_page,
        from: pageData.from,
        last_page: pageData.last_page,
        per_page: pageData.per_page,
        searchTerm: pageData.searchTerm,
        to: pageData.to,
        total: pageData.total,
        path: pageData.path,
        first_page_url: pageData.first_page_url,
        prev_page_url: pageData.prev_page_url,
        next_page_url: pageData.next_page_url,
        last_page_url: pageData.last_page_url,
      })
    },
    showPatientForm() {
      this.$refs.patient_form.showForm(null)
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },
    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },
    onPerPageChange(params) {
      this.updateParams({ page: 1, per_page: params.currentPerPage })
      this.loadItems()
    },
    onSearch: _.debounce(function (params) {
      params.page = 1
      this.updateParams(params)
      this.loadItems()
      return false
    }, 250),
  },
}
</script>

<style></style>
