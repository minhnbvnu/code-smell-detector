function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}