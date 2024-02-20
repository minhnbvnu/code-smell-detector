function updateTemplate(template) {
  return (dispatch, getState) => {
    const secret = getState().documents.secret;

    dispatch({ type: UPDATE_TEMPLATE, template });

    if (null !== secret) {
      return dispatch(localPersist());
    }

    return Promise.resolve();
  };
}