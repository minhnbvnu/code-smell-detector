function diffDeepEquals(t, a, b, msg) {
  if (deepEqualsTolerance(a, b, msg)) {
    t.pass(msg);
  } else {
    const diff = diffString(a, b);
    t.fail(`Objects not equal: ${msg}: ${diff}`);
  }
}