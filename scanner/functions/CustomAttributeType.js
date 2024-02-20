function CustomAttributeType(base) {
  const supported = ["string", "number", "boolean", "any"];
  if (!supported.includes(base)) {
    throw new Error(
      `OpaquePrimitiveType only supports base types: ${u.commaSeparatedString(
        supported,
      )}`,
    );
  }
  return base;
}