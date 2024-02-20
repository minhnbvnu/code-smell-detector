function updateIndentationSizeVar(innerDiv, cachedChildWidths, indentationSizeRef, prevListWidthRef) {
  const list = innerDiv.parentElement;
  const listWidth = list.clientWidth; // Skip measurements when the Components panel is hidden.

  if (listWidth === 0) {
    return;
  } // Reset the max indentation size if the width of the tree has increased.


  if (listWidth > prevListWidthRef.current) {
    indentationSizeRef.current = DEFAULT_INDENTATION_SIZE;
  }

  prevListWidthRef.current = listWidth;
  let maxIndentationSize = indentationSizeRef.current; // eslint-disable-next-line no-for-of-loops/no-for-of-loops

  for (const child of innerDiv.children) {
    const depth = parseInt(child.getAttribute('data-depth'), 10) || 0;
    let childWidth = 0;
    const cachedChildWidth = cachedChildWidths.get(child);

    if (cachedChildWidth != null) {
      childWidth = cachedChildWidth;
    } else {
      const {
        firstElementChild
      } = child; // Skip over e.g. the guideline element

      if (firstElementChild != null) {
        childWidth = firstElementChild.clientWidth;
        cachedChildWidths.set(child, childWidth);
      }
    }

    const remainingWidth = Math.max(0, listWidth - childWidth);
    maxIndentationSize = Math.min(maxIndentationSize, remainingWidth / depth);
  }

  indentationSizeRef.current = maxIndentationSize;
  list.style.setProperty('--indentation-size', `${maxIndentationSize}px`);
}