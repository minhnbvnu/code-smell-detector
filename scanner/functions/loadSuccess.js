function loadSuccess(document, secret, skipSynchronize) {
  return (dispatch) => {
    dispatch({ type: LOAD_SUCCESS, document, secret });

    window.history.pushState({}, 'Monod', `/${document.get('uuid')}#${secret}`);

    if (true !== skipSynchronize) {
      dispatch(synchronize());
    }
  };
}