function processLine(cm, text, state, startAt) {
  var mode = cm.doc.mode;
  var stream = new StringStream(text, cm.options.tabSize);
  stream.start = stream.pos = startAt || 0;
  if (text == "") { callBlankLine(mode, state); }
  while (!stream.eol()) {
    readToken(mode, stream, state);
    stream.start = stream.pos;
  }
}