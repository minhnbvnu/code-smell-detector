function receiveValidationList(json) {
  return {
    type: types.LOAD_USERVALIDATION_SUCCESS,
    json
  }
}