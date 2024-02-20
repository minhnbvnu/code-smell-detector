function is_contextual(component, scope, name2) {
    if (is_reserved_keyword(name2))
      return true;
    if (!scope.is_top_level(name2))
      return true;
    const variable = component.var_lookup.get(name2);
    if (!variable || variable.hoistable)
      return false;
    return true;
  }