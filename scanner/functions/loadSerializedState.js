function loadSerializedState( // In the future this type should be the union of all versioned types.
serializedState) {
  return dispatch => {
    dispatch({
      type: LOAD_SERIALIZED_STATE,
      serializedState
    });
    dispatch(ensureWindowsAreOnScreen());
  };
}