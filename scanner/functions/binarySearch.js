function binarySearch(haystack, needle, comparator) {
    let low = 0;
    let high = haystack.length - 1;
    while (low <= high) {
      const mid = low + (high - low >> 1);
      const cmp = comparator(haystack[mid], needle);
      if (cmp === 0) {
        return mid;
      }
      if (cmp < 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return ~low;
  }