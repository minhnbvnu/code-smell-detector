function addReject(prom, reject) {
    // Use this style for sake of non-Promise thenables (e.g., jQuery Deferred)
    prom.then(null, reject);
  }