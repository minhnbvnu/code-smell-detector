function findPositiveMin(ts, offset, count) {
    let result = 0;

    for (let i = 0; i < count; i++) {
      const t = ts[offset++];

      if (t > 0) {
        result = result ? Math.min(t, result) : t;
      }
    }

    return result;
  }