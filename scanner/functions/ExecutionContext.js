function ExecutionContext(weightMap, tensorArrayMap, tensorListMap, functionMap) {
	    if (weightMap === void 0) {
	      weightMap = {};
	    }

	    if (tensorArrayMap === void 0) {
	      tensorArrayMap = {};
	    }

	    if (tensorListMap === void 0) {
	      tensorListMap = {};
	    }

	    if (functionMap === void 0) {
	      functionMap = {};
	    }

	    this.weightMap = weightMap;
	    this.tensorArrayMap = tensorArrayMap;
	    this.tensorListMap = tensorListMap;
	    this.functionMap = functionMap;
	    this.rootContext = {
	      id: 0,
	      frameName: '',
	      iterationId: 0
	    };
	    this.contexts = [this.rootContext];
	    this.lastId = 0;
	    this.generateCurrentContextIds();
	  }