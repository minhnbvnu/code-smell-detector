function createTokenStream(source) {
  var stream = [], string, pos = 0;

  do {
    var character = source.charAt(pos);
    if (character && /\w/.test(character)) {
      string = string ? string + character : character;
    } else {
      if (string) {
        stream.push({ type: TOKENS.STRING, value: string });
        string = null;
      }

      if (character) {
        if (character in TOKENMAP) {
          stream.push({ type: character });
        } else {
          throwError('Invalid character: ' + character + ' at pos: ' + pos);
        }
      } else {
        stream.push({ type: TOKENS.EOL });
        break;
      }
    }
  } while (++pos);

  return stream;
}