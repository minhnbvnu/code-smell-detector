function looksLikeModifier(obj) {
  return !!Object.keys(obj || {}).find((key) => key.substring(0, 1) === '$');
}