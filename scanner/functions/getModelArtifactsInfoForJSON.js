function getModelArtifactsInfoForJSON(modelArtifacts) {
	  if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
	    throw new Error('Expected JSON model topology, received ArrayBuffer.');
	  }

	  return {
	    dateSaved: new Date(),
	    modelTopologyType: 'JSON',
	    modelTopologyBytes: modelArtifacts.modelTopology == null ? 0 : stringByteLength(JSON.stringify(modelArtifacts.modelTopology)),
	    weightSpecsBytes: modelArtifacts.weightSpecs == null ? 0 : stringByteLength(JSON.stringify(modelArtifacts.weightSpecs)),
	    weightDataBytes: modelArtifacts.weightData == null ? 0 : modelArtifacts.weightData.byteLength
	  };
	}