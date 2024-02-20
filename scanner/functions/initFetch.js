function initFetch(vm) {
  const {loadSidebar} = vm.config

  // Server-Side Rendering
  if (vm.rendered) {
    const activeEl = getAndActive(vm.router, '.sidebar-nav', true, true)
    if (loadSidebar && activeEl) {
      activeEl.parentNode.innerHTML += window.__SUB_SIDEBAR__
    }
    vm._bindEventOnRendered(activeEl)
    vm.$resetEvents()
    callHook(vm, 'doneEach')
    callHook(vm, 'ready')
  } else {
    vm.$fetch(_ => callHook(vm, 'ready'))
  }
}