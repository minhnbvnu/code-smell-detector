function triangleTee( context, trianglePoints, teePoints ){
  if( context.beginPath ){ context.beginPath(); }

  var triPts = trianglePoints;
  for( var i = 0; i < triPts.length; i++ ){
    var pt = triPts[ i ];

    context.lineTo( pt.x, pt.y );
  }

  var teePts = teePoints;
  var firstTeePt = teePoints[0];
  context.moveTo( firstTeePt.x, firstTeePt.y );

  for( var i = 1; i < teePts.length; i++ ){
    var pt = teePts[ i ];

    context.lineTo( pt.x, pt.y );
  }

  if( context.closePath ){ context.closePath(); }
}