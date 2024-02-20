function parseKinematicsTechniqueCommon( xml, data ) {

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'joint':
            data.joints[ child.getAttribute( 'sid' ) ] = parseKinematicsJoint( child );
            break;

          case 'link':
            data.links.push( parseKinematicsLink( child ) );
            break;

        }

      }

    }