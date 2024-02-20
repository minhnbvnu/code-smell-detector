function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}