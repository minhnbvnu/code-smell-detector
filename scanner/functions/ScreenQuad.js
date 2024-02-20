function ScreenQuad( params ){

		params = params || {};

		THREE.Mesh.apply( this, [ defaultQuad , new THREE.ShaderMaterial({

			uniforms:{
				uTexture1: {
					type:'t',
					value: undefined !== params.texture1 ? params.texture1 : null
				},
        uDepth1: {
					type:'t',
					value: undefined !== params.depth1 ? params.depth1 : null
				},
			},

			vertexShader: defaultVertexShader,

			fragmentShader: params.fragmentShader ? params.fragmentShader : defaultFragmentShader,

			// depthWrite: false,

		})]);

		this.frustumCulled = false;

		// this.renderOrder = -1;

		//end mesh setup

		// console.log( this , this.width , this.height );

	}