function fetchNext(query) {
    pendingResponse = getResponse(fullQuery(query));
    pendingResponse
      .then(res => onPendingReady(res, query))
      .catch((msg) => {
        const err = 'Failed to download ' + query + '; Message: ' + msg;
        console.error(err);
        progress.downloadError(err)
        loadNext();
      });
  }