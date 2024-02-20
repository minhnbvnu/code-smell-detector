function testErrorStack() {
  // If source maps are applied, this Error will have a stack frame with line 12.
  throw Error('Test Error stack');
}