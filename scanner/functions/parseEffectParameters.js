function parseEffectParameters( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'emission':
          case 'diffuse':
          case 'specular':
          case 'bump':
          case 'ambient':
          case 'shininess':
          case 'transparency':
            data[ child.nodeName ] = parseEffectParameter( child );
            break;
          case 'transparent':
            data[ child.nodeName ] = {
              opaque: child.getAttribute( 'opaque' ),
              data: parseEffectParameter( child )
            };
            break;

        }

      }

      return data;

    }