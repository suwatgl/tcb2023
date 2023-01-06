export default class User {
  constructor(username, email, password, name) {
    this.displayname = name
    this.first_name = 'Guest'
    this.last_name = ''
    this.username = username
    this.email = email
    this.password = password
    this.hosCode = ''
    this.hosName = ''
    this.hospitalPosition = ''
    this.hospitalDepartment = ''
    this.phoneNumber = ''
    this.roleCancer = 'Y'
    this.roleCaw = 'N'
    this.roles = []
  }
}
