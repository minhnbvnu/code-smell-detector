function isArrowTable(value) {
  return (
    value &&
    typeof value.getChild === "function" &&
    typeof value.toArray === "function" &&
    value.schema &&
    Array.isArray(value.schema.fields)
  );
}