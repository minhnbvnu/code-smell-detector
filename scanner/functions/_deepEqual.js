function _deepEqual(actual, expected, memos) {

      // 7.1. All identical values are equivalent, as determined by ===.
      if (actual === expected) {
        return true;

      } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
        if (actual.length != expected.length) return false;

        for (var i = 0; i < actual.length; i++) {
          if (actual[i] !== expected[i]) return false;
        }

        return true;

      // 7.2. If the expected value is a Date object, the actual value is
      // equivalent if it is also a Date object that refers to the same time.
      } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();

      // 7.3. Other pairs that do not both pass typeof value == 'object',
      // equivalence is determined by ==.
      } else if (typeof actual != 'object' && typeof expected != 'object') {
        return actual === expected;

      // 7.4. For all other Object pairs, including Array objects, equivalence is
      // determined by having the same number of owned properties (as verified
      // with Object.prototype.hasOwnProperty.call), the same set of keys
      // (although not necessarily the same order), equivalent values for every
      // corresponding key, and an identical 'prototype' property. Note: this
      // accounts for both named and indexed properties on Arrays.
      } else {
        return objEquiv(actual, expected, memos);
      }
    }