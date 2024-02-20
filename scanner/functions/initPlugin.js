function initPlugin(vm) {
  [].concat(vm.config.plugins).forEach(fn => isFn(fn) && fn(vm._lifecycle, vm))
}