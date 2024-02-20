function parseEffectExtraTechnique( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'double_sided':
            data[ child.nodeName ] = parseInt( child.textContent );
            break;

        }

      }

      return data;

    }