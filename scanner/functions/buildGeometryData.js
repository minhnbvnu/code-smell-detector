function buildGeometryData( primitive, source, offset, array ) {

      var indices = primitive.p;
      var stride = primitive.stride;
      var vcount = primitive.vcount;

      function pushVector( i ) {

        var index = indices[ i + offset ] * sourceStride;
        var length = index + sourceStride;

        for ( ; index < length; index ++ ) {

          array.push( sourceArray[ index ] );

        }

      }

      var sourceArray = source.array;
      var sourceStride = source.stride;

      if ( primitive.vcount !== undefined ) {

        var index = 0;

        for ( var i = 0, l = vcount.length; i < l; i ++ ) {

          var count = vcount[ i ];

          if ( count === 4 ) {

            var a = index + stride * 0;
            var b = index + stride * 1;
            var c = index + stride * 2;
            var d = index + stride * 3;

            pushVector( a ); pushVector( b ); pushVector( d );
            pushVector( b ); pushVector( c ); pushVector( d );

          } else if ( count === 3 ) {

            var a = index + stride * 0;
            var b = index + stride * 1;
            var c = index + stride * 2;

            pushVector( a ); pushVector( b ); pushVector( c );

          } else if ( count > 4 ) {

            for ( var k = 1, kl = ( count - 2 ); k <= kl; k ++ ) {

              var a = index + stride * 0;
              var b = index + stride * k;
              var c = index + stride * ( k + 1 );

              pushVector( a ); pushVector( b ); pushVector( c );

            }

          }

          index += stride * count;

        }

      } else {

        for ( var i = 0, l = indices.length; i < l; i += stride ) {

          pushVector( i );

        }

      }

    }