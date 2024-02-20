function valueFromBundle(bundle, errors, message, args) {
  if (message.value) {
    return bundle.formatPattern(message.value, args, errors);
  }

  return null;
}