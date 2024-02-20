function pushVector( i ) {

        var index = indices[ i + offset ] * sourceStride;
        var length = index + sourceStride;

        for ( ; index < length; index ++ ) {

          array.push( sourceArray[ index ] );

        }

      }