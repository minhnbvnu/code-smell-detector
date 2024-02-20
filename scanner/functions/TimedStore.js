function TimedStore () {
  var store = {}
  this.set = function (key, val, seconds) {
    var unsetTimer = setTimeout(this.remove.bind(this, key), seconds * 1000)
    store[key] = { value: val, timer: unsetTimer }
  }
  this.get = function (key) {
    return store[key] && store[key].value
  }
  this.remove = function (key) {
    if (store[key] && store[key].timer) clearTimeout(store[key].timer)
    store[key] = undefined
  }
}