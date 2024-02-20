function parseController( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'skin':
            // there is exactly one skin per controller
            data.id = parseId( child.getAttribute( 'source' ) );
            data.skin = parseSkin( child );
            break;

          case 'morph':
            data.id = parseId( child.getAttribute( 'source' ) );
            console.warn( 'THREE.ColladaLoader: Morph target animation not supported yet.' );
            break;

        }

      }

      library.controllers[ xml.getAttribute( 'id' ) ] = data;

    }