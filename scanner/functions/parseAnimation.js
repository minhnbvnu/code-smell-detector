function parseAnimation( xml ) {

      var data = {
        sources: {},
        samplers: {},
        channels: {}
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        var id;

        switch ( child.nodeName ) {

          case 'source':
            id = child.getAttribute( 'id' );
            data.sources[ id ] = parseSource( child );
            break;

          case 'sampler':
            id = child.getAttribute( 'id' );
            data.samplers[ id ] = parseAnimationSampler( child );
            break;

          case 'channel':
            id = child.getAttribute( 'target' );
            data.channels[ id ] = parseAnimationChannel( child );
            break;

          default:
            console.log( child );

        }

      }

      library.animations[ xml.getAttribute( 'id' ) ] = data;

    }