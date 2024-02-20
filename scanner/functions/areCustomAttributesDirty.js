function areCustomAttributesDirty( material ) {

		for ( var name in material.attributes ) {

			if ( material.attributes[ name ].needsUpdate ) return true;

		}

		return false;

	}