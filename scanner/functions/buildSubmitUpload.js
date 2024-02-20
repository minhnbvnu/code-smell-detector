function buildSubmitUpload(conf) {
  const str = `submitUpload() {
    this.$refs['${conf.fieldName}'].submit()
  },`
  return str
}