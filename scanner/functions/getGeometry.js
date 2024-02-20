function getGeometry( name ) {

			if ( geometries[ name ] === undefined ) {

				console.warn( 'THREE.ObjectLoader: Undefined geometry', name );

			}

			return geometries[ name ];

		}