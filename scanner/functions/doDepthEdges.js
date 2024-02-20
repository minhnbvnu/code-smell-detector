function doDepthEdges(){

    var cStarts = [ 0 , 2 , 4 , 6 ];
    var cEnds =   [ 1 , 3 , 5 , 7 ];

    for ( var i = 0 ; i < 4 ; i ++ ){

      var cStart = cornerVertNumber * cStarts[ i ];
      var cEnd =   cornerVertNumber * cEnds[ i ];

      var needsFlip = 1 >= i;

      for ( var u = 0 ; u < radiusSegments ; u ++ ){

        var urs1 =  u * rs1;
        var u1rs1 = (u+1) * rs1;

        var a = cStart + urs1;
        var b = cStart + u1rs1;
        var c = cEnd + urs1;
        var d = cEnd + u1rs1

        if( needsFlip ){

          indices.push( a );
          indices.push( c );
          indices.push( b );
          indices.push( b );
          indices.push( c );
          indices.push( d );

        } else {

          indices.push( a );
          indices.push( b );
          indices.push( c );
          indices.push( b );
          indices.push( d );
          indices.push( c );

        }

      }

    }

  }