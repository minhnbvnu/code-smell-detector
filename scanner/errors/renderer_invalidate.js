function renderer_invalidate(renderer, name2, value, main_execution_context = false) {
    const variable = renderer.component.var_lookup.get(name2);
    if (variable && (variable.subscribable && (variable.reassigned || variable.export_name))) {
      if (main_execution_context) {
        return x`${`$$subscribe_${name2}`}(${value || name2})`;
      } else {
        const member = renderer.context_lookup.get(name2);
        return x`${`$$subscribe_${name2}`}($$invalidate(${member.index}, ${value || name2}))`;
      }
    }
    if (name2[0] === "$" && name2[1] !== "$") {
      return x`${name2.slice(1)}.set(${value || name2})`;
    }
    if (variable && (variable.module || !variable.referenced && !variable.is_reactive_dependency && !variable.export_name && !name2.startsWith("$$"))) {
      return value || name2;
    }
    if (value) {
      if (main_execution_context) {
        return x`${value}`;
      } else {
        const member = renderer.context_lookup.get(name2);
        return x`$$invalidate(${member.index}, ${value})`;
      }
    }
    if (main_execution_context)
      return;
    const deps = /* @__PURE__ */ new Set([name2]);
    deps.forEach((name3) => {
      const reactive_declarations = renderer.component.reactive_declarations.filter((x2) => x2.assignees.has(name3));
      reactive_declarations.forEach((declaration) => {
        declaration.dependencies.forEach((name4) => {
          deps.add(name4);
        });
      });
    });
    const filtered = Array.from(deps).filter((n2) => renderer.context_lookup.has(n2));
    if (!filtered.length)
      return null;
    return filtered.map((n2) => x`$$invalidate(${renderer.context_lookup.get(n2).index}, ${n2})`).reduce((lhs, rhs) => x`${lhs}, ${rhs}`);
  }