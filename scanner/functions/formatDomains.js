function formatDomains(conditional, options) {
  if (_.isBoolean(conditional)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}