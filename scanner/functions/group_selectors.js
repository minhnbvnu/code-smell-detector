function group_selectors(selector) {
    let block = new Block$1(null);
    const blocks = [block];
    selector.children.forEach((child) => {
      if (child.type === "WhiteSpace" || child.type === "Combinator") {
        block = new Block$1(child);
        blocks.push(block);
      } else {
        block.add(child);
      }
    });
    return blocks;
  }