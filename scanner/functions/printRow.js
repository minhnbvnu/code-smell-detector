function printRow(fields, positions, // tslint:disable-next-line:no-any
	printFn) {
	  if (printFn === void 0) {
	    printFn = console.log;
	  }

	  var line = '';

	  for (var i = 0; i < fields.length; ++i) {
	    if (i > 0) {
	      line = line.slice(0, line.length - 1) + ' ';
	    }

	    line += fields[i];
	    line = line.slice(0, positions[i]);
	    line += ' '.repeat(positions[i] - line.length);
	  }

	  printFn(line);
	}