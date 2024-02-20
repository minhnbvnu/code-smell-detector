function safeParseTypehint(typehint) {
  if (!typehint) {
    return null;
  }
  try {
    return JSON.stringify(parseTypehint(typehint));
  } catch (e) {
    return typehint;
  }
}