function parsePhysicsTechniqueCommon( xml, data ) {

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'inertia':
            data.inertia = parseFloats( child.textContent );
            break;

          case 'mass':
            data.mass = parseFloats( child.textContent )[ 0 ];
            break;

        }

      }

    }