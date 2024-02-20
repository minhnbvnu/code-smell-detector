function formCheckOuted (result) {
  return {
    type: CHECKOUT_FORM_SUCCESS,
    payload: {
      result
    }
  }
}