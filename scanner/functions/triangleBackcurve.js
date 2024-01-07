function triangleBackcurve( context, points, controlPoint ){
  var firstPt;

  for( var i = 0; i < points.length; i++ ){
    var pt = points[ i ];

    if( i === 0 ){
      firstPt = pt;
    }

    context.lineTo( pt.x, pt.y );
  }

  context.quadraticCurveTo( controlPoint.x, controlPoint.y, firstPt.x, firstPt.y );
}