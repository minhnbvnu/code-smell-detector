function updateMask(el, inputMask, maskReplacers) {
  const mask = parseMask(inputMask, maskReplacers);

  options.partiallyUpdate(el, { mask });
}