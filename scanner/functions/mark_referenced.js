function mark_referenced(node2, scope, component) {
    walk(node2, {
      enter(node3, parent) {
        if (is_reference(node3, parent)) {
          const { name: name2 } = flatten_reference(node3);
          if (!scope.is_let(name2) && !scope.names.has(name2)) {
            component.add_reference(node3, name2);
          }
        }
      }
    });
  }