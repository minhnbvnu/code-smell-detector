function determineRealRects(parentEl, selector) {
  const initals = {
    position: parentEl.style.position,
    visibility: parentEl.style.visibility,
    top: parentEl.style.top,
    left: parentEl.style.left,
    transform: parentEl.style.transform,
  };
  parentEl.style.position = 'absolute';
  parentEl.style.visibility = 'hidden';
  parentEl.style.top = '0';
  parentEl.style.left = '0';
  parentEl.style.transform = 'none';
  document.body.appendChild(parentEl);
  const rects = new Map(
    Array.from(parentEl.querySelectorAll(selector))
      .map(wordEl => {
        const origRect = wordEl.getBoundingClientRect();
        return [wordEl, new Rect(
          origRect.left + window.scrollX,
          origRect.top + window.scrollY,
          origRect.width,
          origRect.height,
        )];
      })
  );
  document.body.removeChild(parentEl);
  Object.assign(parentEl.style, initals);
  return rects;
}