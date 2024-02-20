function _renderLocation ($$, fpage, lpage, pageRange, elocationId) {
  if (pageRange) {
    // Give up to three page ranges, then use passim for more, see
    // https://www.ncbi.nlm.nih.gov/books/NBK7282/box/A33679/?report=objectonly
    let parts = pageRange.split(',')
    if (parts.length > 3) {
      return parts.slice(0, 3).join(',') + ' passim'
    } else {
      return pageRange
    }
  } else if (fpage) {
    if (lpage) {
      // Do not repeat page numbers unless they are followed by a letter
      // e.g. 211-218 => 211-8 but 211A-218A stays
      if (fpage.length === lpage.length && /^\d+$/.test(fpage) && /^\d+$/.test(lpage)) {
        let i
        for (i = 0; i < fpage.length; i++) {
          if (fpage[i] !== lpage[i]) break
        }
        return fpage + '-' + lpage.substring(i)
      }
      return fpage + '-' + lpage
    } else {
      return fpage
    }
  } else if (elocationId) {
    return elocationId
  }
}