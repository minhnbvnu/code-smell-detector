function RegExpMatcher(regexp) {
  return message =>
    regexp.test(message.text);
}