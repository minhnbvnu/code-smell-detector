function isStringComponentStack(text) {
  return PREFIX_REGEX.test(text) || ROW_COLUMN_NUMBER_REGEX.test(text);
}