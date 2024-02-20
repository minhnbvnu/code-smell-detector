function parsePhysicsModel( xml ) {

      var data = {
        name: xml.getAttribute( 'name' ) || '',
        rigidBodies: {}
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'rigid_body':
            data.rigidBodies[ child.getAttribute( 'name' ) ] = {};
            parsePhysicsRigidBody( child, data.rigidBodies[ child.getAttribute( 'name' ) ] );
            break;

        }

      }

      library.physicsModels[ xml.getAttribute( 'id' ) ] = data;

    }