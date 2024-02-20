function replaceWithSourceString(replacement) {
  this.resync();

  try {
    replacement = `(${replacement})`;
    replacement = (0, _parser.parse)(replacement);
  } catch (err) {
    const loc = err.loc;

    if (loc) {
      err.message += " - make sure this is an expression.\n" + (0, _codeFrame.codeFrameColumns)(replacement, {
        start: {
          line: loc.line,
          column: loc.column + 1
        }
      });
      err.code = "BABEL_REPLACE_SOURCE_ERROR";
    }

    throw err;
  }

  replacement = replacement.program.body[0].expression;

  _index.default.removeProperties(replacement);

  return this.replaceWith(replacement);
}