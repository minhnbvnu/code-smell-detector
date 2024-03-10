function getParameters( material, lights, shadows, scene, object ) {

    		const fog = scene.fog;
    		const environment = material.isMeshStandardMaterial ? scene.environment : null;

    		const envMap = ( material.isMeshStandardMaterial ? cubeuvmaps : cubemaps ).get( material.envMap || environment );

    		const shaderID = shaderIDs[ material.type ];

    		// heuristics to create shader parameters according to lights in the scene
    		// (not to blow over maxLights budget)

    		const maxBones = object.isSkinnedMesh ? getMaxBones( object ) : 0;

    		if ( material.precision !== null ) {

    			precision = capabilities.getMaxPrecision( material.precision );

    			if ( precision !== material.precision ) {

    				console.warn( 'THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );

    			}

    		}

    		let vertexShader, fragmentShader;

    		if ( shaderID ) {

    			const shader = ShaderLib[ shaderID ];

    			vertexShader = shader.vertexShader;
    			fragmentShader = shader.fragmentShader;

    		} else {

    			vertexShader = material.vertexShader;
    			fragmentShader = material.fragmentShader;

    		}

    		const currentRenderTarget = renderer.getRenderTarget();

    		const useAlphaTest = material.alphaTest > 0;
    		const useClearcoat = material.clearcoat > 0;

    		const parameters = {

    			isWebGL2: isWebGL2,

    			shaderID: shaderID,
    			shaderName: material.type,

    			vertexShader: vertexShader,
    			fragmentShader: fragmentShader,
    			defines: material.defines,

    			isRawShaderMaterial: material.isRawShaderMaterial === true,
    			glslVersion: material.glslVersion,

    			precision: precision,

    			instancing: object.isInstancedMesh === true,
    			instancingColor: object.isInstancedMesh === true && object.instanceColor !== null,

    			supportsVertexTextures: vertexTextures,
    			outputEncoding: ( currentRenderTarget !== null ) ? getTextureEncodingFromMap( currentRenderTarget.texture ) : renderer.outputEncoding,
    			map: !! material.map,
    			mapEncoding: getTextureEncodingFromMap( material.map ),
    			matcap: !! material.matcap,
    			matcapEncoding: getTextureEncodingFromMap( material.matcap ),
    			envMap: !! envMap,
    			envMapMode: envMap && envMap.mapping,
    			envMapEncoding: getTextureEncodingFromMap( envMap ),
    			envMapCubeUV: ( !! envMap ) && ( ( envMap.mapping === CubeUVReflectionMapping ) || ( envMap.mapping === CubeUVRefractionMapping ) ),
    			lightMap: !! material.lightMap,
    			lightMapEncoding: getTextureEncodingFromMap( material.lightMap ),
    			aoMap: !! material.aoMap,
    			emissiveMap: !! material.emissiveMap,
    			emissiveMapEncoding: getTextureEncodingFromMap( material.emissiveMap ),
    			bumpMap: !! material.bumpMap,
    			normalMap: !! material.normalMap,
    			objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
    			tangentSpaceNormalMap: material.normalMapType === TangentSpaceNormalMap,

    			clearcoat: useClearcoat,
    			clearcoatMap: useClearcoat && !! material.clearcoatMap,
    			clearcoatRoughnessMap: useClearcoat && !! material.clearcoatRoughnessMap,
    			clearcoatNormalMap: useClearcoat && !! material.clearcoatNormalMap,

    			displacementMap: !! material.displacementMap,
    			roughnessMap: !! material.roughnessMap,
    			metalnessMap: !! material.metalnessMap,
    			specularMap: !! material.specularMap,
    			specularIntensityMap: !! material.specularIntensityMap,
    			specularColorMap: !! material.specularColorMap,
    			specularColorMapEncoding: getTextureEncodingFromMap( material.specularColorMap ),

    			alphaMap: !! material.alphaMap,
    			alphaTest: useAlphaTest,

    			gradientMap: !! material.gradientMap,

    			sheen: material.sheen > 0,
    			sheenColorMap: !! material.sheenColorMap,
    			sheenColorMapEncoding: getTextureEncodingFromMap( material.sheenColorMap ),
    			sheenRoughnessMap: !! material.sheenRoughnessMap,

    			transmission: material.transmission > 0,
    			transmissionMap: !! material.transmissionMap,
    			thicknessMap: !! material.thicknessMap,

    			combine: material.combine,

    			vertexTangents: ( !! material.normalMap && !! object.geometry && !! object.geometry.attributes.tangent ),
    			vertexColors: material.vertexColors,
    			vertexAlphas: material.vertexColors === true && !! object.geometry && !! object.geometry.attributes.color && object.geometry.attributes.color.itemSize === 4,
    			vertexUvs: !! material.map || !! material.bumpMap || !! material.normalMap || !! material.specularMap || !! material.alphaMap || !! material.emissiveMap || !! material.roughnessMap || !! material.metalnessMap || !! material.clearcoatMap || !! material.clearcoatRoughnessMap || !! material.clearcoatNormalMap || !! material.displacementMap || !! material.transmissionMap || !! material.thicknessMap || !! material.specularIntensityMap || !! material.specularColorMap || !! material.sheenColorMap || material.sheenRoughnessMap,
    			uvsVertexOnly: ! ( !! material.map || !! material.bumpMap || !! material.normalMap || !! material.specularMap || !! material.alphaMap || !! material.emissiveMap || !! material.roughnessMap || !! material.metalnessMap || !! material.clearcoatNormalMap || material.transmission > 0 || !! material.transmissionMap || !! material.thicknessMap || !! material.specularIntensityMap || !! material.specularColorMap || material.sheen > 0 || !! material.sheenColorMap || !! material.sheenRoughnessMap ) && !! material.displacementMap,

    			fog: !! fog,
    			useFog: material.fog,
    			fogExp2: ( fog && fog.isFogExp2 ),

    			flatShading: !! material.flatShading,

    			sizeAttenuation: material.sizeAttenuation,
    			logarithmicDepthBuffer: logarithmicDepthBuffer,

    			skinning: object.isSkinnedMesh === true && maxBones > 0,
    			maxBones: maxBones,
    			useVertexTexture: floatVertexTextures,

    			morphTargets: !! object.geometry && !! object.geometry.morphAttributes.position,
    			morphNormals: !! object.geometry && !! object.geometry.morphAttributes.normal,
    			morphTargetsCount: ( !! object.geometry && !! object.geometry.morphAttributes.position ) ? object.geometry.morphAttributes.position.length : 0,

    			numDirLights: lights.directional.length,
    			numPointLights: lights.point.length,
    			numSpotLights: lights.spot.length,
    			numRectAreaLights: lights.rectArea.length,
    			numHemiLights: lights.hemi.length,

    			numDirLightShadows: lights.directionalShadowMap.length,
    			numPointLightShadows: lights.pointShadowMap.length,
    			numSpotLightShadows: lights.spotShadowMap.length,

    			numClippingPlanes: clipping.numPlanes,
    			numClipIntersection: clipping.numIntersection,

    			format: material.format,
    			dithering: material.dithering,

    			shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
    			shadowMapType: renderer.shadowMap.type,

    			toneMapping: material.toneMapped ? renderer.toneMapping : NoToneMapping,
    			physicallyCorrectLights: renderer.physicallyCorrectLights,

    			premultipliedAlpha: material.premultipliedAlpha,

    			doubleSided: material.side === DoubleSide,
    			flipSided: material.side === BackSide,

    			depthPacking: ( material.depthPacking !== undefined ) ? material.depthPacking : false,

    			index0AttributeName: material.index0AttributeName,

    			extensionDerivatives: material.extensions && material.extensions.derivatives,
    			extensionFragDepth: material.extensions && material.extensions.fragDepth,
    			extensionDrawBuffers: material.extensions && material.extensions.drawBuffers,
    			extensionShaderTextureLOD: material.extensions && material.extensions.shaderTextureLOD,

    			rendererExtensionFragDepth: isWebGL2 || extensions.has( 'EXT_frag_depth' ),
    			rendererExtensionDrawBuffers: isWebGL2 || extensions.has( 'WEBGL_draw_buffers' ),
    			rendererExtensionShaderTextureLod: isWebGL2 || extensions.has( 'EXT_shader_texture_lod' ),

    			customProgramCacheKey: material.customProgramCacheKey()

    		};

    		return parameters;

    	}