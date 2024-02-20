function retryRequest() {
      requestDebug('retrying request');
      client._incrementHostIndex(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }