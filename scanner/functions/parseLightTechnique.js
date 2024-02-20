function parseLightTechnique( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'directional':
          case 'point':
          case 'spot':
          case 'ambient':

            data.technique = child.nodeName;
            data.parameters = parseLightParameters( child );

        }

      }

      return data;

    }