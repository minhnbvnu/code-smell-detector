function parseGeometryVertices( xml ) {

      var data = {};

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        data[ child.getAttribute( 'semantic' ) ] = parseId( child.getAttribute( 'source' ) );

      }

      return data;

    }