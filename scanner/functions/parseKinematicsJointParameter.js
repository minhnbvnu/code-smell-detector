function parseKinematicsJointParameter( xml, data ) {

      var data = {
        sid: xml.getAttribute( 'sid' ),
        name: xml.getAttribute( 'name' ) || '',
        axis: new THREE.Vector3(),
        limits: {
          min: 0,
          max: 0
        },
        type: xml.nodeName,
        static: false,
        zeroPosition: 0,
        middlePosition: 0
      };

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'axis':
            var array = parseFloats( child.textContent );
            data.axis.fromArray( array );
            break;
          case 'limits':
            var max = child.getElementsByTagName( 'max' )[ 0 ];
            var min = child.getElementsByTagName( 'min' )[ 0 ];

            data.limits.max = parseFloat( max.textContent );
            data.limits.min = parseFloat( min.textContent );
            break;

        }

      }

      // if min is equal to or greater than max, consider the joint static

      if ( data.limits.min >= data.limits.max ) {

        data.static = true;

      }

      // calculate middle position

      data.middlePosition = ( data.limits.min + data.limits.max ) / 2.0;

      return data;

    }