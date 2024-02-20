function updateRender(vm) {
  vm.router.normalize()
  vm.route = vm.router.parse()
  dom.body.setAttribute('data-page', vm.route.file)
}