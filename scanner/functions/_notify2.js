function _notify2(type, args) {
  if (isString(args)) {
    _notify({
      content: args,
      type,
    });
  } else {
    _notify({ ...args, type });
  }
}