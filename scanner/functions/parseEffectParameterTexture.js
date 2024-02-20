function parseEffectParameterTexture( xml ) {

      var data = {
        technique: {}
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'extra':
            parseEffectParameterTextureExtra( child, data );
            break;

        }

      }

      return data;

    }