function onError(event) {
      reject(new ClientError(event.target));
    }