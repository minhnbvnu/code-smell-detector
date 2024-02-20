function sendReject() {
    popRequest();
    postMessage({
      error: 'Transaction cancelled',
      id: request.id,
    });
  }