function loop_child(children, adjacent_only) {
    const result = /* @__PURE__ */ new Map();
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      if (child.type === "Element") {
        result.set(child, NodeExist.Definitely);
        if (adjacent_only) {
          break;
        }
      } else if (child.type === "EachBlock" || child.type === "IfBlock" || child.type === "AwaitBlock") {
        const child_result = get_possible_last_child(child, adjacent_only);
        add_to_map(child_result, result);
        if (adjacent_only && has_definite_elements(child_result)) {
          break;
        }
      }
    }
    return result;
  }