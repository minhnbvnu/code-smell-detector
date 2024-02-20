function get_possible_element_siblings(node2, adjacent_only) {
    const result = /* @__PURE__ */ new Map();
    let prev = node2;
    while (prev = prev.prev) {
      if (prev.type === "Element") {
        if (!prev.attributes.find((attr) => attr.type === "Attribute" && attr.name.toLowerCase() === "slot")) {
          result.set(prev, NodeExist.Definitely);
        }
        if (adjacent_only) {
          break;
        }
      } else if (prev.type === "EachBlock" || prev.type === "IfBlock" || prev.type === "AwaitBlock") {
        const possible_last_child = get_possible_last_child(prev, adjacent_only);
        add_to_map(possible_last_child, result);
        if (adjacent_only && has_definite_elements(possible_last_child)) {
          return result;
        }
      }
    }
    if (!prev || !adjacent_only) {
      let parent = node2;
      let skip_each_for_last_child = node2.type === "ElseBlock";
      while ((parent = parent.parent) && (parent.type === "EachBlock" || parent.type === "IfBlock" || parent.type === "ElseBlock" || parent.type === "AwaitBlock")) {
        const possible_siblings = get_possible_element_siblings(parent, adjacent_only);
        add_to_map(possible_siblings, result);
        if (parent.type === "EachBlock") {
          if (skip_each_for_last_child) {
            skip_each_for_last_child = false;
          } else {
            add_to_map(get_possible_last_child(parent, adjacent_only), result);
          }
        } else if (parent.type === "ElseBlock") {
          skip_each_for_last_child = true;
          parent = parent.parent;
        }
        if (adjacent_only && has_definite_elements(possible_siblings)) {
          break;
        }
      }
    }
    return result;
  }