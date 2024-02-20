function trimmable_at$1(child, next_sibling) {
    return next_sibling.find_nearest(/EachBlock/) === child.find_nearest(/EachBlock/) || next_sibling.prev.type === "EachBlock";
  }