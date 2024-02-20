function writeCachedRate(rate) {
    return new Promise((resolve, reject) => {
      context.storage.set(rate, { force: 1 }, error =>
        error ? reject(error) : resolve()
      );
    });
  }