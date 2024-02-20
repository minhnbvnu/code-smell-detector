function parseCameraTechnique( xml ) {

      var data = {};

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        switch ( child.nodeName ) {

          case 'perspective':
          case 'orthographic':

            data.technique = child.nodeName;
            data.parameters = parseCameraParameters( child );

            break;

        }

      }

      return data;

    }