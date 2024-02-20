function _createTextElement ($$, text, tagName, attrs) {
  if (text) {
    let el = $$(tagName).append(text)
    forEach(attrs, (value, key) => {
      el.attr(key, value)
    })
    return el
  }
}