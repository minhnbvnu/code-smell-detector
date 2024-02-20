function updateDisplayDensity(displayDensity, documentElements) {
  // Sizes and paddings/margins are all rem-based,
  // so update the root font-size as well when the display preference changes.
  const computedStyle = getComputedStyle(document.body);
  const fontSize = computedStyle.getPropertyValue(`--${displayDensity}-root-font-size`);
  const root = document.querySelector(':root');
  root.style.fontSize = fontSize;
}