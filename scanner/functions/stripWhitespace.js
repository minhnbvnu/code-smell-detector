function stripWhitespace(str) {
  return isString(str) ? str.replace(START_SPACE, '').replace(END_SPACE, '') : str;
}