function directiveComparator(a, b) {
    a = a.descriptor.def.priority || DEFAULT_PRIORITY;
    b = b.descriptor.def.priority || DEFAULT_PRIORITY;
    return a > b ? -1 : a === b ? 0 : 1;
  }