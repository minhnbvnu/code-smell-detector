function readFileAfterClose(err) {
    const context = this.context;
    const callback = context.callback;
    let buffer = null;

    if (context.err || err) {
      // This is a simplification from Node.js, where we don't bother merging the errors
      return callback(context.err || err);
    }

    try {
      if (context.size === 0) {
        buffer = Buffer.concat(context.buffers, context.pos);
      } else if (context.pos < context.size) {
        buffer = context.buffer.slice(0, context.pos);
      } else {
        buffer = context.buffer;
      }

      if (context.encoding) {
        buffer = buffer.toString(context.encoding);
      }
    } catch (err) {
      return callback(err);
    }

    callback(null, buffer);
  }