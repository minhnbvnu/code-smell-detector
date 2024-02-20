function getTransformationCss(textFrame, vertAnchorPct) {
  var matrix = clearMatrixShift(textFrame.matrix);
  var horizAnchorPct = 50;
  var transformOrigin = horizAnchorPct + '% ' + vertAnchorPct + '%;';
  var transform = 'matrix(' +
      roundTo(matrix.mValueA, cssPrecision) + ',' +
      roundTo(-matrix.mValueB, cssPrecision) + ',' +
      roundTo(-matrix.mValueC, cssPrecision) + ',' +
      roundTo(matrix.mValueD, cssPrecision) + ',' +
      roundTo(matrix.mValueTX, cssPrecision) + ',' +
      roundTo(matrix.mValueTY, cssPrecision) + ');';

  // TODO: handle character scaling.
  // One option: add separate CSS transform to paragraphs inside a TextFrame
  var charStyle = textFrame.textRange.characterAttributes;
  var scaleX = charStyle.horizontalScale;
  var scaleY = charStyle.verticalScale;
  if (scaleX != 100 || scaleY != 100) {
    warn('Vertical or horizontal text scaling will be lost. Affected text: ' + truncateString(textFrame.contents, 35));
  }

  return 'transform: ' + transform +  'transform-origin: ' + transformOrigin +
    '-webkit-transform: ' + transform + '-webkit-transform-origin: ' + transformOrigin +
    '-ms-transform: ' + transform + '-ms-transform-origin: ' + transformOrigin;
}