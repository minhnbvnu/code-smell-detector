function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }