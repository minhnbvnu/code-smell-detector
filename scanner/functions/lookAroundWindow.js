function* lookAroundWindow(gen) {
  let prev = undefined;
  let cur = undefined;
  let next = undefined;
  for (const x of gen) {
    if (typeof cur !== 'undefined') {
      next = x;
      yield [prev, cur, next];
    }
    prev = cur;
    cur = x;
    next = undefined;
  }

  if (typeof cur !== 'undefined') {
    yield [prev, cur, next];
  }
}