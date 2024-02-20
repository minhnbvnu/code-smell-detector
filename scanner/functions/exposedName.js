function exposedName(prefix, prop) {
    return !prefix || /^fail/.test(prop) ? prop :
      prefix + prop.slice(0, 1).toUpperCase() + prop.slice(1);
  }