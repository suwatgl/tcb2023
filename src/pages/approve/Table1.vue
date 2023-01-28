<template>
  <div>
    <vue-good-table
      ref="approve_table"
      mode="remote"
      :columns="[
        { field: 'created_at', label: 'วัน/เวลาคีย์ข้อมูล' },
        { field: 'hn_no', label: 'HN' },
        { field: 'full_name', label: 'ชื่อ-สกุล' },
        { field: 'birth_date', label: 'ว/ด/ป เกิด' },
        { field: 'cid', label: 'เลขบัตรประชาชน' },
        { field: 'cancer_count', label: 'จำนวน visit' },
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
    >
      <div slot="emptystate">
        <b-container fluid>
          <b-row>
            <b-col class="text-center"><span class="fs-3 text-red-600">ไม่มีรายชื่อรอ Approve ครั้งแรก</span></b-col>
          </b-row>
        </b-container>
      </div>
      <div slot="table-actions">
        <button type="button" class="btn btn-success ms-5px" @click="loadItems()"><i class="fas fa-rotate"></i></button>
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'full_name'">
          <div v-if="currentUser && currentUser.roleCancer == 'Y'">
            <a href="#" @click.stop.prevent="approveCancer(props.row.id)">{{ props.row.full_name }}</a>
          </div>
          <div v-else>
            {{ props.row.full_name }}
          </div>
        </span>
        <span v-else-if="props.column.field == 'birth_date'">
          {{ props.row.birth_date | moment('add', '543 years', 'DD/MM/YYYY') }}
        </span>
        <span v-else-if="props.column.field == 'created_at'">
          {{ props.row.created_at | moment('add', '543 years', 'DD/MM/YYYY HH:mm') }}
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <approve-detail ref="approve_detail"></approve-detail>
  </div>
</template>

<script>
import _ from 'lodash'
import ApproveDetail from './ApproveDetail.vue'

export default {
  name: 'Table1',
  components: {
    ApproveDetail,
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
        t: 'get-first-approve-table',
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
    approveCancer(id) {
      this.$refs.approve_detail.showForm(id)
    },
    loadItems() {
      this.isLoading = true
      this.axios.get('tcb/cancers', { params: this.serverParams }).then((response) => {
        this.totalRecords = response.data.total
        this.rows = response.data.data
        this.updatePagination(response.data)
        localStorage.setItem('approve_server_params', JSON.stringify(this.serverParams))
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
