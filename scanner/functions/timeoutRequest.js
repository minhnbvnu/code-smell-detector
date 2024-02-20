function timeoutRequest() {
      jsonpDone && jsonpDone();
      xhr && xhr.abort();
    }