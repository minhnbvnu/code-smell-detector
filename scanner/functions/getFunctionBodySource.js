function getFunctionBodySource(fn) {
  return escodegen.generate(
    parseJavaScript(fn.toString().replace(/^function\s*\(\) \{\n|\}$/g, ''))
  );
}