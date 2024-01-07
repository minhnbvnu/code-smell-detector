function printSummary(model, lineLength, positions, // tslint:disable-next-line:no-any
	printFn) {
	  if (printFn === void 0) {
	    printFn = console.log;
	  }

	  var sequentialLike = isModelSequentialLike(model); // Header names for different log elements.

	  var toDisplay = ['Layer (type)', 'Output shape', 'Param #'];

	  if (sequentialLike) {
	    lineLength = lineLength || 65;
	    positions = positions || [0.45, 0.85, 1];
	  } else {
	    lineLength = lineLength || 98;
	    positions = positions || [0.33, 0.55, 0.67, 1]; // Header names for different log elements.
	  }

	  if (positions[positions.length - 1] <= 1) {
	    // `positions` is relative. Convert it to absolute positioning.
	    positions = positions.map(function (p) {
	      return Math.floor(lineLength * p);
	    });
	  }

	  var relevantNodes;

	  if (!sequentialLike) {
	    toDisplay.push('Receives inputs');
	    relevantNodes = [];

	    for (var depth in model.nodesByDepth) {
	      var _relevantNodes;

	      (_relevantNodes = relevantNodes).push.apply(_relevantNodes, model.nodesByDepth[depth]);
	    }
	  }

	  printFn('_'.repeat(lineLength));
	  printRow(toDisplay, positions, printFn);
	  printFn('='.repeat(lineLength));
	  var layers = model.layers;

	  for (var i = 0; i < layers.length; ++i) {
	    if (sequentialLike) {
	      printLayerSummary(layers[i], positions, printFn);
	    } else {
	      printLayerSummaryWithConnections(layers[i], positions, relevantNodes, printFn);
	    }

	    printFn((i === layers.length - 1 ? '=' : '_').repeat(lineLength));
	  } // tslint:disable-next-line:no-any


	  model.checkTrainableWeightsConsistency();
	  var trainableCount = countTrainableParams(model);
	  var nonTrainableCount = countParamsInWeights(model.nonTrainableWeights);
	  printFn("Total params: " + (trainableCount + nonTrainableCount));
	  printFn("Trainable params: " + trainableCount);
	  printFn("Non-trainable params: " + nonTrainableCount);
	  printFn('_'.repeat(lineLength));
	}