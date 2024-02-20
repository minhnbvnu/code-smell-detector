function parseEffectParameter( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'color':
            data[ child.nodeName ] = parseFloats( child.textContent );
            break;

          case 'float':
            data[ child.nodeName ] = parseFloat( child.textContent );
            break;

          case 'texture':
            data[ child.nodeName ] = { id: child.getAttribute( 'texture' ), extra: parseEffectParameterTexture( child ) };
            break;

        }

      }

      return data;

    }