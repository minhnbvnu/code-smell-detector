function buildTransformList( node ) {

      var transforms = [];

      var xml = collada.querySelector( '[id="' + node.id + '"]' );

      for ( var i = 0; i < xml.childNodes.length; i ++ ) {

        var child = xml.childNodes[ i ];

        if ( child.nodeType !== 1 ) continue;

        switch ( child.nodeName ) {

          case 'matrix':
            var array = parseFloats( child.textContent );
            var matrix = new THREE.Matrix4().fromArray( array ).transpose();
            transforms.push( {
              sid: child.getAttribute( 'sid' ),
              type: child.nodeName,
              obj: matrix
            } );
            break;

          case 'translate':
          case 'scale':
            var array = parseFloats( child.textContent );
            var vector = new THREE.Vector3().fromArray( array );
            transforms.push( {
              sid: child.getAttribute( 'sid' ),
              type: child.nodeName,
              obj: vector
            } );
            break;

          case 'rotate':
            var array = parseFloats( child.textContent );
            var vector = new THREE.Vector3().fromArray( array );
            var angle = THREE.MathUtils.degToRad( array[ 3 ] );
            transforms.push( {
              sid: child.getAttribute( 'sid' ),
              type: child.nodeName,
              obj: vector,
              angle: angle
            } );
            break;

        }

      }

      return transforms;

    }