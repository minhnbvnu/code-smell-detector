function doHeightEdges(){

    for ( var i = 0 ; i < 4 ; i ++ ){

      var cOffset = i * cornerVertNumber;
      var cRowOffset = 4 * cornerVertNumber + cOffset;
      var needsFlip = i & 1 === 1;
      for ( var u = 0 ; u < radiusSegments ; u ++ ){

        var u1 = u + 1;
        var a = cOffset + u;
        var b = cOffset + u1;
        var c = cRowOffset + u;
        var d = cRowOffset + u1;

        if( !needsFlip ){

          indices.push( a );
          indices.push( b );
          indices.push( c );
          indices.push( b );
          indices.push( d );
          indices.push( c );

        } else {

          indices.push( a );
          indices.push( c );
          indices.push( b );
          indices.push( b );
          indices.push( c );
          indices.push( d );

        }

      }

    }

  }