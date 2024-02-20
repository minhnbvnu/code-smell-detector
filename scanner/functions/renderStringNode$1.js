function renderStringNode$1 (
  open,
  close,
  children,
  normalizationType
) {
  return new StringNode(open, close, children, normalizationType)
}