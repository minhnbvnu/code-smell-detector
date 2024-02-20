function validModel (model) {
  if (
    model &&
    Object.keys(model).length &&
    LEVEL_KEYS.every(val => val in model)
  ) {
    return true
  } else {
    console.error('Incorrect data format for "value/v-model" of v-region')
    return false
  }
}