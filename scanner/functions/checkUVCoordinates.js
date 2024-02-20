function checkUVCoordinates( primitives ) {

      var count = 0;

      for ( var i = 0, l = primitives.length; i < l; i ++ ) {

        var primitive = primitives[ i ];

        if ( primitive.hasUV === true ) {

          count ++;

        }

      }

      if ( count > 0 && count < primitives.length ) {

        primitives.uvsNeedsFix = true;

      }

    }