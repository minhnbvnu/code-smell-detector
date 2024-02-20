function _getBlurShader( maxSamples ) {

    	const weights = new Float32Array( maxSamples );
    	const poleAxis = new Vector3( 0, 1, 0 );
    	const shaderMaterial = new RawShaderMaterial( {

    		name: 'SphericalGaussianBlur',

    		defines: { 'n': maxSamples },

    		uniforms: {
    			'envMap': { value: null },
    			'samples': { value: 1 },
    			'weights': { value: weights },
    			'latitudinal': { value: false },
    			'dTheta': { value: 0 },
    			'mipInt': { value: 0 },
    			'poleAxis': { value: poleAxis },
    			'inputEncoding': { value: ENCODINGS[ LinearEncoding ] },
    			'outputEncoding': { value: ENCODINGS[ LinearEncoding ] }
    		},

    		vertexShader: _getCommonVertexShader(),

    		fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			${ _getEncodings() }

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,

    		blending: NoBlending,
    		depthTest: false,
    		depthWrite: false

    	} );

    	return shaderMaterial;

    }