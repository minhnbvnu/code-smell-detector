function readFileAfterRead(err, bytesRead) {
    const context = this.context;

    if (err) {
      return context.close(err);
    }
    context.pos += bytesRead;

    if (context.pos === context.size || bytesRead === 0) {
      context.close();
    } else {
      if (context.size === 0) {
        // Unknown size, just read until we don't get bytes.
        const buffer =
          bytesRead === kReadFileUnknownBufferLength
            ? context.buffer
            : context.buffer.slice(0, bytesRead);
        context.buffers.push(buffer);
      }
      context.read();
    }
  }