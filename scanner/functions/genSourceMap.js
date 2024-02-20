function genSourceMap(modules) {
  var sourceMapGen = new SourceMapGenerator({file: 'test_url', version: 3});
  var bundleLineNo = 0;
  for (var i = 0; i < modules.length; i++) {
    var module = modules[i];
    var transformedCode = module.code;
    var sourcePath = module.sourcePath;
    var sourceCode = module.sourceCode;
    var transformedLineCount = 0;
    var lastCharNewLine = false;
    for (var t = 0; t < transformedCode.length; t++) {
      if (t === 0 || lastCharNewLine) {
        sourceMapGen.addMapping({
          generated: {line: bundleLineNo + 1, column: 0},
          original: {line: transformedLineCount + 1, column: 0},
          source: sourcePath
        });
      }
      lastCharNewLine = transformedCode[t] === '\n';
      if (lastCharNewLine) {
        transformedLineCount++;
        bundleLineNo++;
      }
    }
    bundleLineNo++;
    sourceMapGen.setSourceContent(
      sourcePath,
      sourceCode
    );
  }
  return sourceMapGen.toJSON();
}