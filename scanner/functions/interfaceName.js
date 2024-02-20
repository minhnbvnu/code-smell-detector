function interfaceName (component) {
  // Root doesn't have splits
  if (component.splits.length === 0) {
    return 'ApiRoot'
  }

  //
  // Replace '.'s with '_'s and CamelCase.
  //
  return component.splits
    .map(split => split.replace(/\./g, '_').replace(/./, first => first.toUpperCase()))
    .join('')
}