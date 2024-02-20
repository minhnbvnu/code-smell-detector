function returnData(validations, returned) {
  if (Object.keys(validations).length) {
    returned.validations = validations
  }
  return returned
}