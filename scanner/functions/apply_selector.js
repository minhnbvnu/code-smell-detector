function apply_selector(blocks, node2, to_encapsulate) {
    const block = blocks.pop();
    if (!block)
      return false;
    if (!node2) {
      return block.global && blocks.every((block2) => block2.global) || block.host && blocks.length === 0;
    }
    switch (block_might_apply_to_node(block, node2)) {
      case BlockAppliesToNode.NotPossible:
        return false;
      case BlockAppliesToNode.UnknownSelectorType:
        to_encapsulate.push({ node: node2, block });
        return true;
    }
    if (block.combinator) {
      if (block.combinator.type === "Combinator" && block.combinator.name === " ") {
        for (const ancestor_block of blocks) {
          if (ancestor_block.global) {
            continue;
          }
          if (ancestor_block.host) {
            to_encapsulate.push({ node: node2, block });
            return true;
          }
          let parent = node2;
          while (parent = get_element_parent(parent)) {
            if (block_might_apply_to_node(ancestor_block, parent) !== BlockAppliesToNode.NotPossible) {
              to_encapsulate.push({ node: parent, block: ancestor_block });
            }
          }
          if (to_encapsulate.length) {
            to_encapsulate.push({ node: node2, block });
            return true;
          }
        }
        if (blocks.every((block2) => block2.global)) {
          to_encapsulate.push({ node: node2, block });
          return true;
        }
        return false;
      } else if (block.combinator.name === ">") {
        const has_global_parent = blocks.every((block2) => block2.global);
        if (has_global_parent || apply_selector(blocks, get_element_parent(node2), to_encapsulate)) {
          to_encapsulate.push({ node: node2, block });
          return true;
        }
        return false;
      } else if (block.combinator.name === "+" || block.combinator.name === "~") {
        const siblings = get_possible_element_siblings(node2, block.combinator.name === "+");
        let has_match = false;
        const has_global = blocks.some((block2) => block2.global);
        if (has_global) {
          if (siblings.size === 0 && get_element_parent(node2) !== null) {
            return false;
          }
          to_encapsulate.push({ node: node2, block });
          return true;
        }
        for (const possible_sibling of siblings.keys()) {
          if (apply_selector(blocks.slice(), possible_sibling, to_encapsulate)) {
            to_encapsulate.push({ node: node2, block });
            has_match = true;
          }
        }
        return has_match;
      }
      to_encapsulate.push({ node: node2, block });
      return true;
    }
    to_encapsulate.push({ node: node2, block });
    return true;
  }