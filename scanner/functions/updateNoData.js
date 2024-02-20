function updateNoData(text, path) {
  if (typeof text === 'string') {
    NO_DATA_TEXT = text
  } else {
    const match = Object.keys(text).filter(key => path.indexOf(key) > -1)[0]
    NO_DATA_TEXT = text[match]
  }
}