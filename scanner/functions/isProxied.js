function isProxied(target) {
  return SYMBOL_PROXY in target;
}