function parseFloats( text ) {

      if ( text.length === 0 ) return [];

      var parts = text.trim().split( /\s+/ );
      var array = new Array( parts.length );

      for ( var i = 0, l = parts.length; i < l; i ++ ) {

        array[ i ] = parseFloat( parts[ i ] );

      }

      return array;

    }