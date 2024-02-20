function parseJavaScript(code, options = {}) {
  const comments = [];
  const tokens = [];
  const parser = new Parser(
    {
      ...options,
      // Collect comments
      onComment(block, text, start, end, startLoc, endLoc) {
        comments.push(
          convertAcornCommentToEsprimaComment(
            block,
            text,
            start,
            end,
            startLoc,
            endLoc
          )
        );
      },
      onToken(token) {
        tokens.push(token);
      },
    },
    code
  );

  const ast = parser.parse();
  ast.comments = comments;
  ast.tokens = tokens;
  const lastToken = tokens.pop();
  // Adjustments from espree:
  if (ast.range) {
    ast.range[0] = ast.body.length ? ast.body[0].range[0] : ast.range[0];
    ast.range[1] = lastToken ? lastToken.range[1] : ast.range[1];
  }
  if (ast.loc) {
    ast.loc.start = ast.body.length ? ast.body[0].loc.start : ast.loc.start;
    ast.loc.end = lastToken ? lastToken.loc.end : ast.loc.end;
  }

  if (options.locations && options.ranges) {
    estraverse.attachComments(ast, ast.comments, ast.tokens);
  }
  return ast;
}