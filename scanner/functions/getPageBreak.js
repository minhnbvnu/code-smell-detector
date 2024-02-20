function getPageBreak(pageBreaks, scrollTop, scrollContainer) {
  let rootRect = getRootRect(scrollContainer);
  let scrollBottom = scrollTop + rootRect.height;

  for (let b = pageBreaks.length - 1; b >= 0; b--) {
    let bottom = pageBreaks[b].sentinel.getBoundingClientRect().bottom + scrollTop;

    if (scrollBottom > bottom) {
      let x = Math.min(b + 1, pageBreaks.length - 1);

      return pageBreaks[x];
    }
  }

  return pageBreaks[0];
}