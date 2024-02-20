function localPersist() {
  const thunk = (dispatch, getState, { db }) => {
    dispatch({ type: LOCAL_PERSIST });

    const document = getState().documents.current;
    const secret = getState().documents.secret;

    const encrypted = document.set(
      'content', encrypt(document.get('content'), secret),
    );

    return db
      .setItem(encrypted.get('uuid'), encrypted.toJS())
      .then(() => {
        dispatch({ type: LOCAL_PERSIST_SUCCESS });

        return Promise.resolve();
      });
  };

  thunk.meta = {
    debounce: {
      time: config.LOCAL_PERSIST_DEBOUNCE_TIME,
      key: LOCAL_PERSIST,
    },
  };

  return thunk;
}