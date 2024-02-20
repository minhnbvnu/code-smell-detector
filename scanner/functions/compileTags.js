function compileTags (inputFile, sfcDescriptor, parts, babelOptions, dependencyManager) {
  var handler = new VueComponentTagHandler({
    inputFile,
    parts,
    babelOptions,
    dependencyManager,
    sfcDescriptor,
  })

  return handler.getResults()
}