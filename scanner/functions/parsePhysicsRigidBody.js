function parsePhysicsRigidBody( xml, data ) {

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'technique_common':
            parsePhysicsTechniqueCommon( child, data );
            break;

        }

      }

    }