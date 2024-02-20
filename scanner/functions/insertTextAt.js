function insertTextAt(index, text) {
  return {
    range: [index, index],
    text,
  }
}