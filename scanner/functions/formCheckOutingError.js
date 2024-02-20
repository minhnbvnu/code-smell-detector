function formCheckOutingError (error) {
  return {
    type: CHECKOUT_FORM_ERROR,
    payload: {
      error
    }
  }
}