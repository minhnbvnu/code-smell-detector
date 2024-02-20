function is_dynamic(variable) {
    if (variable) {
      if (variable.mutated || variable.reassigned)
        return true;
      if (!variable.module && variable.writable && variable.export_name)
        return true;
      if (is_reserved_keyword(variable.name))
        return true;
    }
    return false;
  }