function handleIncomingMessage(e) {
  const data = JSON.parse(e.data);
  if (Array.isArray(data)) {
    for (const message of data) {
      try {
        handleMessage(message);
      } catch (err) {
        handleError(err, message);
      }
    }
  } else {
    try {
      handleMessage(data);
    } catch (err) {
      handleError(err, data);
    }
  }
}