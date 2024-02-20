function serverUnreachable() {
  return (dispatch) => {
    dispatch(error(config.SERVER_UNREACHABLE_MESSAGE));

    dispatch(loadDefault());
  };
}