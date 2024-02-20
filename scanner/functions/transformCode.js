function transformCode(transform, filename, sourceCode, options, callback) {
  const params = makeTransformParams(filename, sourceCode, options.transform);
  const isJson = filename.endsWith('.json');

  transform(params, (error, transformed) => {
    if (error) {
      callback(error);
      return;
    }

    var code, map;
    if (options.minify) {
      const optimized =
        constantFolding(filename, inline(filename, transformed, options));
      code = optimized.code;
      map = optimized.map;
    } else {
      code = transformed.code;
      map = transformed.map;
    }

    if (isJson) {
      code = code.replace(/^\w+\.exports=/, '');
    } else {
      // Remove shebang
      code = code.replace(/^#!.*/, '');
    }

    const result = isJson || options.extern
      ? {dependencies: [], dependencyOffsets: []}
      : extractDependencies(code);

    result.code = code;
    result.map = map;

    callback(null, result);
  });
}