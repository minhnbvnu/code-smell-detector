function loadDefault() {
  return (dispatch) => {
    dispatch({ type: LOAD_DEFAULT });

    window.history.pushState({}, 'Monod', '/');
  };
}