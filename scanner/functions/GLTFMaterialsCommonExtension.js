function GLTFMaterialsCommonExtension( json ) {

		this.name = EXTENSIONS.KHR_MATERIALS_COMMON;

		this.lights = {};

		var extension = ( json.extensions && json.extensions[ EXTENSIONS.KHR_MATERIALS_COMMON ] ) || {};
		var lights = extension.lights || {};

		for ( var lightId in lights ) {

			var light = lights[ lightId ];
			var lightNode;

			var lightParams = light[ light.type ];
			var color = new THREE.Color().fromArray( lightParams.color );

			switch ( light.type ) {

				case "directional":
					lightNode = new THREE.DirectionalLight( color );
					lightNode.position.set( 0, 0, 1 );
					break;

				case "point":
					lightNode = new THREE.PointLight( color );
					break;

				case "spot":
					lightNode = new THREE.SpotLight( color );
					lightNode.position.set( 0, 0, 1 );
					break;

				case "ambient":
					lightNode = new THREE.AmbientLight( color );
					break;

			}

			if ( lightNode ) {

				this.lights[ lightId ] = lightNode;

			}

		}

	}