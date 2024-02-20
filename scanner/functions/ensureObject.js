function ensureObject(value) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(
      `JSONObject cannot represent non-object value: ${value}`,
    );
  }

  return value;
}