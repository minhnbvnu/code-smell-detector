function batchAddCustomSpanAttributes(api, attributeCount) {
  for (let i = 0; i < attributeCount; i++) {
    api.addCustomSpanAttribute(`custom-span-${i}`, i)
  }
}