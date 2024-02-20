function parseXVIZMessageSync(message, onResult, onError, opts) {
  // TODO(twojtasz): better message dispatching
  // here, not all arraybuffer may be image (packed point cloud)
  // TODO(jlisee): Node.js support for blobs for better unit testing
  if (typeof Blob !== 'undefined' && message instanceof Blob) {
    parseVideoMessageV1(message, onResult, onError);
    return;
  }

  const {messageType, messageFormat} = opts;

  try {
    const xvizData = new XVIZData(message, {messageType, messageFormat});
    const xvizMsg = xvizData.message();

    // Non-xviz messages will return null
    if (xvizMsg) {
      const data = xvizMsg.data;

      const v2Type = xvizMsg.type || undefined;

      const result = parseXVIZData(data, {...opts, v2Type});

      onResult(result);
    }
  } catch (error) {
    onError(error);
  }
}