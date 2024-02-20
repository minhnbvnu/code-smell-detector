function getClippedTextFramesByArtboard(ab, masks) {
  var abRect = ab.artboardRect;
  var frames = [];
  forEach(masks, function(o) {
    var clipRect = o.mask.geometricBounds;
    if (testSimilarBounds(abRect, clipRect, 5)) {
      // if clip path is masking the current artboard, skip the test
      return;
    }
    if (!testBoundsIntersection(abRect, clipRect)) {
      return; // ignore masks in other artboards
    }
    var texts = o.textframes;
    // var texts = filter(o.items, function(item) {return item.typename == 'TextFrame';});
    texts = selectMaskedItems(texts, clipRect, abRect);
    if (texts.length > 0) {
      frames = frames.concat(texts);
    }
  });
  return frames;
}