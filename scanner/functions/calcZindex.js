function calcZindex(target) {
  // Loop through each parent, getting Zindex (if its a number).
  // As it finds them, it grabs the highest/largest.
  let zIndexLevel = 0;
  for (; target && target !== document; target = target.parentNode) {
    const zindex = document.defaultView.getComputedStyle(target).getPropertyValue("z-index");
    if (!isNaN(zindex)) {
      if (zIndexLevel < zindex) {
        zIndexLevel = zindex;
      }
    }
  }

  // Take highest zindex in parent tree and adds one more.
  zIndexLevel = zIndexLevel + 2;
  return zIndexLevel;
}