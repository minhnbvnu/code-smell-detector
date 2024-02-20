function createLocalStorage() {
  return {
    async getItem(key) {
      return window.localStorage.getItem(key)
    },
    async setItem(key, value) {
      return window.localStorage.setItem(key, value)
    },
    async removeItem(key) {
      return window.localStorage.removeItem(key)
    }
  }
}