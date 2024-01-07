function checkEdge( edge ){
    var _p = edge._private;

    var rs = _p.rscratch;
    var styleWidth = edge.pstyle( 'width' ).pfValue;
    var scale = edge.pstyle( 'arrow-scale' ).value;
    var width = styleWidth / 2 + edgeThreshold; // more like a distance radius from centre
    var widthSq = width * width;
    var width2 = width * 2;
    var src = _p.source;
    var tgt = _p.target;
    var sqDist;

    if( rs.edgeType === 'segments' || rs.edgeType === 'straight' || rs.edgeType === 'haystack' ){
      var pts = rs.allpts;

      for( var i = 0; i + 3 < pts.length; i += 2 ){
        if(
          (math.inLineVicinity( x, y, pts[ i ], pts[ i + 1], pts[ i + 2], pts[ i + 3], width2 ))
            &&
          widthSq > ( sqDist = math.sqdistToFiniteLine( x, y, pts[ i ], pts[ i + 1], pts[ i + 2], pts[ i + 3] ) )
        ){
          addEle( edge, sqDist );
          return true;
        }
      }

    } else if( rs.edgeType === 'bezier' || rs.edgeType === 'multibezier' || rs.edgeType === 'self' || rs.edgeType === 'compound' ){
      var pts = rs.allpts;
      for( var i = 0; i + 5 < rs.allpts.length; i += 4 ){
        if(
          (math.inBezierVicinity( x, y, pts[ i ], pts[ i + 1], pts[ i + 2], pts[ i + 3], pts[ i + 4], pts[ i + 5], width2 ))
            &&
          (widthSq > (sqDist = math.sqdistToQuadraticBezier( x, y, pts[ i ], pts[ i + 1], pts[ i + 2], pts[ i + 3], pts[ i + 4], pts[ i + 5] )) )
        ){
          addEle( edge, sqDist );
          return true;
        }
      }
    }

    // if we're close to the edge but didn't hit it, maybe we hit its arrows

    var src = src || _p.source;
    var tgt = tgt || _p.target;

    var arSize = self.getArrowWidth( styleWidth, scale );

    var arrows = [
      { name: 'source', x: rs.arrowStartX, y: rs.arrowStartY, angle: rs.srcArrowAngle },
      { name: 'target', x: rs.arrowEndX, y: rs.arrowEndY, angle: rs.tgtArrowAngle },
      { name: 'mid-source', x: rs.midX, y: rs.midY, angle: rs.midsrcArrowAngle },
      { name: 'mid-target', x: rs.midX, y: rs.midY, angle: rs.midtgtArrowAngle }
    ];

    for( var i = 0; i < arrows.length; i++ ){
      var ar = arrows[ i ];
      var shape = r.arrowShapes[ edge.pstyle( ar.name + '-arrow-shape' ).value ];
      var edgeWidth = edge.pstyle('width').pfValue;
      if(
        shape.roughCollide( x, y, arSize, ar.angle, { x: ar.x, y: ar.y }, edgeWidth, edgeThreshold )
         &&
        shape.collide( x, y, arSize, ar.angle, { x: ar.x, y: ar.y }, edgeWidth, edgeThreshold )
      ){
        addEle( edge );
        return true;
      }
    }

    // for compound graphs, hitting edge may actually want a connected node instead (b/c edge may have greater z-index precedence)
    if( hasCompounds && near.length > 0 ){
      checkNode( src );
      checkNode( tgt );
    }
  }