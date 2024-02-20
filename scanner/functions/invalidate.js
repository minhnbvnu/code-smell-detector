function invalidate(renderer, scope, node2, names, main_execution_context = false) {
    const { component } = renderer;
    const [head, ...tail] = Array.from(names).filter((name2) => {
      const owner = scope.find_owner(name2);
      return !owner || owner === component.instance_scope;
    }).map((name2) => component.var_lookup.get(name2)).filter((variable) => {
      return variable && (!variable.hoistable && !variable.global && !variable.module && (variable.referenced || variable.subscribable || variable.is_reactive_dependency || variable.export_name || variable.name[0] === "$"));
    });
    function get_invalidated(variable, node3) {
      if (main_execution_context && !variable.subscribable && variable.name[0] !== "$") {
        return node3;
      }
      return renderer_invalidate(renderer, variable.name, void 0, main_execution_context);
    }
    if (!head) {
      return node2;
    }
    component.has_reactive_assignments = true;
    if (node2.type === "AssignmentExpression" && node2.operator === "=" && nodes_match(node2.left, node2.right) && tail.length === 0) {
      return get_invalidated(head, node2);
    }
    const is_store_value = head.name[0] === "$" && head.name[1] !== "$";
    const extra_args = tail.map((variable) => get_invalidated(variable)).filter(Boolean);
    if (is_store_value) {
      return x`@set_store_value(${head.name.slice(1)}, ${node2}, ${head.name}, ${extra_args})`;
    }
    let invalidate2;
    if (!main_execution_context) {
      const pass_value = extra_args.length > 0 || node2.type === "AssignmentExpression" && node2.left.type !== "Identifier" || node2.type === "UpdateExpression" && (!node2.prefix || node2.argument.type !== "Identifier");
      if (pass_value) {
        extra_args.unshift({
          type: "Identifier",
          name: head.name
        });
      }
      invalidate2 = x`$$invalidate(${renderer.context_lookup.get(head.name).index}, ${node2}, ${extra_args})`;
    } else {
      invalidate2 = extra_args.length ? [node2, ...extra_args] : node2;
    }
    if (head.subscribable && head.reassigned) {
      const subscribe = `$$subscribe_${head.name}`;
      invalidate2 = x`${subscribe}(${invalidate2})`;
    }
    return invalidate2;
  }