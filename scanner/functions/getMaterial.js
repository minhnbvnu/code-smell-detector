function getMaterial( name ) {

			if ( name === undefined ) return undefined;

			if ( Array.isArray( name ) ) {

				const array = [];

				for ( let i = 0, l = name.length; i < l; i ++ ) {

					const uuid = name[ i ];

					if ( materials[ uuid ] === undefined ) {

						console.warn( 'THREE.ObjectLoader: Undefined material', uuid );

					}

					array.push( materials[ uuid ] );

				}

				return array;

			}

			if ( materials[ name ] === undefined ) {

				console.warn( 'THREE.ObjectLoader: Undefined material', name );

			}

			return materials[ name ];

		}