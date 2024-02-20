function updateContent(content) {
  const thunk = (dispatch, getState) => {
    const current = getState().documents.current;
    const secret = getState().documents.secret;

    // prevent unwanted content update (e.g., after a // `UPDATE_CURRENT_DOCUMENT` action)
    if (content === current.get('content')) {
      return Promise.resolve();
    }

    if (null === secret) { // looks like it is the very first edit
      const document = current.set('content', content);

      dispatch(loadSuccess(document, newSecret()));

      return Promise.resolve();
    }

    dispatch({ type: UPDATE_CONTENT, content });

    return dispatch(localPersist());
  };

  thunk.meta = {
    debounce: {
      time: config.UPDATE_CONTENT_DEBOUNCE_TIME,
      key: UPDATE_CONTENT,
    },
  };

  return thunk;
}