function onPendingReady(res, query) {
    if (res.length >= 2) {
      loadSiblings(query, res[1]);
    } else {
      console.error(res);
      throw new Error('Unexpected response');
    }
  }