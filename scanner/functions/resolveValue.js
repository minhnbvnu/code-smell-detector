function resolveValue(value, def) {
  if (value !== undefined) return value;
  return def || 0;
}