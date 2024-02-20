function serverPersist() {
  const thunk = (dispatch, getState, { db }) => {
    dispatch({ type: SERVER_PERSIST });

    const document = getState().documents.current;
    const secret = getState().documents.secret;

    const id = document.get('uuid');
    const content = document.get('content');

    return request
      .put(`/documents/${id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        content: encrypt(content, secret),
        template: document.get('template'),
      })
      .then((res) => {
        dispatch(isOnline());

        const current = new Document({
          uuid: id,
          content,
          last_modified: res.body.last_modified,
          last_modified_locally: null,
          template: res.body.template || '',
          readonly: res.body.readonly || false,
        });

        return Promise.resolve(current);
      })
      .then((current) => {
        dispatch(updateCurrentDocument(current));

        const encrypted = current.set(
          'content', encrypt(current.get('content'), secret),
        );

        return db.setItem(encrypted.get('uuid'), encrypted.toJS());
      })
      .then(() => {
        dispatch({ type: SERVER_PERSIST_SUCCESS });

        return Promise.resolve();
      })
      .catch((error) => {
        if (!error.response) {
          dispatch(isOffline());
        }

        if (403 === error.status) {
          const res = error.response;
          const current = new Document({
            uuid: id,
            content: decrypt(res.body.content, secret),
            last_modified: res.body.last_modified,
            last_modified_locally: null,
            template: res.body.template || '',
            readonly: res.body.readonly || false,
          });

          dispatch(warning(config.READONLY_MESSAGE));
          dispatch(forceUpdateCurrentDocument(current));

          const encrypted = current.set('content', res.body.content);

          return db.setItem(encrypted.get('uuid'), encrypted.toJS());
        }

        // TODO: maybe handle this case
        dispatch({ type: SERVER_PERSIST_ERROR, error });

        return Promise.reject(Errors.SERVER_UNREACHABLE);
      });
  };

  return thunk;
}