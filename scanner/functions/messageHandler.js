function messageHandler(e) {
      if (e.origin === origin && e.source === window.opener) {
        if (!AUTHORIZED_METHODS.includes(e.data.method)) {
          postMessage({ error: 'Unsupported method', id: e.data.id });
        }

        setRequests((requests) => [...requests, e.data]);
      }
    }