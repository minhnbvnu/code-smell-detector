function GraphExecutor(graph, parent) {
	    var _this = this;

	    this.graph = graph;
	    this.parent = parent;
	    this.compiledMap = new Map();
	    this._weightMap = {};
	    this.SEPERATOR = ',';
	    this._functions = {};
	    this._functionExecutorMap = {};
	    this._outputs = graph.outputs;
	    this._inputs = graph.inputs;
	    this._initNodes = graph.initNodes;
	    this._signature = graph.signature;
	    this._functions = graph.functions; // create sub-graph executors

	    if (graph.functions != null) {
	      Object.keys(graph.functions).forEach(function (name) {
	        _this._functionExecutorMap[name] = new GraphExecutor(graph.functions[name], _this);
	      });
	    }
	  }