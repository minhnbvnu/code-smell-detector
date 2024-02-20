function __combineErrorCode(module, code) {
  if (code <= 1000) return code;
  return module ? `${module}:${code}` : code;
}