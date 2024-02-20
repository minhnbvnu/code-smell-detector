function Parser(fileContent) {
  this._tokenizer = new Tokenizer(fileContent);
}