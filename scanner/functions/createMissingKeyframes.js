function createMissingKeyframes( keyframes, property ) {

      var prev, next;

      for ( var i = 0, l = keyframes.length; i < l; i ++ ) {

        var keyframe = keyframes[ i ];

        if ( keyframe.value[ property ] === null ) {

          prev = getPrev( keyframes, i, property );
          next = getNext( keyframes, i, property );

          if ( prev === null ) {

            keyframe.value[ property ] = next.value[ property ];
            continue;

          }

          if ( next === null ) {

            keyframe.value[ property ] = prev.value[ property ];
            continue;

          }

          interpolate( keyframe, prev, next, property );

        }

      }

    }