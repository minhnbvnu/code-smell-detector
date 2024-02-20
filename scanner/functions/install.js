function install (Vue, opts) {
  Vuep.config(opts)
  Vue.component(Vuep.name, Vuep)
}