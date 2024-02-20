function parseEffectNewparam( xml, data ) {

      var sid = xml.getAttribute( 'sid' );

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'surface':
            data.surfaces[ sid ] = parseEffectSurface( child );
            break;

          case 'sampler2D':
            data.samplers[ sid ] = parseEffectSampler( child );
            break;

        }

      }

    }