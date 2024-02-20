function fetchCachedRate() {
    return new Promise((resolve, reject) => {
      context.storage.get((error, rate) => {
        if (error) return reject(error);
        if (rate === undefined) return reject();

        resolve(rate);
      });
    });
  }