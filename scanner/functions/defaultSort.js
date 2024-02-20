function defaultSort(sortOrder) {
    return function (a, b) {
      if (a[1] === b[1]) {
        return 0;
      }
      if (a[1] === null) {
        return 1;
      }
      if (b[1] === null) {
        return -1;
      }
      if (a[1] < b[1]) return sortOrder ? -1 : 1;
      if (a[1] > b[1]) return sortOrder ? 1 : -1;
      return 0;
    }
  }