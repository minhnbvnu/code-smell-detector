function getOrInsertCSSRule(styleParent, selectorText) {
  const cssRule = getCSSRule(styleParent, (st) => st === selectorText);
  if (cssRule) return cssRule;
  return insertCSSRule(styleParent, selectorText);
}