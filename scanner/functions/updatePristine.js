function updatePristine(name, value) {
    let comparator = comparators.get(name);
    // If comparator isn't available for an input, that means the input wasn't
    // mounted, or manually added via setField.
    comparator = isFunction(comparator) ? comparator : isEqual;
    setPristine({ [name]: !!comparator(getInitialValue(name), value) });
  }