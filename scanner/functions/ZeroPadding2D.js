function ZeroPadding2D(args) {
	    var _this;

	    if (args == null) {
	      args = {};
	    }

	    _this = _Layer.call(this, args) || this;
	    _this.dataFormat = args.dataFormat == null ? imageDataFormat() : args.dataFormat; // TODO(cais): Maybe refactor the following logic surrounding `padding`
	    //   into a helper method.

	    if (args.padding == null) {
	      _this.padding = [[1, 1], [1, 1]];
	    } else if (typeof args.padding === 'number') {
	      _this.padding = [[args.padding, args.padding], [args.padding, args.padding]];
	    } else {
	      args.padding = args.padding;

	      if (args.padding.length !== 2) {
	        throw new ValueError("ZeroPadding2D expects padding to be a length-2 array, but " + ("received a length-" + args.padding.length + " array."));
	      }

	      var heightPadding;
	      var widthPadding;

	      if (typeof args.padding[0] === 'number') {
	        heightPadding = [args.padding[0], args.padding[0]];
	        widthPadding = [args.padding[1], args.padding[1]];
	      } else {
	        args.padding = args.padding;

	        if (args.padding[0].length !== 2) {
	          throw new ValueError("ZeroPadding2D expects height padding to be a length-2 array, " + ("but received a length-" + args.padding[0].length + " array."));
	        }

	        heightPadding = args.padding[0];

	        if (args.padding[1].length !== 2) {
	          throw new ValueError("ZeroPadding2D expects width padding to be a length-2 array, " + ("but received a length-" + args.padding[1].length + " array."));
	        }

	        widthPadding = args.padding[1];
	      }

	      _this.padding = [heightPadding, widthPadding];
	    }

	    _this.inputSpec = [new InputSpec({
	      ndim: 4
	    })];
	    return _this;
	  }