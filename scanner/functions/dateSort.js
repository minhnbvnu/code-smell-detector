function dateSort(sortOrder) {
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

      var aDate = new Date(a[1]);
      var bDate = new Date(b[1]);

      if (aDate < bDate) return sortOrder ? -1 : 1;
      if (aDate > bDate) return sortOrder ? 1 : -1;

      return 0;
    }
  }