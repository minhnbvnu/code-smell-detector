function collapse_timings(timings) {
    const result = {};
    timings.forEach((timing) => {
      result[timing.label] = Object.assign({
        total: timing.end - timing.start
      }, timing.children && collapse_timings(timing.children));
    });
    return result;
  }