function parseDtypeParam(value) {
	  if (typeof value === 'string') {
	    // tslint:disable-next-line:no-any
	    value = DataType[value];
	  }

	  switch (value) {
	    case DataType.DT_FLOAT:
	      return 'float32';

	    case DataType.DT_INT32:
	    case DataType.DT_INT64:
	    case DataType.DT_INT8:
	    case DataType.DT_UINT8:
	      return 'int32';

	    case DataType.DT_BOOL:
	      return 'bool';

	    case DataType.DT_DOUBLE:
	      return 'float32';

	    case DataType.DT_STRING:
	      return 'string';

	    default:
	      // Unknown dtype error will happen at runtime (instead of parse time),
	      // since these nodes might not be used by the actual subgraph execution.
	      return null;
	  }
	}