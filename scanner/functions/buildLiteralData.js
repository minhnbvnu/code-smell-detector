function buildLiteralData(formatter, tpl, opts) {
  let names;
  let nameSet;
  let metadata;
  let prefix = "";

  do {
    prefix += "$";
    const result = buildTemplateCode(tpl, prefix);
    names = result.names;
    nameSet = new Set(names);
    metadata = (0, _parse.default)(formatter, formatter.code(result.code), {
      parser: opts.parser,
      placeholderWhitelist: new Set(result.names.concat(opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [])),
      placeholderPattern: opts.placeholderPattern,
      preserveComments: opts.preserveComments,
      syntacticPlaceholders: opts.syntacticPlaceholders
    });
  } while (metadata.placeholders.some(placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name)));

  return {
    metadata,
    names
  };
}