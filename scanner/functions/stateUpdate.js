function stateUpdate(S) {
    if (!lastState) { // the first state
      clearTimeout(timeout)
      timeout = setTimeout(_ => done(), ROUTE_TIMEOUT)
    }

    lastState = S

    if (S.loading || !S.isReady) {
      if (!seenLoading) {
        seenLoading = true
        clearTimeout(timeout)
        timeout = setTimeout(_ => done({ errorCode: 504 }), LOAD_TIMEOUT)
      }
    }
    else if (seenLoading) done()
  }