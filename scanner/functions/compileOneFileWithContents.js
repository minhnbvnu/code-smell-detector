function compileOneFileWithContents (inputFile, contents, parts, babelOptions) {
  try {
    const cache = Cache.getCache(inputFile)
    const compiler = loadPackage(inputFile, 'vue-template-compiler', loadDefaultTemplateCompiler)
    const sfcDescriptor = compiler.parseComponent(contents)

    return compileTags(inputFile, sfcDescriptor, parts, babelOptions, cache.dependencyManager)
  } catch (e) {
    if (e.message && e.line) {
      inputFile.error({
        message: e.message,
        line: e.line,
      })
      return null
    } else {
      throw e
    }
  }
}