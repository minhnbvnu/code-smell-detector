function _getEquirectMaterial() {

	return new ShaderMaterial( {

		name: 'EquirectangularToCubeUV',

		uniforms: {
			'envMap': { value: null }
		},

		vertexShader: _getCommonVertexShader(),

		fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,

		blending: NoBlending,
		depthTest: false,
		depthWrite: false

	} );

}