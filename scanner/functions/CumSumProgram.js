function CumSumProgram(shape, exclusive, reverse) {
	    this.variableNames = ['x'];
	    this.outputShape = shape;
	    var rank = shape.length;
	    var val = exclusive ? '0.0' : "getX(" + getCoords$1(rank, 'coords') + ")";
	    var length = shape[shape.length - 1];
	    var condition = '';
	    var idxString = ''; // When exclusive is set, the cumsum op becomes roll op that copies the
	    // value from the previous index based on the direction specified by the
	    // reverse flag.

	    if (exclusive) {
	      condition = reverse ? "end != " + (length - 1) : 'end != 0';
	      idxString = reverse ? 'end + 1' : 'end - 1';
	    } else {
	      condition = reverse ? "end + pow2 < " + length : 'end >= pow2';
	      idxString = reverse ? 'end + pow2' : 'end - pow2';
	    }

	    this.userCode = "\n      uniform float index;\n      void main() {\n        " + getCoordsDataType(rank) + " coords = getOutputCoords();\n        int end = " + getFinalCoord(rank, 'coords') + ";\n        float val = " + val + ";\n        int pow2 = int(pow(2.0, index));\n        if (" + condition + ") {\n          int idx = " + idxString + ";\n          " + getFinalCoord(rank, 'coords') + " = idx;\n          val += getX(" + getCoords$1(rank, 'coords') + ");\n        }\n        setOutput(val);\n      }\n    ";
	  }