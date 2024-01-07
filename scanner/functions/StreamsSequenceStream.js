function StreamsSequenceStream(streams) {
    this.streams = streams;
    let maybeLength = 0;

    for (let i = 0, ii = streams.length; i < ii; i++) {
      const stream = streams[i];

      if (stream instanceof DecodeStream) {
        maybeLength += stream._rawMinBufferLength;
      } else {
        maybeLength += stream.length;
      }
    }

    DecodeStream.call(this, maybeLength);
  }