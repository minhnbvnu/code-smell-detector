function getNavPageNumHtml(index, numLeafs, pageNum, pageType, maxPageNum) {
  const pageIsAsserted = pageNum[0] != 'n';

  if (!pageIsAsserted) {
    const pageIndex = index + 1;
    return `(${pageIndex} of ${numLeafs})`; // Page (8 of 10)
  }

  const bookLengthLabel = (maxPageNum && parseFloat(pageNum)) ? ` of ${maxPageNum}` : '';
  return `${pageNum}${bookLengthLabel}`;
}