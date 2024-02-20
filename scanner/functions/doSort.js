function doSort(a, b) {
      if (typeof sort === 'function') {
        return sort(a, b);
      } else if (sort) {
        return d3.ascending(a.name, b.name);
      } else {
        return 0;
      }
    }