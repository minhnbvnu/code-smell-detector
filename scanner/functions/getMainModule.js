function getMainModule({dependencies, numPrependedDependencies = 0}) {
  return dependencies[numPrependedDependencies];
}