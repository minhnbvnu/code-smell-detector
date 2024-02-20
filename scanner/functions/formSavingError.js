function formSavingError (error) {
  return {
    type: SAVE_FORM_ERROR,
    payload: {
      error
    }
  }
}