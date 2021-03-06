class LocalStore {
  constructor() {
    this.user = this.initUser()
    this.authStatus = this.initAuthStatus()
  }

  initAuthStatus() {
    if (this.getAuthStatus())
      return this.getAuthStatus()
      
    localStorage.setItem('authStatus', 'false')
  }  

  setAuthStatus(status) {
    localStorage.setItem('authStatus', status)
  }

  resetAuthStatus() {
    localStorage.setItem('authStatus', 'false')
  }

  getAuthStatus() {
    return JSON.parse(localStorage.getItem('authStatus'))
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  initUser() {
    if (this.getUser())
      return this.getUser()
      
    localStorage.setItem('user', JSON.stringify({}))
  }

  resetUser() {
    this.setUser({})
    return {}
  }
}

export default new LocalStore()