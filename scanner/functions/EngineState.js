function EngineState() {
	    // Public since optimizers will use it.
	    this.registeredVariables = {};
	    this.nextTapeNodeId = 0;
	    this.numBytes = 0;
	    this.numTensors = 0;
	    this.numStringTensors = 0;
	    this.numDataBuffers = 0; // Number of nested tf.grad() statements when computing higher-order
	    // gradients. E.g. `1` for first-order gradients and `2` for second-order
	    // gradients. Used to track if the tape should be removed after a backprop.

	    this.gradientDepth = 0; // Number of nested kernel calls. When kernel depth is greater than 1, we turn
	    // off the tape.

	    this.kernelDepth = 0;
	    this.scopeStack = [];
	    /**
	     * Keeps track of the number of data moves during a kernel execution. We
	     * maintain a stack since kernels can call other kernels, recursively.
	     */

	    this.numDataMovesStack = [];
	    this.nextScopeId = 0;
	    this.tensorInfo = new WeakMap();
	    this.profiling = false;
	    this.activeProfile = {
	      newBytes: 0,
	      newTensors: 0,
	      peakBytes: 0,
	      kernels: [],
	      result: null,

	      get kernelNames() {
	        return Array.from(new Set(this.kernels.map(function (k) {
	          return k.name;
	        })));
	      }

	    };
	  }