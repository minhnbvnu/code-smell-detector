function parseLightParameters( xml ) {

      var data = {};

      for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'color':
            var array = parseFloats( child.textContent );
            data.color = new THREE.Color().fromArray( array );
            break;

          case 'falloff_angle':
            data.falloffAngle = parseFloat( child.textContent );
            break;

          case 'quadratic_attenuation':
            var f = parseFloat( child.textContent );
            data.distance = f ? Math.sqrt( 1 / f ) : 0;
            break;

        }

      }

      return data;

    }