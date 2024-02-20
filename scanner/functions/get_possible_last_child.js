function get_possible_last_child(block, adjacent_only) {
    const result = /* @__PURE__ */ new Map();
    if (block.type === "EachBlock") {
      const each_result = loop_child(block.children, adjacent_only);
      const else_result = block.else ? loop_child(block.else.children, adjacent_only) : /* @__PURE__ */ new Map();
      const not_exhaustive = !has_definite_elements(else_result);
      if (not_exhaustive) {
        mark_as_probably(each_result);
        mark_as_probably(else_result);
      }
      add_to_map(each_result, result);
      add_to_map(else_result, result);
    } else if (block.type === "IfBlock") {
      const if_result = loop_child(block.children, adjacent_only);
      const else_result = block.else ? loop_child(block.else.children, adjacent_only) : /* @__PURE__ */ new Map();
      const not_exhaustive = !has_definite_elements(if_result) || !has_definite_elements(else_result);
      if (not_exhaustive) {
        mark_as_probably(if_result);
        mark_as_probably(else_result);
      }
      add_to_map(if_result, result);
      add_to_map(else_result, result);
    } else if (block.type === "AwaitBlock") {
      const pending_result = block.pending ? loop_child(block.pending.children, adjacent_only) : /* @__PURE__ */ new Map();
      const then_result = block.then ? loop_child(block.then.children, adjacent_only) : /* @__PURE__ */ new Map();
      const catch_result = block.catch ? loop_child(block.catch.children, adjacent_only) : /* @__PURE__ */ new Map();
      const not_exhaustive = !has_definite_elements(pending_result) || !has_definite_elements(then_result) || !has_definite_elements(catch_result);
      if (not_exhaustive) {
        mark_as_probably(pending_result);
        mark_as_probably(then_result);
        mark_as_probably(catch_result);
      }
      add_to_map(pending_result, result);
      add_to_map(then_result, result);
      add_to_map(catch_result, result);
    }
    return result;
  }