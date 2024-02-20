function actionCreators_close() {
  return dispatch => {
    // TODO: This could probably be improved by adding a "PREVENT_CLOSE" action
    // or something, but this works okay for now.
    let defaultPrevented = false;

    const cancel = () => {
      defaultPrevented = true;
    };

    dispatch({
      type: CLOSE_REQUESTED,
      cancel
    });

    if (!defaultPrevented) {
      dispatch({
        type: STOP
      });
      dispatch({
        type: CLOSE_WINAMP
      });
    }
  };
}