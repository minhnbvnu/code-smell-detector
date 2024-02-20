function noUnsafeEval() {
    try {
      /* jshint -W031, -W054 */
      new Function('');
      /* jshint +W031, +W054 */
      return false;
    } catch (e) {
      return true;
    }
  }