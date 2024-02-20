function parseAndBuildMetadata(formatter, code, opts) {
  const {
    placeholderWhitelist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders
  } = opts;
  const ast = parseWithCodeFrame(code, opts.parser, syntacticPlaceholders);
  t.removePropertiesDeep(ast, {
    preserveComments
  });
  formatter.validate(ast);
  const syntactic = {
    placeholders: [],
    placeholderNames: new Set()
  };
  const legacy = {
    placeholders: [],
    placeholderNames: new Set()
  };
  const isLegacyRef = {
    value: undefined
  };
  t.traverse(ast, placeholderVisitorHandler, {
    syntactic,
    legacy,
    isLegacyRef,
    placeholderWhitelist,
    placeholderPattern,
    syntacticPlaceholders
  });
  return Object.assign({
    ast
  }, isLegacyRef.value ? legacy : syntactic);
}