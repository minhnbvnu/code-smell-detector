function printLayerSummary(layer, positions, // tslint:disable-next-line:no-any
	printFn) {
	  var outputShape;

	  try {
	    outputShape = JSON.stringify(layer.outputShape);
	  } catch (err) {
	    outputShape = 'multiple';
	  }

	  var name = layer.name;
	  var className = layer.getClassName();
	  var fields = [name + " (" + className + ")", outputShape, layer.countParams().toString()];
	  printRow(fields, positions, printFn);
	}