function transpiler_require_hook(_module, filename) {
  let moduleExports;
  if (pathRules.isIncluded(filename)) {
    // Keep src as a buffer so calculating its digest with crypto is fast.
    const src = fs.readFileSync(filename);
    let output;
    if (NodeTranspiler.shouldCompile(src)) {
      if (transpiling != null) {
        // This means that the transpiler tried to transpile itself.
        throw new Error(
          `Circular transpile from "${transpiling}" to "${filename}"`,
        );
      }
      try {
        transpiling = filename;
        output = nodeTranspiler.transformWithCache(src, filename);
      } catch (err) {
        throw err;
      } finally {
        transpiling = null;
      }
    } else {
      output = src.toString();
    }
    moduleExports = _module._compile(output, filename);
  } else {
    moduleExports = builtinJsExt(_module, filename);
  }
  return moduleExports;
}