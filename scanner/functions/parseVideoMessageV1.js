function parseVideoMessageV1(message, onResult, onError) {
  if (message instanceof Blob) {
    blobToArrayBuffer(message)
      .then(arrayBuffer => {
        parseVideoMessageV1(arrayBuffer, onResult, onError);
      })
      .catch(onError);
    return;
  }

  try {
    let data = message;
    if (typeof message === 'string') {
      data = JSON.parse(message);
    }
    const result = parseStreamVideoData(data);
    onResult(result);
  } catch (error) {
    onError(error);
  }
}