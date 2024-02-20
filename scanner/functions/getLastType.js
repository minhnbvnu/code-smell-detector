function getLastType(stack) {
  if (stack.length > 0) {
    const {
      type
    } = stack[stack.length - 1];
    return type;
  }

  return null;
}