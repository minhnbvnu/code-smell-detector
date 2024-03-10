function getProgramCacheKeyBooleans( array, parameters ) {

		_programLayers.disableAll();

		if ( parameters.isWebGL2 )
			_programLayers.enable( 0 );
		if ( parameters.supportsVertexTextures )
			_programLayers.enable( 1 );
		if ( parameters.instancing )
			_programLayers.enable( 2 );
		if ( parameters.instancingColor )
			_programLayers.enable( 3 );
		if ( parameters.map )
			_programLayers.enable( 4 );
		if ( parameters.matcap )
			_programLayers.enable( 5 );
		if ( parameters.envMap )
			_programLayers.enable( 6 );
		if ( parameters.lightMap )
			_programLayers.enable( 7 );
		if ( parameters.aoMap )
			_programLayers.enable( 8 );
		if ( parameters.emissiveMap )
			_programLayers.enable( 9 );
		if ( parameters.bumpMap )
			_programLayers.enable( 10 );
		if ( parameters.normalMap )
			_programLayers.enable( 11 );
		if ( parameters.objectSpaceNormalMap )
			_programLayers.enable( 12 );
		if ( parameters.tangentSpaceNormalMap )
			_programLayers.enable( 13 );
		if ( parameters.clearcoat )
			_programLayers.enable( 14 );
		if ( parameters.clearcoatMap )
			_programLayers.enable( 15 );
		if ( parameters.clearcoatRoughnessMap )
			_programLayers.enable( 16 );
		if ( parameters.clearcoatNormalMap )
			_programLayers.enable( 17 );
		if ( parameters.displacementMap )
			_programLayers.enable( 18 );
		if ( parameters.specularMap )
			_programLayers.enable( 19 );
		if ( parameters.roughnessMap )
			_programLayers.enable( 20 );
		if ( parameters.metalnessMap )
			_programLayers.enable( 21 );
		if ( parameters.gradientMap )
			_programLayers.enable( 22 );
		if ( parameters.alphaMap )
			_programLayers.enable( 23 );
		if ( parameters.alphaTest )
			_programLayers.enable( 24 );
		if ( parameters.vertexColors )
			_programLayers.enable( 25 );
		if ( parameters.vertexAlphas )
			_programLayers.enable( 26 );
		if ( parameters.vertexUvs )
			_programLayers.enable( 27 );
		if ( parameters.vertexTangents )
			_programLayers.enable( 28 );
		if ( parameters.uvsVertexOnly )
			_programLayers.enable( 29 );
		if ( parameters.fog )
			_programLayers.enable( 30 );

		array.push( _programLayers.mask );
		_programLayers.disableAll();

		if ( parameters.useFog )
			_programLayers.enable( 0 );
		if ( parameters.flatShading )
			_programLayers.enable( 1 );
		if ( parameters.logarithmicDepthBuffer )
			_programLayers.enable( 2 );
		if ( parameters.skinning )
			_programLayers.enable( 3 );
		if ( parameters.useVertexTexture )
			_programLayers.enable( 4 );
		if ( parameters.morphTargets )
			_programLayers.enable( 5 );
		if ( parameters.morphNormals )
			_programLayers.enable( 6 );
		if ( parameters.morphColors )
			_programLayers.enable( 7 );
		if ( parameters.premultipliedAlpha )
			_programLayers.enable( 8 );
		if ( parameters.shadowMapEnabled )
			_programLayers.enable( 9 );
		if ( parameters.physicallyCorrectLights )
			_programLayers.enable( 10 );
		if ( parameters.doubleSided )
			_programLayers.enable( 11 );
		if ( parameters.flipSided )
			_programLayers.enable( 12 );
		if ( parameters.depthPacking )
			_programLayers.enable( 13 );
		if ( parameters.dithering )
			_programLayers.enable( 14 );
		if ( parameters.specularIntensityMap )
			_programLayers.enable( 15 );
		if ( parameters.specularColorMap )
			_programLayers.enable( 16 );
		if ( parameters.transmission )
			_programLayers.enable( 17 );
		if ( parameters.transmissionMap )
			_programLayers.enable( 18 );
		if ( parameters.thicknessMap )
			_programLayers.enable( 19 );
		if ( parameters.sheen )
			_programLayers.enable( 20 );
		if ( parameters.sheenColorMap )
			_programLayers.enable( 21 );
		if ( parameters.sheenRoughnessMap )
			_programLayers.enable( 22 );
		if ( parameters.decodeVideoTexture )
			_programLayers.enable( 23 );
		if ( parameters.opaque )
			_programLayers.enable( 24 );

		array.push( _programLayers.mask );

	}