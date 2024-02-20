function getTextFramesByArtboard(ab, masks, settings) {
  var candidateFrames = findTextFramesToRender(doc.textFrames, ab.artboardRect);
  var excludedFrames = getClippedTextFramesByArtboard(ab, masks);
  candidateFrames = arraySubtract(candidateFrames, excludedFrames);
  if (settings.render_rotated_skewed_text_as == 'image') {
    excludedFrames = filter(candidateFrames, textIsRotated);
    candidateFrames = arraySubtract(candidateFrames, excludedFrames);
  }
  return candidateFrames;
}