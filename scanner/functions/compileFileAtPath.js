function compileFileAtPath(compiler, filePath, extension) {
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  if (compiler.shouldCompile(sourceCode, filePath)) {
    const cachePath = compiler.getCachePath(sourceCode, filePath);
    let compiledCode = readCachedJavaScript(cachePath);
    if (compiledCode != null) {
      cacheStats[extension].hits++;
    } else {
      cacheStats[extension].misses++;
      compiledCode = compiler.compile(sourceCode, filePath);
      writeCachedJavaScript(cachePath, compiledCode);
    }
    return compiledCode;
  }
  return sourceCode;
}