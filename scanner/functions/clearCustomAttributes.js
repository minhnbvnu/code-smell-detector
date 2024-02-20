function clearCustomAttributes( material ) {

		for ( var name in material.attributes ) {

			material.attributes[ name ].needsUpdate = false;

		}

	}