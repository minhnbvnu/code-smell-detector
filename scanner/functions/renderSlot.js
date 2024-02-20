function renderSlot(slot) {
  return typeof slot === 'function' ? slot() : slot;
}