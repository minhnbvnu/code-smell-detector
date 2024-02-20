function placeholderVisitorHandler(node, ancestors, state) {
  var _state$placeholderWhi;

  let name;

  if (t.isPlaceholder(node)) {
    if (state.syntacticPlaceholders === false) {
      throw new Error("%%foo%%-style placeholders can't be used when " + "'.syntacticPlaceholders' is false.");
    } else {
      name = node.name.name;
      state.isLegacyRef.value = false;
    }
  } else if (state.isLegacyRef.value === false || state.syntacticPlaceholders) {
    return;
  } else if (t.isIdentifier(node) || t.isJSXIdentifier(node)) {
    name = node.name;
    state.isLegacyRef.value = true;
  } else if (t.isStringLiteral(node)) {
    name = node.value;
    state.isLegacyRef.value = true;
  } else {
    return;
  }

  if (!state.isLegacyRef.value && (state.placeholderPattern != null || state.placeholderWhitelist != null)) {
    throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible" + " with '.syntacticPlaceholders: true'");
  }

  if (state.isLegacyRef.value && (state.placeholderPattern === false || !(state.placeholderPattern || PATTERN).test(name)) && !((_state$placeholderWhi = state.placeholderWhitelist) == null ? void 0 : _state$placeholderWhi.has(name))) {
    return;
  }

  ancestors = ancestors.slice();
  const {
    node: parent,
    key
  } = ancestors[ancestors.length - 1];
  let type;

  if (t.isStringLiteral(node) || t.isPlaceholder(node, {
    expectedNode: "StringLiteral"
  })) {
    type = "string";
  } else if (t.isNewExpression(parent) && key === "arguments" || t.isCallExpression(parent) && key === "arguments" || t.isFunction(parent) && key === "params") {
    type = "param";
  } else if (t.isExpressionStatement(parent) && !t.isPlaceholder(node)) {
    type = "statement";
    ancestors = ancestors.slice(0, -1);
  } else if (t.isStatement(node) && t.isPlaceholder(node)) {
    type = "statement";
  } else {
    type = "other";
  }

  const {
    placeholders,
    placeholderNames
  } = state.isLegacyRef.value ? state.legacy : state.syntactic;
  placeholders.push({
    name,
    type,
    resolve: ast => resolveAncestors(ast, ancestors),
    isDuplicate: placeholderNames.has(name)
  });
  placeholderNames.add(name);
}