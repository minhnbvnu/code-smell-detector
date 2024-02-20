function parseVertexWeights( xml ) {

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
            var offset = parseInt( child.getAttribute( 'offset' ) );
            data.inputs[ semantic ] = { id: id, offset: offset };
            break;

          case 'vcount':
            data.vcount = parseInts( child.textContent );
            break;

          case 'v':
            data.v = parseInts( child.textContent );
            break;

        }

      }

      return data;

    }