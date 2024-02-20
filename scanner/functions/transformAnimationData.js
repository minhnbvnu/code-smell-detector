function transformAnimationData( keyframes, property, defaultValue ) {

      var keyframe;

      var empty = true;
      var i, l;

      // check, if values of a property are missing in our keyframes

      for ( i = 0, l = keyframes.length; i < l; i ++ ) {

        keyframe = keyframes[ i ];

        if ( keyframe.value[ property ] === undefined ) {

          keyframe.value[ property ] = null; // mark as missing

        } else {

          empty = false;

        }

      }

      if ( empty === true ) {

        // no values at all, so we set a default value

        for ( i = 0, l = keyframes.length; i < l; i ++ ) {

          keyframe = keyframes[ i ];

          keyframe.value[ property ] = defaultValue;

        }

      } else {

        // filling gaps

        createMissingKeyframes( keyframes, property );

      }

    }