function parseMaterial( xml ) {

      var data = {
        name: xml.getAttribute( 'name' )
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'instance_effect':
            data.url = parseId( child.getAttribute( 'url' ) );
            break;

        }

      }

      library.materials[ xml.getAttribute( 'id' ) ] = data;

    }