function rnn(stepFunction, inputs, initialStates, goBackwards, mask, constants, unroll, needPerStepOutputs) {
	  if (goBackwards === void 0) {
	    goBackwards = false;
	  }

	  if (unroll === void 0) {
	    unroll = false;
	  }

	  if (needPerStepOutputs === void 0) {
	    needPerStepOutputs = false;
	  }

	  return tidy(function () {
	    var ndim = inputs.shape.length;

	    if (ndim < 3) {
	      throw new ValueError("Input should be at least 3D, but is " + ndim + "D.");
	    } // Transpose to time-major, i.e., from [batch, time, ...] to [time, batch,
	    // ...].


	    var axes = [1, 0].concat(range$1(2, ndim));
	    inputs = transpose(inputs, axes);

	    if (constants != null) {
	      throw new NotImplementedError('The rnn() functoin of the deeplearn.js backend does not support ' + 'constants yet.');
	    } // Porting Note: the unroll option is ignored by the imperative backend.


	    if (unroll) {
	      console.warn('Backend rnn(): the unroll = true option is not applicable to the ' + 'imperative deeplearn.js backend.');
	    }

	    if (mask != null) {
	      mask = mask.asType('bool').asType('float32');

	      if (mask.rank === ndim - 1) {
	        mask = expandDims(mask, -1);
	      }

	      mask = transpose(mask, axes);
	    }

	    if (goBackwards) {
	      inputs = reverse(inputs, 0);

	      if (mask != null) {
	        mask = reverse(mask, 0);
	      }
	    } // Porting Note: PyKeras with TensorFlow backend uses a symbolic loop
	    //   (tf.while_loop). But for the imperative deeplearn.js backend, we just
	    //   use the usual TypeScript control flow to iterate over the time steps in
	    //   the inputs.
	    // Porting Note: PyKeras patches a "_use_learning_phase" attribute to
	    // outputs.
	    //   This is not idiomatic in TypeScript. The info regarding whether we are
	    //   in a learning (i.e., training) phase for RNN is passed in a different
	    //   way.


	    var perStepOutputs = [];
	    var lastOutput;
	    var states = initialStates;
	    var timeSteps = inputs.shape[0];
	    var perStepInputs = unstack(inputs);
	    var perStepMasks;

	    if (mask != null) {
	      perStepMasks = unstack(mask);
	    }

	    var _loop = function _loop(t) {
	      var currentInput = perStepInputs[t];
	      var stepOutputs = tidy(function () {
	        return stepFunction(currentInput, states);
	      });

	      if (mask == null) {
	        lastOutput = stepOutputs[0];
	        states = stepOutputs[1];
	      } else {
	        var maskedOutputs = tidy(function () {
	          var stepMask = perStepMasks[t];
	          var negStepMask = onesLike(stepMask).sub(stepMask); // TODO(cais): Would tfc.where() be better for performance?

	          var output = stepOutputs[0].mul(stepMask).add(states[0].mul(negStepMask));
	          var newStates = states.map(function (state, i) {
	            return stepOutputs[1][i].mul(stepMask).add(state.mul(negStepMask));
	          });
	          return {
	            output: output,
	            newStates: newStates
	          };
	        });
	        lastOutput = maskedOutputs.output;
	        states = maskedOutputs.newStates;
	      }

	      if (needPerStepOutputs) {
	        perStepOutputs.push(lastOutput);
	      }
	    };

	    for (var t = 0; t < timeSteps; ++t) {
	      _loop(t);
	    }

	    var outputs;

	    if (needPerStepOutputs) {
	      var axis = 1;
	      outputs = stack(perStepOutputs, axis);
	    }

	    return [lastOutput, outputs, states];
	  });
	}