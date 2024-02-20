function RequestJar (store) {
  var self = this
  self._jar = new CookieJar(store, {looseMode: true})
}