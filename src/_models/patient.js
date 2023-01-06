export default class Patient {
  constructor(id, patient) {
    this.id = id
    this.hospital_code = patient ? patient.hospital_code : null
    this.hn_no = patient ? patient.hn_no : null
    this.title_code = patient ? patient.title_code : null
    this.name = patient ? patient.name : null
    this.last_name = patient ? patient.last_name : null
    this.cid = patient ? patient.cid : null
    this.birth_date = patient ? patient.birth_date : null
    this.sex_code = patient ? patient.sex_code : null
    this.nationality_code = patient ? patient.nationality_code : null
    this.death_date = patient ? patient.death_date : null
    this.deathcause_code = patient ? patient.deathcause_code : null
    this.address_no = patient ? patient.address_no : null
    this.address_moo = patient ? patient.address_moo : null
    this.address_zipcode = patient ? patient.address_zipcode : null
    this.address_province_id = patient ? patient.address_province_id : null
    this.address_district_id = patient ? patient.address_district_id : null
    this.address_sub_district_id = patient ? patient.address_sub_district_id : null
    this.permanent_address_no = patient ? patient.permanent_address_no : null
    this.permanent_address_moo = patient ? patient.permanent_address_moo : null
    this.permanent_address_zipcode = patient ? patient.permanent_address_zipcode : null
    this.permanent_address_province_id = patient ? patient.permanent_address_province_id : null
    this.permanent_address_district_id = patient ? patient.permanent_address_district_id : null
    this.permanent_address_sub_district_id = patient ? patient.permanent_address_sub_district_id : null
    this.email = patient ? patient.email : null
    this.telephone_1 = patient ? patient.telephone_1 : null
    this.telephone_2 = patient ? patient.telephone_2 : null

    // this.address_province_name = ''
    // this.address_district_name = ''
    // this.address_sub_district_name = ''
    // this.title_name = ''
    // this.sex_name = ''
    // this.nationality_name = ''
    // this.permanent_address_province_name = ''
    // this.permanent_address_district_name = ''
    // this.permanent_address_sub_district_name = ''
  }
}
