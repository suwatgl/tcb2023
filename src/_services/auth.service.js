// import axios from 'axios';
import axios from '../plugins/axios'

class AuthService {
  login(user) {
    return axios
      .post('auth/login', {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.data.data))
        }
        return res.data.data
      })
  }
  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
