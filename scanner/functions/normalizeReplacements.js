function normalizeReplacements(replacements) {
  if (Array.isArray(replacements)) {
    return replacements.reduce((acc, replacement, i) => {
      acc["$" + i] = replacement;
      return acc;
    }, {});
  } else if (typeof replacements === "object" || replacements == null) {
    return replacements || undefined;
  }

  throw new Error("Template replacements must be an array, object, null, or undefined");
}