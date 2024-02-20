function doCorners(){

    var indexInd = 0;


    var flips = [
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      true
    ];

    var lastRowOffset = rs1 * ( radiusSegments - 1 );

    for ( var i = 0 ; i < 8 ; i ++ ){

      var cornerOffset = cornerVertNumber * i;

      for ( var v = 0 ; v < radiusSegments - 1 ; v ++ ){

        var r1 = v * rs1;     //row offset
        var r2 = (v + 1) * rs1; //next row

        for ( var u = 0 ; u < radiusSegments ; u ++ ){

          var u1 = u + 1;
          var a = cornerOffset + r1 + u;
          var b = cornerOffset + r1 + u1;
          var c = cornerOffset + r2 + u;
          var d = cornerOffset + r2 + u1;

          if( !flips[i] ){

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

      for ( var u = 0 ; u < radiusSegments ; u ++ ){

        var a = cornerOffset + lastRowOffset + u;
        var b = cornerOffset + lastRowOffset + u + 1;
        var c = cornerOffset + lastVertex;

        if( !flips[i] ){

          indices.push( a );
          indices.push( b );
          indices.push( c );

        } else {

          indices.push( a );
          indices.push( c );
          indices.push( b );

        }

      }

    }

  }