function normalizeURI(uri) {
      return removeDoubleSlashes(uri).split('/').reduce(function(prev, curr, idx) {
          if (prev.length === 0 || curr !== '..') {
              prev.push(curr);
          } else {
              prev.pop();
          }
          return prev;
      }, []).join('/');
  }