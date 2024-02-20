function fieldName(self, dataObject, defaultValue) {
  dataObject.props.value = defaultValue

  dataObject.on.input = val => {
    self.$emit('input', val)
  }
}