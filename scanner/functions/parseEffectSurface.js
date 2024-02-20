function parseEffectSurface( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'init_from':
            data.init_from = child.textContent;
            break;

        }

      }

      return data;

    }