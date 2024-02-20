function _createMultipleTextElements ($$, text, tagName, attrs) {
  if (text) {
    const textItems = text.split(';')
    return textItems.map(ti => {
      return $$(tagName).append(ti.trim()).attr(attrs)
    })
  }
}