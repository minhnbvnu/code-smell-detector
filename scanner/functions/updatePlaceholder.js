function updatePlaceholder(text, path) {
  const $input = Docsify.dom.getNode('.search input[type="search"]')

  if (!$input) {
    return
  }
  if (typeof text === 'string') {
    $input.placeholder = text
  } else {
    const match = Object.keys(text).filter(key => path.indexOf(key) > -1)[0]
    $input.placeholder = text[match]
  }
}