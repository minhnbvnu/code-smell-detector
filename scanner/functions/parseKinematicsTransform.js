function parseKinematicsTransform( xml ) {

      var data = {
        type: xml.nodeName
      };

      var array = parseFloats( xml.textContent );

      switch ( data.type ) {

        case 'matrix':
          data.obj = new THREE.Matrix4();
          data.obj.fromArray( array ).transpose();
          break;

        case 'translate':
          data.obj = new THREE.Vector3();
          data.obj.fromArray( array );
          break;

        case 'rotate':
          data.obj = new THREE.Vector3();
          data.obj.fromArray( array );
          data.angle = THREE.MathUtils.degToRad( array[ 3 ] );
          break;

      }

      return data;

    }