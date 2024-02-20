function parseKinematicsModel( xml ) {

      var data = {
        name: xml.getAttribute( 'name' ) || '',
        joints: {},
        links: []
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'technique_common':
            parseKinematicsTechniqueCommon( child, data );
            break;

        }

      }

      library.kinematicsModels[ xml.getAttribute( 'id' ) ] = data;

    }