function parseAnimationClip( xml ) {

      var data = {
        name: xml.getAttribute( 'id' ) || 'default',
        start: parseFloat( xml.getAttribute( 'start' ) || 0 ),
        end: parseFloat( xml.getAttribute( 'end' ) || 0 ),
        animations: []
      };

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'instance_animation':
            data.animations.push( parseId( child.getAttribute( 'url' ) ) );
            break;

        }

      }

      library.clips[ xml.getAttribute( 'id' ) ] = data;

    }