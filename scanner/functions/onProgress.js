function onProgress(response) {
        status = status && response;
        if (++count === runners.length) {
          callback(status);
        }
      }