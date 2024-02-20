function metaHook(stream) {
  stream.eatWhile(/[\w\$_]/);
  return "meta";
}