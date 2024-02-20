function onResult(message) {
    const transfers = new Set();

    switch (message.type) {
      case XVIZ_MESSAGE_TYPE.TIMESLICE:
        for (const streamName in message.streams) {
          const stream = message.streams[streamName];
          if (stream) {
            getTransferList(stream.pointCloud, true, transfers);
            getTransferList(stream.vertices, false, transfers);
            if (stream.images && stream.images.length) {
              stream.images.forEach(image => getTransferList(image, true, transfers));
            }
          }
        }
        break;

      case XVIZ_MESSAGE_TYPE.VIDEO_FRAME:
        // v1 video stream
        getTransferList(message.imageData, false, transfers);
        break;

      default:
    }

    message = preSerialize(message);

    /* uncomment for debug */
    // let size = 0;
    // for (const item of transfers) {
    //   size += item.byteLength;
    // }
    // message._size = {
    //   arraybuffer: size
    // };
    // message._sentAt = Date.now();

    self.postMessage(message, Array.from(transfers));
  }