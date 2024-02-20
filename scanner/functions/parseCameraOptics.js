function parseCameraOptics( xml ) {

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        switch ( child.nodeName ) {

          case 'technique_common':
            return parseCameraTechnique( child );

        }

      }

      return {};

    }