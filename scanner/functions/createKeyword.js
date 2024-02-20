function createKeyword(name, options = {}) {
  options.keyword = name;
  const token = new TokenType(name, options);
  keywords$1.set(name, token);
  return token;
}