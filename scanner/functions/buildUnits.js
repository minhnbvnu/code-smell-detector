function buildUnits (source, target) {
  return Object.keys(source).map(key => {
    const sourceMessage = source[key]
    const targetMessage = target[key]

    return buildXliffUnit(key,
      sourceMessage.description, sourceMessage.defaultMessage,
      targetMessage, targetMessage ? 'translated' : undefined)
  })
}