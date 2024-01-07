function stringDistance(strA, strB, memo) {
    if (!memo) {
      // `memo` is a two-dimensional array containing a cache of distances
      // memo[i][j] is the distance between strA.slice(0, i) and
      // strB.slice(0, j).
      memo = [];
      for (var i = 0; i <= strA.length; i++) {
        memo[i] = [];
      }
    }

    if (!memo[strA.length] || !memo[strA.length][strB.length]) {
      if (strA.length === 0 || strB.length === 0) {
        memo[strA.length][strB.length] = Math.max(strA.length, strB.length);
      } else {
        memo[strA.length][strB.length] = Math.min(
          stringDistance(strA.slice(0, -1), strB, memo) + 1,
          stringDistance(strA, strB.slice(0, -1), memo) + 1,
          stringDistance(strA.slice(0, -1), strB.slice(0, -1), memo) +
            (strA.slice(-1) === strB.slice(-1) ? 0 : 1)
        );
      }
    }

    return memo[strA.length][strB.length];
  }