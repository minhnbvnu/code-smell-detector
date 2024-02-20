function block_might_apply_to_node(block, node2) {
    let i = block.selectors.length;
    while (i--) {
      const selector = block.selectors[i];
      const name2 = typeof selector.name === "string" && selector.name.replace(regex_backslash_and_following_character, "$1");
      if (selector.type === "PseudoClassSelector" && (name2 === "host" || name2 === "root")) {
        return BlockAppliesToNode.NotPossible;
      }
      if (block.selectors.length === 1 && selector.type === "PseudoClassSelector" && name2 === "global") {
        return BlockAppliesToNode.NotPossible;
      }
      if (selector.type === "PseudoClassSelector" || selector.type === "PseudoElementSelector") {
        continue;
      }
      if (selector.type === "ClassSelector") {
        if (!attribute_matches(node2, "class", name2, "~=", false) && !node2.classes.some((c2) => c2.name === name2))
          return BlockAppliesToNode.NotPossible;
      } else if (selector.type === "IdSelector") {
        if (!attribute_matches(node2, "id", name2, "=", false))
          return BlockAppliesToNode.NotPossible;
      } else if (selector.type === "AttributeSelector") {
        if (!(whitelist_attribute_selector.has(node2.name.toLowerCase()) && whitelist_attribute_selector.get(node2.name.toLowerCase()).has(selector.name.name.toLowerCase())) && !attribute_matches(node2, selector.name.name, selector.value && unquote(selector.value), selector.matcher, selector.flags)) {
          return BlockAppliesToNode.NotPossible;
        }
      } else if (selector.type === "TypeSelector") {
        if (node2.name.toLowerCase() !== name2.toLowerCase() && name2 !== "*" && !node2.is_dynamic_element)
          return BlockAppliesToNode.NotPossible;
      } else {
        return BlockAppliesToNode.UnknownSelectorType;
      }
    }
    return BlockAppliesToNode.Possible;
  }