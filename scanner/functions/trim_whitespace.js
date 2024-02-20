function trim_whitespace(block, trim_before, trim_after) {
    if (!block.children || block.children.length === 0)
      return;
    const first_child = block.children[0];
    const last_child = block.children[block.children.length - 1];
    if (first_child.type === "Text" && trim_before) {
      first_child.data = trim_start(first_child.data);
      if (!first_child.data)
        block.children.shift();
    }
    if (last_child.type === "Text" && trim_after) {
      last_child.data = trim_end(last_child.data);
      if (!last_child.data)
        block.children.pop();
    }
    if (block.else) {
      trim_whitespace(block.else, trim_before, trim_after);
    }
    if (first_child.elseif) {
      trim_whitespace(first_child, trim_before, trim_after);
    }
  }