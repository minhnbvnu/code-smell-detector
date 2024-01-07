function pushBezierPts( r, edge, pts ){
  var qbezierAt = function( p1, p2, p3, t ){ return math.qbezierAt( p1, p2, p3, t ); };
  var _p = edge._private;
  var bpts = _p.rstyle.bezierPts;

  for( var i = 0; i < r.bezierProjPcts.length; i++ ){
    var p = r.bezierProjPcts[i];

    bpts.push( {
      x: qbezierAt( pts[0], pts[2], pts[4], p ),
      y: qbezierAt( pts[1], pts[3], pts[5], p )
    } );
  }
}