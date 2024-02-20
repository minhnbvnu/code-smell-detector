function trimmable_at(child, next_sibling) {
    return next_sibling.node.find_nearest(/EachBlock/) === child.find_nearest(/EachBlock/) || next_sibling.node.prev.type === "EachBlock";
  }