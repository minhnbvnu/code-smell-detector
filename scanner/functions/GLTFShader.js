function GLTFShader( targetNode, allNodes ) {

		var boundUniforms = {};

		// bind each uniform to its source node

		var uniforms = targetNode.material.uniforms;

		for ( var uniformId in uniforms ) {

			var uniform = uniforms[ uniformId ];

			if ( uniform.semantic ) {

				var sourceNodeRef = uniform.node;

				var sourceNode = targetNode;

				if ( sourceNodeRef ) {

					sourceNode = allNodes[ sourceNodeRef ];

				}

				boundUniforms[ uniformId ] = {
					semantic: uniform.semantic,
					sourceNode: sourceNode,
					targetNode: targetNode,
					uniform: uniform
				};

			}

		}

		this.boundUniforms = boundUniforms;
		this._m4 = new THREE.Matrix4();

	}