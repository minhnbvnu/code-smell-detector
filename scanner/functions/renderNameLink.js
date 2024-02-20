function renderNameLink(vm) {
  const el = dom.getNode('.app-name-link')
  const nameLink = vm.config.nameLink
  const path = vm.route.path

  if (!el) {
    return
  }

  if (isPrimitive(vm.config.nameLink)) {
    el.setAttribute('href', nameLink)
  } else if (typeof nameLink === 'object') {
    const match = Object.keys(nameLink).filter(key => path.indexOf(key) > -1)[0]

    el.setAttribute('href', nameLink[match])
  }
}