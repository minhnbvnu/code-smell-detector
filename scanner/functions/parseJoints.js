function parseJoints( xml ) {

      var data = {
        inputs: {}
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'input':
            var semantic = child.getAttribute( 'semantic' );
            var id = parseId( child.getAttribute( 'source' ) );
            data.inputs[ semantic ] = id;
            break;

        }

      }

      return data;

    }