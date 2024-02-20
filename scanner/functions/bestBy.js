function bestBy(arr, by, compare) {
    if (arr.length === 0) {
      return undefined;
    }

    return arr.reduce(function (best, next) {
      var pair = [by(next), next];

      if (!best) {
        return pair;
      } else if (compare(best[0], pair[0]) === best[0]) {
        return best;
      } else {
        return pair;
      }
    }, null)[1];
  }