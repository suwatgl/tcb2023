// import axios from 'axios';
import axios from '../plugins/axios'

class AreaService {
  async getInitArea(area_id = '') {
    return new Promise((resolve) => {
      if (area_id) {
        axios.get(`area/areas?t=get-user-acl&area_id=${area_id}`).then((res) => {
          localStorage.setItem(
            'current_area',
            JSON.stringify({
              region_id: res.data.region_id,
              province_id: res.data.province_id,
              district_id: res.data.district_id,
              sub_district_id: res.data.sub_district_id,
              hospital_code: res.data.hospital_code,
            })
          )
          resolve(res.data)
        })
      } else {
        let current_area = JSON.parse(localStorage.getItem('current_area'))
        if (current_area) {
          area_id = current_area.region_id ? current_area.region_id : area_id
          area_id = current_area.province_id ? current_area.province_id : area_id
          area_id = current_area.district_id ? current_area.district_id : area_id
          area_id = current_area.sub_district_id ? current_area.sub_district_id : area_id
          area_id = current_area.hospital_code ? current_area.hospital_code : area_id
          axios.get(`area/areas?t=get-user-acl&area_id=${area_id}`).then((res) => {
            resolve(res.data)
          })
        } else {
          axios.get(`area/areas?t=get-user-acl`).then((res) => {
            localStorage.setItem(
              'current_area',
              JSON.stringify({
                region_id: res.data.region_id,
                province_id: res.data.province_id,
                district_id: res.data.district_id,
                sub_district_id: res.data.sub_district_id,
                hospital_code: res.data.hospital_code,
              })
            )
            resolve(res.data)
          })
        }
      }
    })
  }
  async changeRegion(region_id) {
    return new Promise((resolve) => {
      let area = {
        provinces: [],
        province_id: '',
        districts: [],
        district_id: '',
        sub_districts: [],
        sub_district_id: '',
        hospitals: [],
        hospital_code: '',
      }
      this.setAreaFilter({
        region_id: region_id,
        province_id: '',
        district_id: '',
        sub_district_id: '',
        hospital_code: '',
      })
      if (region_id) {
        axios.get(`tcb/dashboard?t=get-list&region_id=${region_id}`).then((res) => {
          area.provinces = res.data
          resolve(area)
        })
      } else {
        resolve(area)
      }
    })
  }
  async changeProvince(province_id) {
    return new Promise((resolve) => {
      let area = {
        districts: [],
        district_id: '',
        sub_districts: [],
        sub_district_id: '',
        hospitals: [],
        hospital_code: '',
      }
      this.setAreaFilter({
        province_id: province_id,
        district_id: '',
        sub_district_id: '',
        hospital_code: '',
      })
      if (province_id) {
        axios.get(`tcb/dashboard?t=get-list&province_id=${province_id}`).then((res) => {
          area.districts = res.data
          resolve(area)
        })
      } else {
        resolve(area)
      }
    })
  }
  async changeDistrict(district_id) {
    return new Promise((resolve) => {
      let area = {
        sub_districts: [],
        sub_district_id: '',
        hospitals: [],
        hospital_code: '',
      }
      this.setAreaFilter({
        district_id: district_id,
        sub_district_id: '',
        hospital_code: '',
      })
      if (district_id) {
        axios.get(`tcb/dashboard?t=get-list&district_id=${district_id}`).then((res) => {
          area.sub_districts = res.data
          resolve(area)
        })
      } else {
        resolve(area)
      }
    })
  }
  async changeSubDistrict(sub_district_id) {
    return new Promise((resolve) => {
      let area = {
        hospitals: [],
        hospital_code: '',
      }
      this.setAreaFilter({
        sub_district_id: sub_district_id,
        hospital_code: '',
      })
      if (sub_district_id) {
        axios.get(`tcb/dashboard?t=get-list&sub_district_id=${sub_district_id}`).then((res) => {
          area.hospitals = res.data
          resolve(area)
        })
      } else {
        resolve(area)
      }
    })
  }
  changeVillage(hospital_code) {
    this.setAreaFilter({
      hospital_code: hospital_code,
    })
  }
  setAreaFilter(area) {
    let current_area = JSON.parse(localStorage.getItem('current_area'))
    current_area = Object.assign({}, current_area, area)
    localStorage.setItem('current_area', JSON.stringify(current_area))
  }
}

export default new AreaService()
