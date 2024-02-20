function parseEffectParameterTextureExtraTechnique( xml, data ) {

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'repeatU':
          case 'repeatV':
          case 'offsetU':
          case 'offsetV':
            data.technique[ child.nodeName ] = parseFloat( child.textContent );
            break;

          case 'wrapU':
          case 'wrapV':

            // some files have values for wrapU/wrapV which become NaN via parseInt

            if ( child.textContent.toUpperCase() === 'TRUE' ) {

              data.technique[ child.nodeName ] = 1;

            } else if ( child.textContent.toUpperCase() === 'FALSE' ) {

              data.technique[ child.nodeName ] = 0;

            } else {

              data.technique[ child.nodeName ] = parseInt( child.textContent );

            }

            break;

        }

      }

    }