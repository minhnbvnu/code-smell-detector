function customClusterExists() {
  return !!localStorage.getItem(customClusterConfigKey)
}