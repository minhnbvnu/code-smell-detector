function* tokenise(input) {
  let lastNewline = false;
  let line = 1;
  let col = 0;

  function buildToken(type, value) {
    return { line, col, type, value };
  }

  while (input.length) {
    let chop = 0;

    if (input[0] === '\n' || input[0] === '\r') {
      chop++;
      // If this is a \r\n line, ignore both chars but only add one new line
      if (input[1] === '\n') {
        chop++;
      }
      line++;
      col = 0;
      yield buildToken(TOKEN_TYPES.newline);
    } else if (input[0] === '#') {
      chop++;

      let nextNewline = input.indexOf('\n', chop);
      if (nextNewline === -1) {
        nextNewline = input.length;
      }
      const val = input.substring(chop, nextNewline);
      chop = nextNewline;
      yield buildToken(TOKEN_TYPES.comment, val);
    } else if (input[0] === ' ') {
      if (lastNewline) {
        let indentSize = 1;
        for (let i = 1; input[i] === ' '; i++) {
          indentSize++;
        }

        if (indentSize % 2) {
          throw new TypeError('Invalid number of spaces');
        } else {
          chop = indentSize;
          yield buildToken(TOKEN_TYPES.indent, indentSize / 2);
        }
      } else {
        chop++;
      }
    } else if (input[0] === '"') {
      let i = 1;
      for (; i < input.length; i++) {
        if (input[i] === '"') {
          const isEscaped = input[i - 1] === '\\' && input[i - 2] !== '\\';
          if (!isEscaped) {
            i++;
            break;
          }
        }
      }
      const val = input.substring(0, i);

      chop = i;

      try {
        yield buildToken(TOKEN_TYPES.string, JSON.parse(val));
      } catch (err) {
        if (err instanceof SyntaxError) {
          yield buildToken(TOKEN_TYPES.invalid);
        } else {
          throw err;
        }
      }
    } else if (/^[0-9]/.test(input)) {
      const val = /^[0-9]+/.exec(input)[0];
      chop = val.length;

      yield buildToken(TOKEN_TYPES.number, +val);
    } else if (/^true/.test(input)) {
      yield buildToken(TOKEN_TYPES.boolean, true);
      chop = 4;
    } else if (/^false/.test(input)) {
      yield buildToken(TOKEN_TYPES.boolean, false);
      chop = 5;
    } else if (input[0] === ':') {
      yield buildToken(TOKEN_TYPES.colon);
      chop++;
    } else if (input[0] === ',') {
      yield buildToken(TOKEN_TYPES.comma);
      chop++;
    } else if (/^[a-zA-Z\/.-]/g.test(input)) {
      let i = 0;
      for (; i < input.length; i++) {
        const char = input[i];
        if (char === ':' || char === ' ' || char === '\n' || char === '\r' || char === ',') {
          break;
        }
      }
      const name = input.substring(0, i);
      chop = i;

      yield buildToken(TOKEN_TYPES.string, name);
    } else {
      yield buildToken(TOKEN_TYPES.invalid);
    }

    if (!chop) {
      // will trigger infinite recursion
      yield buildToken(TOKEN_TYPES.invalid);
    }

    col += chop;
    lastNewline = input[0] === '\n' || input[0] === '\r' && input[1] === '\n';
    input = input.slice(chop);
  }

  yield buildToken(TOKEN_TYPES.eof);
}