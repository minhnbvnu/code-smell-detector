function parseFunctionName() {
    var base, name, marker;

    if (trackLocations) marker = createLocationMarker();
    base = parseIdentifier();

    if (options.scope) attachScope(base, false);

    while (consume('.')) {
      pushLocation(marker);
      name = parseIdentifier();
      if (options.scope) attachScope(name, false);
      base = finishNode(ast.memberExpression(base, '.', name));
    }

    if (consume(':')) {
      pushLocation(marker);
      name = parseIdentifier();
      if (options.scope) attachScope(name, false);
      base = finishNode(ast.memberExpression(base, ':', name));
    }

    return base;
  }