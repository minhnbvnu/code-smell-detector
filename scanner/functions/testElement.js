function testElement(options, node) {
  var test = compileTest(options);
  return test ? test(node) : true;
}