function fromMemory(modelArtifacts, weightSpecs, weightData, trainingConfig) {
	  if (arguments.length === 1) {
	    var isModelArtifacts = modelArtifacts.modelTopology != null || modelArtifacts.weightSpecs != null;

	    if (isModelArtifacts) {
	      return new PassthroughLoader(modelArtifacts);
	    } else {
	      // Legacy support: with only modelTopology.
	      // TODO(cais): Remove this deprecated API.
	      console.warn('Please call tf.io.fromMemory() with only one argument. ' + 'The argument should be of type ModelArtifacts. ' + 'The multi-argument signature of tf.io.fromMemory() has been ' + 'deprecated and will be removed in a future release.');
	      return new PassthroughLoader({
	        modelTopology: modelArtifacts
	      });
	    }
	  } else {
	    // Legacy support.
	    // TODO(cais): Remove this deprecated API.
	    console.warn('Please call tf.io.fromMemory() with only one argument. ' + 'The argument should be of type ModelArtifacts. ' + 'The multi-argument signature of tf.io.fromMemory() has been ' + 'deprecated and will be removed in a future release.');
	    return new PassthroughLoader({
	      modelTopology: modelArtifacts,
	      weightSpecs: weightSpecs,
	      weightData: weightData,
	      trainingConfig: trainingConfig
	    });
	  }
	}