function simpleSelection(anchor, head) {
  return new Selection([new Range(anchor, head || anchor)], 0)
}