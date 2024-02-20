function parent_is_head(stack) {
    let i = stack.length;
    while (i--) {
      const { type } = stack[i];
      if (type === "Head")
        return true;
      if (type === "Element" || type === "InlineComponent")
        return false;
    }
    return false;
  }