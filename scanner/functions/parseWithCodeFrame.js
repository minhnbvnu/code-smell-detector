function parseWithCodeFrame(code, parserOpts, syntacticPlaceholders) {
  const plugins = (parserOpts.plugins || []).slice();

  if (syntacticPlaceholders !== false) {
    plugins.push("placeholders");
  }

  parserOpts = Object.assign({
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "module"
  }, parserOpts, {
    plugins
  });

  try {
    return (0, _parser.parse)(code, parserOpts);
  } catch (err) {
    const loc = err.loc;

    if (loc) {
      err.message += "\n" + (0, _codeFrame.codeFrameColumns)(code, {
        start: loc
      });
      err.code = "BABEL_TEMPLATE_PARSE_ERROR";
    }

    throw err;
  }
}