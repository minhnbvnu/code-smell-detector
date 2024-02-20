function babel7CompatTokens(tokens) {
  {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type === types$1.privateName) {
        const {
          loc,
          start,
          value,
          end
        } = token;
        const hashEndPos = start + 1;
        const hashEndLoc = new Position(loc.start.line, loc.start.column + 1);
        tokens.splice(i, 1, new Token({
          type: types$1.hash,
          value: "#",
          start: start,
          end: hashEndPos,
          startLoc: loc.start,
          endLoc: hashEndLoc
        }), new Token({
          type: types$1.name,
          value: value,
          start: hashEndPos,
          end: end,
          startLoc: hashEndLoc,
          endLoc: loc.end
        }));
      }
    }
  }
  return tokens;
}