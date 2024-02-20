function markAndClear(markName) {
    // This method won't be called unless these functions are defined, so we can skip the extra typeof check.
    performanceTarget.mark(markName);
    performanceTarget.clearMarks(markName);
  }