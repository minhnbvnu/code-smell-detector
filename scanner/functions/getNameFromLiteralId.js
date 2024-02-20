function getNameFromLiteralId(id) {
  if (t.isNullLiteral(id)) {
    return "null";
  }

  if (t.isRegExpLiteral(id)) {
    return `_${id.pattern}_${id.flags}`;
  }

  if (t.isTemplateLiteral(id)) {
    return id.quasis.map(quasi => quasi.value.raw).join("");
  }

  if (id.value !== undefined) {
    return id.value + "";
  }

  return "";
}