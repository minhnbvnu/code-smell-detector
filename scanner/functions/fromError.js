function fromError(error) {
    return new stream.Readable({
      read: function (cb) {
        if (typeof cb === 'function') {
          cb(error);
        } else {
          this.destroy(error);
        }
      },
    });
  }