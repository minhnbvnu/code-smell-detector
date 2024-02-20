function isTypoTypeof(left, right, state) {
    var values;

    if (state.option.notypeof)
      return false;

    if (!left || !right)
      return false;

    values = state.inES6() ? typeofValues.es6 : typeofValues.es3;

    if (right.type === "(identifier)" && right.value === "typeof" && left.type === "(string)")
      return !_.contains(values, left.value);

    return false;
  }