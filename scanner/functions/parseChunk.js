function parseChunk() {
    next();
    markLocation();
    var body = parseBlock();
    if (EOF !== token.type) unexpected(token);
    if (trackLocations && !body.length) previousToken = token;
    return finishNode(ast.chunk(body));
  }