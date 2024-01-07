function execute(fetches, feedDict, kwargs, probe) {
	  var training = kwargs == null ? false : kwargs['training'];
	  var arrayFetches = Array.isArray(fetches);
	  var fetchArray = arrayFetches ? fetches : [fetches];
	  var outputNames = fetchArray.map(function (t) {
	    return t.name;
	  });
	  var finalOutputs = [];
	  var feedNames = feedDict.names();

	  for (var _iterator2 = _createForOfIteratorHelperLoose(outputNames), _step2; !(_step2 = _iterator2()).done;) {
	    var outputName = _step2.value;

	    if (feedNames.indexOf(outputName) !== -1) {
	      finalOutputs.push(feedDict.getValue(outputName));
	    } else {
	      finalOutputs.push(null);
	    }
	  }

	  if (probe != null) {
	    // For optional probing of memory footprint during execution.
	    probe.maxNumTensors = -Infinity;
	    probe.minNumTensors = Infinity;
	  } // Check cache.


	  var fetchAndFeedKey = outputNames.join(',') + '|' + feedDict.names().join(',');
	  var sorted;
	  var recipientCounts;

	  if (cachedSorted[fetchAndFeedKey] == null) {
	    // Cache doesn't contain the desired combination of fetches. Compute
	    // topological sort for the combination for the first time.
	    var out = getTopologicalSortAndRecipientCounts(fetchArray, feedDict);
	    sorted = out.sorted;
	    recipientCounts = out.recipientCounts; // Store results in cache for future use.

	    cachedSorted[fetchAndFeedKey] = sorted;
	    cachedRecipientCounts[fetchAndFeedKey] = recipientCounts;
	  }

	  sorted = cachedSorted[fetchAndFeedKey];
	  recipientCounts = {};

	  if (!training) {
	    Object.assign(recipientCounts, cachedRecipientCounts[fetchAndFeedKey]);
	  }

	  var internalFeedDict = new FeedDict(feedDict); // Start iterative execution on the topologically-sorted SymbolicTensors.

	  for (var i = 0; i < sorted.length; ++i) {
	    if (probe != null) {
	      // For optional probing of memory usage during execution.
	      var numTensors = memory().numTensors;

	      if (numTensors > probe.maxNumTensors) {
	        probe.maxNumTensors = numTensors;
	      }

	      if (numTensors < probe.minNumTensors) {
	        probe.minNumTensors = numTensors;
	      }
	    }

	    var symbolic = sorted[i];
	    var srcLayer = symbolic.sourceLayer;

	    if (srcLayer instanceof InputLayer) {
	      continue;
	    }

	    var inputValues = [];
	    var inputMasks = [];
	    var tensorsToDispose = [];
	    var maskExists = false;

	    for (var _iterator3 = _createForOfIteratorHelperLoose(symbolic.inputs), _step3; !(_step3 = _iterator3()).done;) {
	      var input = _step3.value;
	      var value = internalFeedDict.getValue(input);
	      var mask = internalFeedDict.getMask(input);
	      inputValues.push(value);
	      inputMasks.push(mask);

	      if (mask != null) {
	        maskExists = true;
	      }

	      if (!training) {
	        recipientCounts[input.name]--;

	        if (recipientCounts[input.name] === 0 && !feedDict.hasKey(input) && outputNames.indexOf(input.name) === -1 && !value.isDisposed && input.sourceLayer.stateful !== true) {
	          tensorsToDispose.push(value);
	        }
	      }
	    }

	    if (maskExists) {
	      kwargs = kwargs || {};
	      kwargs['mask'] = inputMasks[0];
	    }

	    var outputTensors = toList(srcLayer.apply(inputValues, kwargs));
	    var outputMask = null;

	    if (srcLayer.supportsMasking) {
	      outputMask = srcLayer.computeMask(inputValues, inputMasks);
	    }

	    var layerOutputs = getNodeOutputs(symbolic);
	    var outputSymbolicTensors = Array.isArray(layerOutputs) ? layerOutputs : [layerOutputs];

	    for (var _i = 0; _i < outputSymbolicTensors.length; ++_i) {
	      if (!internalFeedDict.hasKey(outputSymbolicTensors[_i])) {
	        internalFeedDict.add(outputSymbolicTensors[_i], outputTensors[_i], Array.isArray(outputMask) ? outputMask[0] : outputMask);
	      }

	      var index = outputNames.indexOf(outputSymbolicTensors[_i].name);

	      if (index !== -1) {
	        finalOutputs[index] = outputTensors[_i];
	      }
	    }

	    if (!training) {
	      // Clean up Tensors that are no longer needed.
	      dispose(tensorsToDispose);
	    }
	  } // NOTE(cais): Unlike intermediate tensors, we don't discard mask
	  // tensors as we go, because these tensors are sometimes passed over a
	  // series of mutliple layers, i.e., not obeying the immediate input
	  // relations in the graph. If this becomes a memory-usage concern,
	  // we can improve this in the future.


	  internalFeedDict.disposeMasks();
	  return arrayFetches ? finalOutputs : finalOutputs[0];
	}