function parseKinematicsLink( xml ) {

      var data = {
        sid: xml.getAttribute( 'sid' ),
        name: xml.getAttribute( 'name' ) || '',
        attachments: [],
        transforms: []
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'attachment_full':
            data.attachments.push( parseKinematicsAttachment( child ) );
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