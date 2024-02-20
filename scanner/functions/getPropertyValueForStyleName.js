function getPropertyValueForStyleName(styleName) {
  if (cachedStyleNameToValueMap.has(styleName)) {
    return cachedStyleNameToValueMap.get(styleName);
  }

  for (let styleSheetIndex = 0; styleSheetIndex < document.styleSheets.length; styleSheetIndex++) {
    const styleSheet = document.styleSheets[styleSheetIndex]; // $FlowFixMe Flow doesn't konw about these properties

    const rules = styleSheet.rules || styleSheet.cssRules; // $FlowFixMe `rules` is mixed

    for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
      // $FlowFixMe `rules` is mixed
      const rule = rules[ruleIndex]; // $FlowFixMe Flow doesn't konw about these properties

      const {
        cssText,
        selectorText,
        style
      } = rule;

      if (selectorText != null) {
        if (selectorText.startsWith(`.${styleName}`)) {
          const match = cssText.match(/{ *([a-z\-]+):/);

          if (match !== null) {
            const property = match[1];
            const value = style.getPropertyValue(property);
            cachedStyleNameToValueMap.set(styleName, value);
            return value;
          } else {
            return null;
          }
        }
      }
    }
  }

  return null;
}