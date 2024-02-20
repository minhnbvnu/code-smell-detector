function handleActionError (dispatch, error, source) {
  return dispatch({
    type: SHOW_ERROR,
    source,
    payload: error
  })
}