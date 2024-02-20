function _type(id) {
  if (id.tag === Tag.TYPE) {
    return _basic(id.lexeme);
  }

  if (id.tag === Tag.ID) {
    return _model(id.lexeme);
  }

  console.log(id);
  throw new Error(`unsupported`);
}