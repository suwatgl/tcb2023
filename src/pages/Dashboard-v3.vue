<template>
  <div>
    <b-card>
      <b-card-text>
        <ol class="breadcrumb float-xl-end">
          <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
        <h1 class="page-header mb-3">
          Dashboard <small> {{ currentUser.hosName }}</small>
        </h1>
      </b-card-text>
      <b-container fluid class="p-0">
        <b-row class="m-0">
          <b-col cols="6" sm="3" md="4" lg="2" xl="2" class="p-2px">
            <b-form-group class="mb-2px">
              <b-form-select :select-size="1" class="form-select" plain ref="op_regions" v-model="acl.region_id" :options="acl.regions" @change="changeRegion()" :disabled="acl.level_id > 2"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6" sm="3" md="4" lg="2" xl="2" class="p-2px" v-if="acl.provinces.length > 0">
            <b-form-group class="mb-2px">
              <b-form-select :select-size="1" class="form-select" plain ref="op_provinces" v-model="acl.province_id" :options="acl.provinces" @change="changeProvince()" :disabled="acl.level_id > 3"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6" sm="3" md="4" lg="2" xl="2" class="p-2px" v-if="acl.districts.length > 0">
            <b-form-group class="mb-2px">
              <b-form-select :select-size="1" class="form-select" plain ref="op_districts" v-model="acl.district_id" :options="acl.districts" @change="changeDistrict()" :disabled="acl.level_id > 4"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6" sm="3" md="4" lg="2" xl="2" class="p-2px" v-if="acl.sub_districts.length > 0">
            <b-form-group class="mb-2px">
              <b-form-select :select-size="1" class="form-select" plain ref="op_sub_districts" v-model="acl.sub_district_id" :options="acl.sub_districts" @change="changeSubDistrict()" :disabled="acl.level_id > 5"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6" sm="3" md="4" lg="4" xl="4" class="p-2px" v-if="acl.hospitals.length > 0">
            <b-form-group class="mb-2px">
              <b-form-select :select-size="1" class="form-select" plain ref="op_hospitals" v-model="acl.hospital_code" :options="acl.hospitals" @change="changeHospital()" :disabled="acl.level_id > 6"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>

    <div class="row pt-3">
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-teal">
          <div class="stats-icon stats-icon-lg"><i class="fa fa-globe fa-fw"></i></div>
          <div class="stats-content">
            <div class="stats-title">จำนวน Patient ทั้งหมด</div>
            <div class="stats-number">{{ stat_top.patient_all.toLocaleString() }} ราย</div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-blue">
          <div class="stats-icon stats-icon-lg"><i class="fa fa-dollar-sign fa-fw"></i></div>
          <div class="stats-content">
            <div class="stats-title">จำนวน Patient รายใหม่เดือนนี้</div>
            <div class="stats-number">{{ stat_top.patient_month.toLocaleString() }} ราย</div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-indigo">
          <div class="stats-icon stats-icon-lg"><i class="fa fa-archive fa-fw"></i></div>
          <div class="stats-content">
            <div class="stats-title">จำนวน Cancer Visit เดือนนี้</div>
            <div class="stats-number">{{ stat_top.cancer_month.toLocaleString() }} visit</div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="widget widget-stats bg-dark">
          <div class="stats-icon stats-icon-lg"><i class="fa fa-comment-alt fa-fw"></i></div>
          <div class="stats-content">
            <div class="stats-title">จำนวน ส่ง/รับ Refer เดือนนี้</div>
            <div class="stats-number">{{ stat_top.refer_send.toLocaleString() }} / {{ stat_top.refer_receive.toLocaleString() }} ราย</div>
          </div>
        </div>
      </div>
    </div>

    <b-container fluid class="p-0">
      <b-row>
        <b-col md="8">
          <b-row>
            <b-col md="12">
              <panel title="สถิติ Patient, Cancer visit ในการเข้ารับบริการ 14 วันล่าสุด" bodyClass="p-0" class="">
                <b-card>
                  <apexchart ref="chart_day" height="310px" type="bar" :options="chartAge.options" :series="chartAge.series"></apexchart>
                </b-card>
              </panel>
            </b-col>
            <b-col md="12" v-show="(area_filter_name == 'region_id' && area_filter_id != '') || area_filter_name == 'province_id' ? true : false">
              <panel title="สถิติ Patient, Cancer visit ในเดือนนี้ แยกพื้นที่ให้บริการ" bodyClass="p-0" class="">
                <b-card>
                  <apexchart ref="chart_area" height="310px" type="bar" :options="chartArea.options" :series="chartArea.series"></apexchart>
                </b-card>
              </panel>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="4">
          <panel title="สถิติ 10 อันดับแรกในการให้บริการประจำเดือนนี้" bodyClass="p-0" class="">
            <b-card no-body>
              <b-tabs card>
                <b-tab title="Patients." active>
                  <b-card-text>
                    <b-table
                      :items="stat_top_10.patients"
                      :fields="[
                        { key: 'index', label: 'อันดับ' },
                        { key: 'name', label: 'สถานพยาบาล' },
                        { key: 'patients', label: 'จำนวน' },
                      ]"
                      responsive
                      outlined
                      head-variant="light"
                      class="m-0"
                    >
                      <template #cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                    </b-table>
                  </b-card-text>
                </b-tab>
                <b-tab title="Cancers.">
                  <b-card-text>
                    <b-table
                      :items="stat_top_10.cancers"
                      :fields="[
                        { key: 'index', label: 'อันดับ' },
                        { key: 'name', label: 'สถานพยาบาล' },
                        { key: 'cancers', label: 'จำนวน' },
                      ]"
                      responsive
                      outlined
                      head-variant="light"
                      class="m-0"
                    >
                      <template #cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                    </b-table>
                  </b-card-text>
                </b-tab>
                <b-tab title="ส่ง Refer.">
                  <b-card-text>
                    <b-table
                      :items="stat_top_10.refers_from"
                      :fields="[
                        { key: 'index', label: 'อันดับ' },
                        { key: 'name', label: 'สถานพยาบาล' },
                        { key: 'refers_from', label: 'จำนวน' },
                      ]"
                      responsive
                      outlined
                      head-variant="light"
                      class="m-0"
                    >
                      <template #cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                    </b-table>
                  </b-card-text>
                </b-tab>
                <b-tab title="รับ Refer.">
                  <b-card-text>
                    <b-table
                      :items="stat_top_10.refers_to"
                      :fields="[
                        { key: 'index', label: 'อันดับ' },
                        { key: 'name', label: 'สถานพยาบาล' },
                        { key: 'refers_to', label: 'จำนวน' },
                      ]"
                      responsive
                      outlined
                      head-variant="light"
                      class="m-0"
                    >
                      <template #cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                    </b-table>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </panel>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'
import AppOptions from '../config/AppOptions.vue'
import AreaService from '../_services/area.service'

export default {
  name: 'dashboard-v3',
  data() {
    return {
      stat_top_10: {
        patients: [],
        cancers: [],
        refers_from: [],
        refers_to: [],
      },
      stat_area: [],
      stat_day: [],
      stat_top: {
        patient_all: 0,
        patient_month: 0,
        cancer_month: 0,
        refer_receive: 0,
        refer_send: 0,
      },
      area_filter_id: '',
      area_filter_name: '',
      acl: {
        level_id: 9,
        area_id: '',
        region_id: '',
        regions: [],
        province_id: '',
        provinces: [],
        district_id: '',
        districts: [],
        sub_district_id: '',
        sub_districts: [],
        hospital_code: '',
        hospitals: [],
      },
      chartAge: {
        options: {
          chart: {
            id: 'vuechart-example',
            height: 310,
            type: 'bar',
          },
          stroke: {
            width: 1,
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            labels: {
              colors: AppOptions.color.componentColor,
            },
          },
          xaxis: {
            categories: [],
          },
        },
        series: [
          {
            name: 'Patients',
            data: [],
          },
          {
            name: 'Cancers',
            data: [],
          },
        ],
      },
      chartArea: {
        options: {
          chart: {
            id: 'vuechart-example',
            height: 310,
            type: 'bar',
          },
          stroke: {
            width: 1,
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            labels: {
              colors: AppOptions.color.componentColor,
            },
          },
          xaxis: {
            categories: [],
          },
        },
        series: [
          {
            name: 'Patients',
            data: [],
          },
          {
            name: 'Cancers',
            data: [],
          },
        ],
      },
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
    this.getAcl()
  },
  methods: {
    getAcl() {
      this.axios.get('tcb/dashboard?t=get-acl').then((res) => {
        this.acl = res.data
        this.area_filter_id = this.currentUser.hosCode
        this.area_filter_name = 'hospital_code'
        // this.area_filter_id = ''
        // this.area_filter_name = 'region_id'
        this.getStatTop()
      })
    },
    getStatTop() {
      let loader = this.$loading.show()
      this.axios.get(`tcb/dashboard?t=get-stat&${this.area_filter_name}=${this.area_filter_id}`).then((res) => {
        this.stat_top = res.data.stat_top
        this.stat_day = res.data.stat_day
        this.stat_area = res.data.stat_area
        this.stat_top_10 = res.data.stat_top_10

        // *********
        this.chartAge.options = {
          ...this.chartAge.options,
          ...{
            xaxis: {
              categories: this.stat_day.map((a) => moment(a.curr_date, 'YYYY-MM-DD').add(543, 'years').format('DD MMM YY')),
            },
          },
        }
        let series_patients_day = this.stat_day.map((a) => a.patients)
        let series_cancers_day = this.stat_day.map((a) => a.cancers)
        this.chartAge.series[0].data = series_patients_day
        this.chartAge.series[1].data = series_cancers_day
        this.$refs.chart_day.updateSeries([
          { name: 'Patients', data: series_patients_day },
          { name: 'Cancers', data: series_cancers_day },
        ])
        // *********
        this.chartArea.options = {
          ...this.chartArea.options,
          ...{
            xaxis: {
              categories: this.stat_area.map((a) => a.area_name),
            },
          },
        }
        let series_patients = this.stat_area.map((a) => a.patients)
        let series_cancers = this.stat_area.map((a) => a.cancers)
        this.chartArea.series[0].data = series_patients
        this.chartArea.series[1].data = series_cancers
        this.$refs.chart_area.updateSeries([
          { name: 'Patients', data: series_patients },
          { name: 'Cancers', data: series_cancers },
        ])
        // *********
        this.$nextTick(() => {
          loader.hide()
        })
      })
    },
    changeRegion() {
      AreaService.changeRegion(this.acl.region_id).then((res) => {
        this.acl = Object.assign({}, this.acl, res)
        this.area_filter_id = this.acl.region_id
        this.area_filter_name = 'region_id'
        this.getStatTop()
      })
    },
    changeProvince() {
      if (this.acl.province_id == '') {
        this.acl.hospitals = []
        this.acl.sub_districts = []
        this.acl.districts = []
        this.area_filter_id = this.acl.region_id
        this.area_filter_name = 'region_id'
        this.getStatTop()
      } else {
        AreaService.changeProvince(this.acl.province_id).then((res) => {
          this.acl = Object.assign({}, this.acl, res)
          this.area_filter_id = this.acl.province_id
          this.area_filter_name = 'province_id'
          this.getStatTop()
        })
      }
    },
    changeDistrict() {
      if (this.acl.district_id == '') {
        this.acl.hospitals = []
        this.acl.sub_districts = []
        this.area_filter_id = this.acl.province_id
        this.area_filter_name = 'province_id'
        this.getStatTop()
      } else {
        AreaService.changeDistrict(this.acl.district_id).then((res) => {
          this.acl = Object.assign({}, this.acl, res)
          this.area_filter_id = this.acl.district_id
          this.area_filter_name = 'district_id'
          this.getStatTop()
        })
      }
    },
    changeSubDistrict() {
      if (this.acl.sub_district_id == '') {
        this.acl.hospitals = []
        this.area_filter_id = this.acl.district_id
        this.area_filter_name = 'district_id'
        this.getStatTop()
      } else {
        AreaService.changeSubDistrict(this.acl.sub_district_id).then((res) => {
          this.acl = Object.assign({}, this.acl, res)
          this.area_filter_id = this.acl.sub_district_id
          this.area_filter_name = 'sub_district_id'
          this.getStatTop()
        })
      }
    },
    changeHospital() {
      if (this.acl.hospital_code == '') {
        this.area_filter_id = this.acl.sub_district_id
        this.area_filter_name = 'sub_district_id'
        this.getStatTop()
      } else {
        this.area_filter_id = this.acl.hospital_code
        this.area_filter_name = 'hospital_code'
        this.getStatTop()
      }
    },
  },
  filters: {},
}
</script>
