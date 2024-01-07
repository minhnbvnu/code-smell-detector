function LayerVariable(val, dtype, name, trainable, constraint) {
	    if (dtype === void 0) {
	      dtype = 'float32';
	    }

	    if (name === void 0) {
	      name = DEFAULT_VARIABLE_NAME_PREFIX;
	    }

	    if (trainable === void 0) {
	      trainable = true;
	    }

	    if (constraint === void 0) {
	      constraint = null;
	    }

	    this.dtype = dtype == null ? 'float32' : dtype;
	    this.shape = val.shape;
	    this.id = getNextUniqueTensorId();
	    name = name == null ? DEFAULT_VARIABLE_NAME_PREFIX : name;
	    this.originalName = getScopedTensorName(name);
	    this.name = getUniqueTensorName(this.originalName);
	    this.trainable_ = trainable;
	    this.constraint = constraint;
	    this.val = variable(val, this.trainable_, this.name, this.dtype);
	  }