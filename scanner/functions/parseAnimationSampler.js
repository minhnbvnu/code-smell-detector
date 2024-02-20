function parseAnimationSampler( xml ) {

      var data = {
        inputs: {},
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'input':
            var id = parseId( child.getAttribute( 'source' ) );
            var semantic = child.getAttribute( 'semantic' );
            data.inputs[ semantic ] = id;
            break;

        }

      }

      return data;

    }