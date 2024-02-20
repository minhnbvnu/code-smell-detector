function updateThemeVariables(theme, documentElements) {
  // Update scrollbar color to match theme.
  // this CSS property is currently only supported in Firefox,
  // but it makes a significant UI improvement in dark mode.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
  documentElements.forEach(documentElement => {
    // $FlowFixMe scrollbarColor is missing in CSSStyleDeclaration
    documentElement.style.scrollbarColor = `var(${`--${theme}-color-scroll-thumb`}) var(${`--${theme}-color-scroll-track`})`;
  });
}