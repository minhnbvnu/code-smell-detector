function formSaved (result) {
  return {
    type: SAVE_FORM_SUCCESS,
    payload: {
      result
    }
  }
}