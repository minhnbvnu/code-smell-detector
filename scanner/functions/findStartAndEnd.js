function findStartAndEnd(points, count, loop, spanGaps) {
  let start = 0;
  let end = count - 1;

  if (loop && !spanGaps) {
    // loop and not spanning gaps, first find a gap to start from
    while (start < count && !points[start].skip) {
      start++;
    }
  }

  // find first non skipped point (after the first gap possibly)
  while (start < count && points[start].skip) {
    start++;
  }

  // if we looped to count, start needs to be 0
  start %= count;

  if (loop) {
    // loop will go past count, if start > 0
    end += start;
  }

  while (end > start && points[end % count].skip) {
    end--;
  }

  // end could be more than count, normalize
  end %= count;

  return {start, end};
}