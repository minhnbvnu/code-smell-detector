function parseEffectProfileCOMMON( xml ) {

      var data = {
        surfaces: {},
        samplers: {}
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'newparam':
            parseEffectNewparam( child, data );
            break;

          case 'technique':
            data.technique = parseEffectTechnique( child );
            break;

          case 'extra':
            data.extra = parseEffectExtra( child );
            break;

        }

      }

      return data;

    }