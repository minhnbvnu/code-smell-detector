function getValueStart(prop) {
  if (prop.key.startToken === prop.value.startToken) {
    // shorthand prop `{foo}`
    return null;
  }
  var start = prop.value.startToken;
  if (
    prop.kind === 'get' ||
    prop.kind === 'set' ||
    prop.method
  ) {
    // `get foo() {}`
    // `set foo() {}`
    // `foo() {}`
    return start;
  } else {
    // regular object property `{foo: (bar + 123)}`
    return _tk.findNext(_tk.findPrev(start, ':'), _tk.isCode);
  }
}