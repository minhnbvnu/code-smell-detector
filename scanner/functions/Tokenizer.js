function Tokenizer(fileContent) {
  this._lines = fileContent.split('\n');
  this._next = undefined;
}