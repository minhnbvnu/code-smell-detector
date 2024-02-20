function doWidthEdges(){

    var end = radiusSegments - 1;

    var cStarts = [ 0 , 1 , 4 , 5 ];
    var cEnds =   [ 3 , 2 , 7 , 6 ];
    var needsFlip = [0,1,1,0];

    for ( var i = 0 ; i < 4 ; i ++ ){

      var cStart = cStarts[i] * cornerVertNumber;
      var cEnd = cEnds[i] * cornerVertNumber;


      for ( var u = 0 ; u <= end ; u ++ ){

        // var dInd = u != end ? radiusSegments + u * rs1 : cornerVertNumber - 1;

        var a = cStart + radiusSegments + u * rs1;
        var b = cStart + (u != end ? radiusSegments + (u + 1) * rs1 : cornerVertNumber - 1);

        var c = cEnd + radiusSegments + u * rs1;
        var d = cEnd + (u != end ? radiusSegments + (u + 1) * rs1 : cornerVertNumber - 1);

        if( !needsFlip[i] ){

          indices.push( a );
          indices.push( b );
          indices.push( c );
          indices.push( b );
          indices.push( d );
          indices.push( c );

        }
        else {

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