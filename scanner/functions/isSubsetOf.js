function isSubsetOf(subset, superset, cmp, contains, ordered) {
      if (!contains) {
        if (subset.length !== superset.length) return false;
        superset = superset.slice();
      }

      return subset.every(function(elem, idx) {
        if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

        if (!cmp) {
          var matchIdx = superset.indexOf(elem);
          if (matchIdx === -1) return false;

          // Remove match from superset so not counted twice if duplicate in subset.
          if (!contains) superset.splice(matchIdx, 1);
          return true;
        }

        return superset.some(function(elem2, matchIdx) {
          if (!cmp(elem, elem2)) return false;

          // Remove match from superset so not counted twice if duplicate in subset.
          if (!contains) superset.splice(matchIdx, 1);
          return true;
        });
      });
    }