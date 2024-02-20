function batchAddAttributes(attributes, attributeCount, priority) {
  for (let i = 0; i < attributeCount; i++) {
    const name = `attr: ${i}`
    attributes.addAttribute(DESTINATIONS.SPAN_EVENT, name, i, false, priority)
  }
}