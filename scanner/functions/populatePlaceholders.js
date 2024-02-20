function populatePlaceholders(metadata, replacements) {
  const ast = t.cloneNode(metadata.ast);

  if (replacements) {
    metadata.placeholders.forEach(placeholder => {
      if (!Object.prototype.hasOwnProperty.call(replacements, placeholder.name)) {
        const placeholderName = placeholder.name;
        throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a
            placeholder you may want to consider passing one of the following options to @babel/template:
            - { placeholderPattern: false, placeholderWhitelist: new Set(['${placeholderName}'])}
            - { placeholderPattern: /^${placeholderName}$/ }`);
      }
    });
    Object.keys(replacements).forEach(key => {
      if (!metadata.placeholderNames.has(key)) {
        throw new Error(`Unknown substitution "${key}" given`);
      }
    });
  }

  metadata.placeholders.slice().reverse().forEach(placeholder => {
    try {
      applyReplacement(placeholder, ast, replacements && replacements[placeholder.name] || null);
    } catch (e) {
      e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`;
      throw e;
    }
  });
  return ast;
}