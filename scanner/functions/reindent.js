function reindent(state, text, indent, lineEnd) {
    /*
    Writes into `state` the `text` string reindented with the provided `indent`.
    */
    var trimmedText = text.trim();
    if (trimmedText === '') {
      return;
    }
    var lines = text.trim().split('\n');
    var length = lines.length;

    for (var i = 0; i < length; i++) {
      state.write(indent + lines[i].trim() + lineEnd);
    }
  }