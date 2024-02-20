function mergeAsArray(existing, incoming) {
    if (existing.value.type === 17) {
      existing.value.elements.push(incoming.value);
    } else {
      existing.value = createArrayExpression(
        [existing.value, incoming.value],
        existing.loc
      );
    }
  }