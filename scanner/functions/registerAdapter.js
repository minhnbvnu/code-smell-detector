function registerAdapter (adapter) {
  let Adapter

  try {
    Adapter = require(adapter.project)
  } catch (e) {}

  if (!Adapter) {
    Adapter = window[adapter.class]
  }

  if (Adapter) {
    adapter.loaded = true
    angular.module('js-data').provider(adapter.class, function () {
      let _this = this
      _this.defaults = {}
      _this.$get = [() => new Adapter(_this.defaults)]
    })
  }
}