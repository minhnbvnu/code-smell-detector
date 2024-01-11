function polygon( context, points ){
  for( var i = 0; i < points.length; i++ ){
    var pt = points[ i ];

    context.lineTo( pt.x, pt.y );
  }
}