function parseExpression(expr, dotDotAllowed) {
  let match = expr.match(namePattern);

  if (!match) {
    return null;
  }

  let [name] = match;
  const parsed = [{
    name,
    cacheName: "." + name,
    index: 0,
    js: null,
    formCalc: null,
    operator: operators.dot
  }];
  let pos = name.length;

  while (pos < expr.length) {
    const spos = pos;
    const char = expr.charAt(pos++);

    if (char === "[") {
      match = expr.slice(pos).match(indexPattern);

      if (!match) {
        (0, _util.warn)("XFA - Invalid index in SOM expression");
        return null;
      }

      parsed[parsed.length - 1].index = parseIndex(match[0]);
      pos += match[0].length + 1;
      continue;
    }

    let operator;

    switch (expr.charAt(pos)) {
      case ".":
        if (!dotDotAllowed) {
          return null;
        }

        pos++;
        operator = operators.dotDot;
        break;

      case "#":
        pos++;
        operator = operators.dotHash;
        break;

      case "[":
        operator = operators.dotBracket;
        break;

      case "(":
        operator = operators.dotParen;
        break;

      default:
        operator = operators.dot;
        break;
    }

    match = expr.slice(pos).match(namePattern);

    if (!match) {
      break;
    }

    [name] = match;
    pos += name.length;
    parsed.push({
      name,
      cacheName: expr.slice(spos, pos),
      operator,
      index: 0,
      js: null,
      formCalc: null
    });
  }

  return parsed;
}