function getCSSRule(styleParent, predicate) {
  let style;
  // @ts-ignore
  for (style of styleParent.querySelectorAll('style')) {
    // Catch this error. e.g. browser extension adds style tags.
    //   Uncaught DOMException: CSSStyleSheet.cssRules getter:
    //   Not allowed to access cross-origin stylesheet
    let cssRules;
    try {
      cssRules = style.sheet?.cssRules;
    } catch {
      continue;
    }
    for (let rule of cssRules ?? []) {
      if (predicate(rule.selectorText)) return rule;
    }
  }
}