function rewindStack(
  stack,
  newLength,
  childrenEndPosition,
  endPosition,
) {
  stack[newLength].position.end = endPosition
  for (let i = newLength + 1, len = stack.length; i < len; i++) {
    stack[i].position.end = childrenEndPosition
  }
  stack.splice(newLength)
}