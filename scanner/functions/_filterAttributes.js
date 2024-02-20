function _filterAttributes(attributes, name) {
  const filteredAttributes = Object.create(null)
  Object.keys(attributes).forEach((attributeKey) => {
    if (!isValidType(attributes[attributeKey])) {
      logger.info(
        `Omitting attribute ${attributeKey} from ${name} call, type must ` +
          'be boolean, number, or string'
      )
      return
    }
    filteredAttributes[attributeKey] = attributes[attributeKey]
  })
  return filteredAttributes
}