function circleTriangle(context, trianglePoints, rx, ry, r) {
  if (context.beginPath) { context.beginPath(); }
  context.arc(rx, ry, r, 0, Math.PI * 2, false);    
  var triPts = trianglePoints;
  var firstTrPt = triPts[0];
  context.moveTo(firstTrPt.x, firstTrPt.y);
  for (var i = 0; i < triPts.length; i++) {
    var pt = triPts[i];
    context.lineTo(pt.x, pt.y);
  }
  if (context.closePath) {
    context.closePath();
  }
}