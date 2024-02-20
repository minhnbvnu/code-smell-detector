function getPrev( keyframes, i, property ) {

      while ( i >= 0 ) {

        var keyframe = keyframes[ i ];

        if ( keyframe.value[ property ] !== null ) return keyframe;

        i --;

      }

      return null;

    }