function prepareAnimationData( data, defaultMatrix ) {

      var keyframes = [];

      // transfer data into a sortable array

      for ( var time in data ) {

        keyframes.push( { time: parseFloat( time ), value: data[ time ] } );

      }

      // ensure keyframes are sorted by time

      keyframes.sort( ascending );

      // now we clean up all animation data, so we can use them for keyframe tracks

      for ( var i = 0; i < 16; i ++ ) {

        transformAnimationData( keyframes, i, defaultMatrix.elements[ i ] );

      }

      return keyframes;

      // array sort function

      function ascending( a, b ) {

        return a.time - b.time;

      }

    }