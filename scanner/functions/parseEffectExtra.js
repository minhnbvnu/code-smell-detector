function parseEffectExtra( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'technique':
            data.technique = parseEffectExtraTechnique( child );
            break;

        }

      }

      return data;

    }