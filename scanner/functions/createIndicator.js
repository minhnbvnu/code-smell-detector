function createIndicator(el, name) {
  let customIndicator = el.querySelector(`:scope > [slot="${name}"]`);

  // Chaining slots
  if (customIndicator?.nodeName == 'SLOT')
    // @ts-ignore
    customIndicator = customIndicator.assignedElements({ flatten: true })[0];

  if (customIndicator) {
    // @ts-ignore
    customIndicator = customIndicator.cloneNode(true);
    return customIndicator;
  }

  let fallbackIndicator = el.shadowRoot.querySelector(`[name="${name}"] > svg`);
  if (fallbackIndicator) {
    return fallbackIndicator.cloneNode(true);
  }

  // Return an empty string if no indicator is found to use the slot fallback.
  return '';
}