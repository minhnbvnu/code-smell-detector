function ParserStream() {
  Transform.call(this, { readableObjectMode: true });
}