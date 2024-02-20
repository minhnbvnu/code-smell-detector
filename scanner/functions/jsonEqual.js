function jsonEqual(t, a, b, message) {
  t.equal(
      stringify(a, {space: 0}),
      stringify(b, {space: 0}),
      message);
}