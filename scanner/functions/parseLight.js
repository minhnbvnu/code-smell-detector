function parseLight( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'technique_common':
            data = parseLightTechnique( child );
            break;

        }

      }

      library.lights[ xml.getAttribute( 'id' ) ] = data;

    }