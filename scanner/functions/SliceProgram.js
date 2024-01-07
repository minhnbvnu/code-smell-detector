function SliceProgram(destSize) {
	    this.variableNames = ['source'];
	    this.outputShape = destSize;
	    this.rank = destSize.length;
	    var dtype = getCoordsDataType(this.rank);
	    var uniformPart = "uniform int start[" + this.rank + "];";
	    var sourceCoords = getCoords(this.rank);
	    var body;
	    var coordSum = destSize.map(function (_, i) {
	      return "sourceLoc." + coords[i] + " = start[" + i + "] + coords." + coords[i] + ";";
	    });
	    body = "\n        " + dtype + " sourceLoc;\n        " + dtype + " coords = getOutputCoords();\n        " + coordSum.join('\n') + "\n      ";
	    this.userCode = "\n      " + uniformPart + "\n      void main() {\n        " + body + "\n        setOutput(getSource(" + sourceCoords + "));\n      }\n    ";
	  }