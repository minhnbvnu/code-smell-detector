function _getCubemapShader() {

    	const shaderMaterial = new RawShaderMaterial( {

    		name: 'CubemapToCubeUV',

    		uniforms: {
    			'envMap': { value: null },
    			'inputEncoding': { value: ENCODINGS[ LinearEncoding ] },
    			'outputEncoding': { value: ENCODINGS[ LinearEncoding ] }
    		},

    		vertexShader: _getCommonVertexShader(),

    		fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			${ _getEncodings() }

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;
				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,

    		blending: NoBlending,
    		depthTest: false,
    		depthWrite: false

    	} );

    	return shaderMaterial;

    }