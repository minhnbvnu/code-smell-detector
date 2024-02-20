function parseEffectTechnique( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'constant':
          case 'lambert':
          case 'blinn':
          case 'phong':
            data.type = child.nodeName;
            data.parameters = parseEffectParameters( child );
            break;

        }

      }

      return data;

    }