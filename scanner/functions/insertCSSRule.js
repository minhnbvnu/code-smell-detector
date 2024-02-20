function insertCSSRule(styleParent, selectorText) {
  const styles = styleParent.querySelectorAll('style') ?? [];
  const style = styles?.[styles.length - 1];

  // If there is no style sheet return an empty style rule.
  if (!style?.sheet) {
    // The style tag must be connected to the DOM before it has a sheet.
    // This could indicate a bug. Should the code be moved to connectedCallback?
    console.warn('Media Chrome: No style sheet found on style tag of', styleParent);

    return {
      // @ts-ignore
      style: {
        setProperty: () => {},
        removeProperty: () => '',
        getPropertyValue: () => '',
      },
    };
  }

  style?.sheet.insertRule(`${selectorText}{}`, style.sheet.cssRules.length);
  return /** @type {CSSStyleRule} */(style.sheet.cssRules?.[style.sheet.cssRules.length - 1]);
}