function pushCustomAttributesInRenderInstructions(
  renderInstructions,
  customAttributes,
  batchEntry,
  currentIndex,
) {
  let shift = 0;
  for (const key in customAttributes) {
    const attr = customAttributes[key];
    const value = attr.callback.call(batchEntry, batchEntry.feature);
    renderInstructions[currentIndex + shift++] = value[0] ?? value;
    if (!attr.size || attr.size === 1) {
      continue;
    }
    renderInstructions[currentIndex + shift++] = value[1];
    if (attr.size < 3) {
      continue;
    }
    renderInstructions[currentIndex + shift++] = value[2];
    if (attr.size < 4) {
      continue;
    }
    renderInstructions[currentIndex + shift++] = value[3];
  }
  return shift;
}