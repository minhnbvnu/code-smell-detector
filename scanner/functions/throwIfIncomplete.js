function throwIfIncomplete(type, stack) {
  const lastIndex = stack.length - 1;

  if (lastIndex >= 0) {
    const last = stack[lastIndex];

    if (last.stopTime === undefined && last.type === type) {
      throw new InvalidProfileError(`Unexpected type "${type}" started before "${last.type}" completed.`);
    }
  }
}