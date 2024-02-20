function runTypescript() {
  var compiler = createCompiler();
  compiler.addUnit(compiler_input, "compiler_input.ts");
  parseErrors = [];
  compiler.reTypeCheck();
  compiler.emit({
           createFile: function (fileName) { return outfile; },
           fileExists: function (path) { return false; },
           directoryExists: function (path) { return false; },
           resolvePath: function (path) { return path; }
  });
  
  if (parseErrors.length != 192 && parseErrors.length != 193) {
    throw new Error("Parse errors.");
  }
  compiler = null;
}