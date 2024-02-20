function parseKinematicsAttachment( xml ) {

      var data = {
        joint: xml.getAttribute( 'joint' ).split( '/' ).pop(),
        transforms: [],
        links: []
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'link':
            data.links.push( parseKinematicsLink( child ) );
            break;

          case 'matrix':
          case 'translate':
          case 'rotate':
            data.transforms.push( parseKinematicsTransform( child ) );
            break;

        }

      }

      return data;

    }