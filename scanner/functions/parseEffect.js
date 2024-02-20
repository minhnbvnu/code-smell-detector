function parseEffect( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'profile_COMMON':
            data.profile = parseEffectProfileCOMMON( child );
            break;

        }

      }

      library.effects[ xml.getAttribute( 'id' ) ] = data;

    }