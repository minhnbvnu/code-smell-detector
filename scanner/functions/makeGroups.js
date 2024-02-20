function makeGroups( geometry, usesFaceMaterial ) {

		var maxVerticesInGroup = extensions.get( 'OES_element_index_uint' ) ? 4294967296 : 65535;

		var groupHash, hash_map = {};

		var numMorphTargets = geometry.morphTargets.length;
		var numMorphNormals = geometry.morphNormals.length;

		var group;
		var groups = {};
		var groupsList = [];

		for ( var f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

			var face = geometry.faces[ f ];
			var materialIndex = usesFaceMaterial ? face.materialIndex : 0;

			if ( ! ( materialIndex in hash_map ) ) {

				hash_map[ materialIndex ] = { hash: materialIndex, counter: 0 };

			}

			groupHash = hash_map[ materialIndex ].hash + '_' + hash_map[ materialIndex ].counter;

			if ( ! ( groupHash in groups ) ) {

				group = {
					id: geometryGroupCounter ++,
					faces3: [],
					materialIndex: materialIndex,
					vertices: 0,
					numMorphTargets: numMorphTargets,
					numMorphNormals: numMorphNormals
				};

				groups[ groupHash ] = group;
				groupsList.push( group );

			}

			if ( groups[ groupHash ].vertices + 3 > maxVerticesInGroup ) {

				hash_map[ materialIndex ].counter += 1;
				groupHash = hash_map[ materialIndex ].hash + '_' + hash_map[ materialIndex ].counter;

				if ( ! ( groupHash in groups ) ) {

					group = {
						id: geometryGroupCounter ++,
						faces3: [],
						materialIndex: materialIndex,
						vertices: 0,
						numMorphTargets: numMorphTargets,
						numMorphNormals: numMorphNormals
					};

					groups[ groupHash ] = group;
					groupsList.push( group );

				}

			}

			groups[ groupHash ].faces3.push( f );
			groups[ groupHash ].vertices += 3;

		}

		return groupsList;

	}