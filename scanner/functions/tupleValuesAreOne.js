function tupleValuesAreOne(param) {
	  var _parseTupleParam4 = parseTupleParam(param),
	      dimA = _parseTupleParam4[0],
	      dimB = _parseTupleParam4[1],
	      dimC = _parseTupleParam4[2];

	  return dimA === 1 && dimB === 1 && dimC === 1;
	}