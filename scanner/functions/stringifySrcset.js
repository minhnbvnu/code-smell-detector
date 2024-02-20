function stringifySrcset(parsedSrcset) {
  return parsedSrcset.map(function (part) {
    if (!part.url) {
      throw new Error('URL missing');
    }
    return part.url + (part.w ? " ".concat(part.w, "w") : '') + (part.h ? " ".concat(part.h, "h") : '') + (part.d ? " ".concat(part.d, "x") : '');
  }).join(', ');
}