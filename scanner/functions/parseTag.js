function parseTag (_tagName, props) {
  let tagName = _tagName

  if (!TAG_IS_ONLY_LETTERS.test(tagName)) {
    tagName = parseTag_(_tagName, props).toLowerCase()
  }

  return tagName
}