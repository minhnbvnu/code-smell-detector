function getValueForKey(key) {
      if (next.hasOwnProperty(key)) {
        return next[key];
      } else {
        return prev[key];
      }
    }