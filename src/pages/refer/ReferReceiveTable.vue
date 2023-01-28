<template>
  <div>
    <!-- BEGIN breadcrumb -->
    <ol class="breadcrumb float-xl-end">
      <li class="breadcrumb-item"><router-link :to="{ name: 'home' }">หน้าหลัก</router-link></li>
      <li class="breadcrumb-item active">รับ Refer</li>
    </ol>
    <!-- END breadcrumb -->
    <!-- BEGIN page-header -->
    <h1 class="page-header mb-3">
      รับ Refer <small>{{ currentUser ? currentUser.hosName : '' }}</small>
    </h1>

    <panel title="รายชื่อผู้ป่วยรอรับ Refer จากสถานพยาบาลอื่น" bodyClass="p-0" class="">
      <b-container fluid class="p-3 pb-1">
        <b-row>
          <b-col md="3">
            <b-form-select
              class="form-select"
              plain
              v-model="serverParams.refer_status_id"
              :options="[
                { text: 'รอรับ Refer', value: 0 },
                { text: 'รอขอข้อมูลเพิ่มเติม', value: 1 },
                { text: 'รับ Refer แล้ว', value: 2 },
                { text: 'ปฏิเสธรับ Refer', value: 3 },
                { text: '<เลือกสถานะ>', value: null },
              ]"
              @change="loadItems"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-container>
      <vue-good-table
        ref="approve_table"
        mode="remote"
        :columns="[
          { field: 'created_at', label: 'วัน/เวลาคีย์ข้อมูล' },
          { field: 'hn_no', label: 'HN' },
          { field: 'full_name', label: 'ชื่อ-สกุล' },
          // { field: 'birth_date', label: 'ว/ด/ป เกิด' },
          { field: 'cid', label: 'เลขบัตรประชาชน' },
          { field: 'from_hospital_name', label: 'โรงพยาบาลส่งต่อ' },
          { field: 'from_user_name', label: 'ผู้บันทึกส่งต่อ' },
          { field: 'status', label: 'สถานะ' },
          { field: 'btn', width: '45px', thClass: 'text-center', tdClass: 'text-center p-4px', label: 'Ac', html: true },
        ]"
        :rows="rows"
        :lineNumbers="true"
        :select-options="{ enabled: false }"
        :search-options="{ enabled: true, skipDiacritics: true, placeholder: 'ค้นหาข้อมูล' }"
        :pagination-options="{ enabled: true, dropdownAllowAll: false }"
        :sort-options="{ enabled: false }"
        :totalRows="totalRecords"
        :isLoading.sync="isLoading"
        @on-search="onSearch"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        styleClass="vgt-table striped"
        :row-style-class="rowStyleClassFn"
      >
        <div slot="emptystate">
          <b-container fluid>
            <b-row>
              <b-col class="text-center"><span class="fs-3 text-red-600">ไม่มีรายชื่อผู้ป่วยรอรับ Refer จากสถานพยาบาลอื่น</span></b-col>
            </b-row>
          </b-container>
        </div>
        <div slot="table-actions">
          <button type="button" class="btn btn-success ms-5px" @click="loadItems()"><i class="fas fa-rotate"></i></button>
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'full_name'">
            <div v-if="currentUser && currentUser.roleCancer == 'Y'">
              <a href="#" @click.stop.prevent="showReferFormDetail(props.row.patient_id, props.row.id)">{{ props.row.full_name }}</a>
            </div>
            <div v-else>
              {{ props.row.full_name }}
            </div>
          </span>
          <span v-else-if="props.column.field == 'status'">
            {{ refer_status[props.row.status] }}
          </span>
          <span v-else-if="props.column.field == 'birth_date'">
            {{ props.row.birth_date | moment('add', '543 years', 'DD/MM/YYYY') }}
          </span>
          <span v-else-if="props.column.field == 'created_at'">
            {{ props.row.created_at | moment('add', '543 years', 'DD/MM/YYYY HH:mm') }}
          </span>
          <span v-else-if="props.column.field == 'btn'">
            <b-dropdown size="xs" class="m-2px" variant="primary" right>
              <template v-slot:button-content>
                <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
              </template>
              <b-dropdown-item @click="showReferFormDetail(props.row.patient_id, props.row.id)"> <b-icon icon="pencil" aria-hidden="true"></b-icon>&nbsp; แสดงประวัติโรคมะเร็ง </b-dropdown-item>
            </b-dropdown>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </panel>

    <refer-form-detail ref="refer_form_detail"></refer-form-detail>
    <refer-form-receive ref="refer_form_receive"></refer-form-receive>
    <refer-form-reject ref="refer_form_reject"></refer-form-reject>
    <refer-form-request ref="refer_form_request"></refer-form-request>
  </div>
</template>

<script>
import _ from 'lodash'
import referFormDetail from './referFormDetail.vue'
import referFormReceive from './referFormReceive.vue'
import referFormReject from './referFormReject.vue'
import referFormRequest from './referFormRequest.vue'

export default {
  name: 'ReferReceiveTable',
  components: {
    referFormDetail,
    referFormReceive,
    referFormReject,
    referFormRequest
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
        t: 'get-refer-receive-table',
        searchTerm: '',
        page: 1,
        per_page: 10,
        refer_status_id: 0,
      },
      rows: [],
      refer_status: ['รอรับ Refer', 'รอขอข้อมูลเพิ่มเติม', 'รับ Refer แล้ว', 'ปฏิเสธรับ Refer'],
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
    rowStyleClassFn(row) {
      let c_class = ''
      switch (row.status) {
        case 1:
          c_class = 'bg-orange-100'
          break

        case 2:
          c_class = 'bg-lime-100'
          break

        case 3:
          c_class = 'bg-red-100'
          break

        default:
          c_class = ''
          break
      }
      return c_class
    },
    showReferFormDetail(patient_id, refer_id) {
      this.$refs.refer_form_detail.showForm(patient_id, refer_id)
    },
    showReferFormReceive(patient_id, refer_id) {
      this.$refs.refer_form_receive.showForm(patient_id, refer_id)
    },
    showReferFormReject(patient_id, refer_id) {
      this.$refs.refer_form_reject.showForm(patient_id, refer_id)
    },
    showReferFormRequest(patient_id, refer_id) {
      this.$refs.refer_form_request.showForm(patient_id, refer_id)
    },
    loadItems() {
      this.isLoading = true
      this.axios.get('tcb/refers', { params: this.serverParams }).then((response) => {
        this.totalRecords = response.data.total
        this.rows = response.data.data
        this.updatePagination(response.data)
        localStorage.setItem('refer_receive_server_params', JSON.stringify(this.serverParams))
        this.$nextTick(() => {
          this.isLoading = false
        })
      })
    },
    updatePagination(pageData) {
      this.$refs.approve_table.currentPage = pageData.current_page
      this.$refs.approve_table.currentPerPage = pageData.per_page
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
