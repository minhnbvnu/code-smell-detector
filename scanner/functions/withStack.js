function withStack(value, fn) {
    stack.push(value);
    fn();
    stack.pop();
  }