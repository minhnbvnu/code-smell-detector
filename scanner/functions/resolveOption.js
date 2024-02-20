function resolveOption(option, context, definition) {
  if (typeof option === "function") {
    return option(context, definition);
  }

  return option;
}