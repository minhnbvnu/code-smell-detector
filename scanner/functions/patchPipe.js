function patchPipe(stream) {
    if (stream.pipe2) {
      wrapPanicOnErrorHandler(stream);
      stream._pipe = stream._pipe || stream.pipe;
      stream.pipe = stream.pipe2;
      stream.once('readable', patchPipe.bind(null, stream));
      stream._plumbed = true;
    }
  }