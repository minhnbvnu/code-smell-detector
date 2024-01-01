function sortRenderOrderOnly (a, b) {
  if (a.groupOrder !== b.groupOrder) {
    return a.groupOrder - b.groupOrder;
  }
  return a.renderOrder - b.renderOrder;
}