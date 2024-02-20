function buildLight( data ) {

      var light;

      switch ( data.technique ) {

        case 'directional':
          light = new THREE.DirectionalLight();
          break;

        case 'point':
          light = new THREE.PointLight();
          break;

        case 'spot':
          light = new THREE.SpotLight();
          break;

        case 'ambient':
          light = new THREE.AmbientLight();
          break;

      }

      if ( data.parameters.color ) light.color.copy( data.parameters.color );
      if ( data.parameters.distance ) light.distance = data.parameters.distance;

      return light;

    }