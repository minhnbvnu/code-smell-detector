function readLongString() {
    var level = 0
      , content = ''
      , terminator = false
      , character, stringStart;

    index++; // [
    while ('=' === input.charAt(index + level)) level++;
    if ('[' !== input.charAt(index + level)) return false;

    index += level + 1;
    if (isLineTerminator(input.charCodeAt(index))) {
      line++;
      lineStart = index++;
    }

    stringStart = index;
    while (index < length) {
      character = input.charAt(index++);
      if (isLineTerminator(character.charCodeAt(0))) {
        line++;
        lineStart = index;
      }
      if (']' === character) {
        terminator = true;
        for (var i = 0; i < level; i++) {
          if ('=' !== input.charAt(index + i)) terminator = false;
        }
        if (']' !== input.charAt(index + level)) terminator = false;
      }
      if (terminator) break;
    }
    content += input.slice(stringStart, index - 1);
    index += level + 1;

    return content;
  }