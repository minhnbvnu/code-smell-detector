function updateCommonMaterialProperties( material, parameters ) {

    		const materialProperties = properties.get( material );

    		materialProperties.outputEncoding = parameters.outputEncoding;
    		materialProperties.instancing = parameters.instancing;
    		materialProperties.skinning = parameters.skinning;
    		materialProperties.morphTargets = parameters.morphTargets;
    		materialProperties.morphNormals = parameters.morphNormals;
    		materialProperties.morphTargetsCount = parameters.morphTargetsCount;
    		materialProperties.numClippingPlanes = parameters.numClippingPlanes;
    		materialProperties.numIntersection = parameters.numClipIntersection;
    		materialProperties.vertexAlphas = parameters.vertexAlphas;
    		materialProperties.vertexTangents = parameters.vertexTangents;

    	}