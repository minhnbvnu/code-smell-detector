function parsePrefixExpression() {
    var base, name, marker
      , isLocal;

    if (trackLocations) marker = createLocationMarker();
    if (Identifier === token.type) {
      name = token.value;
      base = parseIdentifier();
      if (options.scope) attachScope(base, isLocal = scopeHasName(name));
    } else if (consume('(')) {
      base = parseExpectedExpression();
      expect(')');
      if (options.scope) isLocal = base.isLocal;
    } else {
      return null;
    }
    var expression, identifier;
    while (true) {
      if (Punctuator === token.type) {
        switch (token.value) {
          case '[':
            pushLocation(marker);
            next();
            expression = parseExpectedExpression();
            base = finishNode(ast.indexExpression(base, expression));
            expect(']');
            break;
          case '.':
            pushLocation(marker);
            next();
            identifier = parseIdentifier();
            if (options.scope) attachScope(identifier, isLocal);
            base = finishNode(ast.memberExpression(base, '.', identifier));
            break;
          case ':':
            pushLocation(marker);
            next();
            identifier = parseIdentifier();
            if (options.scope) attachScope(identifier, isLocal);
            base = finishNode(ast.memberExpression(base, ':', identifier));
            pushLocation(marker);
            base = parseCallExpression(base);
            break;
          case '(': case '{': // args
            pushLocation(marker);
            base = parseCallExpression(base);
            break;
          default:
            return base;
        }
      } else if (StringLiteral === token.type) {
        pushLocation(marker);
        base = parseCallExpression(base);
      } else {
        break;
      }
    }

    return base;
  }