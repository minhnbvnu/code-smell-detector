function parseMessage(message) {
  let result;

  const onError = error => {
    throw error;
  };

  parseXVIZMessage({
    message,
    onResult: msg => {
      result = msg;
    },
    onError
  });

  return result;
}