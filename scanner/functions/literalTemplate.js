function literalTemplate(formatter, tpl, opts) {
  const {
    metadata,
    names
  } = buildLiteralData(formatter, tpl, opts);
  return arg => {
    const defaultReplacements = {};
    arg.forEach((replacement, i) => {
      defaultReplacements[names[i]] = replacement;
    });
    return arg => {
      const replacements = (0, _options.normalizeReplacements)(arg);

      if (replacements) {
        Object.keys(replacements).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) {
            throw new Error("Unexpected replacement overlap.");
          }
        });
      }

      return formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
    };
  };
}