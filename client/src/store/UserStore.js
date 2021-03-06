import { observable, action, computed } from 'mobx'
import axios from 'axios'

import LocalStore from './LocalStore'

class UserStore {
  @observable data
  @observable authStatus
  @observable mySchedule

  constructor() {
    this.data = LocalStore.getUser()
    this.authStatus = LocalStore.getAuthStatus()
    this.mySchedule = []
  }

  @action changeUserData(user, authStatus) {
    this.data = Object.assign({}, this.data, user)
  }

  @action changeAuthStatus(status) {
    this.authStatus = status
  }

  @action loginUser(url, body) {
    return axios.post(url, body)
      .then(x => {
        if (x.data.email) {
          this.changeUserData(x.data)
          this.changeAuthStatus(true)
          LocalStore.setUser(x.data)
          LocalStore.setAuthStatus(true)

          return true
        }
        
        return false
      })
      .catch(err => console.log(err))
  }

  @action registrateUser(url, body) {
    return axios.post(url, body)
      .then(x => x.status === 201)
      .catch(err => console.log(err))
  }

  @action resetUser() {
    this.data = LocalStore.resetUser()
    LocalStore.resetAuthStatus()
  }

  @computed get getFullName() {
    return `${this.data.name} ${this.data.surname}`
  }

  getSchedule(url) {
    axios
      .get(url)
      .then(x => this.setSchedule(x.data))
  }

  @action setSchedule(schedule) {
    this.mySchedule = schedule
  }
}

export default new UserStore()
