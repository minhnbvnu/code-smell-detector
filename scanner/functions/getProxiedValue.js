function getProxiedValue(target) {
  return target && getProxy(target) || target;
}