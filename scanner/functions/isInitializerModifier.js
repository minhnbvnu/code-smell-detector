function isInitializerModifier(modifiers, targetName, targetArguments) {
  // search the modifiers array with the name === 'initializer'
  return modifiers.some(
    (modifier) => modifier.name === targetName && modifier.arguments === targetArguments
  )
}