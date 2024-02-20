function endWithTypePostfix(value) {
  return (
    value.length > DEFAULT_TYPE_POSTFIX.length &&
    value.lastIndexOf(DEFAULT_TYPE_POSTFIX) ===
      value.length - DEFAULT_TYPE_POSTFIX.length
  );
}