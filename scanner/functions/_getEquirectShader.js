function _getEquirectShader() {

    	const texelSize = new Vector2( 1, 1 );
    	const shaderMaterial = new RawShaderMaterial( {

    		name: 'EquirectangularToCubeUV',

    		uniforms: {
    			'envMap': { value: null },
    			'texelSize': { value: texelSize },
    			'inputEncoding': { value: ENCODINGS[ LinearEncoding ] },
    			'outputEncoding': { value: ENCODINGS[ LinearEncoding ] }
    		},

    		vertexShader: _getCommonVertexShader(),

    		fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			${ _getEncodings() }

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x += texelSize.x;
				vec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.y += texelSize.y;
				vec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,

    		blending: NoBlending,
    		depthTest: false,
    		depthWrite: false

    	} );

    	return shaderMaterial;

    }