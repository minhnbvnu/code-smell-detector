function parseCamera( xml ) {

      var data = {
        name: xml.getAttribute( 'name' )
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'optics':
            data.optics = parseCameraOptics( child );
            break;

        }

      }

      library.cameras[ xml.getAttribute( 'id' ) ] = data;

    }