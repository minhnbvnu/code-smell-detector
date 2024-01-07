function getOptimizer(identifier) {
	  var optimizerMap = {
	    'Adagrad': function Adagrad() {
	      return train.adagrad(0.01);
	    },
	    'Adadelta': function Adadelta() {
	      return train.adadelta(1, 0.95, epsilon());
	    },
	    'Adam': function Adam() {
	      return train.adam(0.001, 0.9, 0.999, epsilon());
	    },
	    'Adamax': function Adamax() {
	      return train.adamax(0.002, 0.9, 0.999, epsilon(), 0);
	    },
	    'RMSProp': function RMSProp() {
	      return train.rmsprop(0.001, 0.9, 0, epsilon());
	    },
	    'SGD': function SGD() {
	      return train.sgd(0.01);
	    }
	  };
	  optimizerMap['adagrad'] = optimizerMap['Adagrad'];
	  optimizerMap['adadelta'] = optimizerMap['Adadelta'];
	  optimizerMap['adam'] = optimizerMap['Adam'];
	  optimizerMap['adamax'] = optimizerMap['Adamax'];
	  optimizerMap['rmsprop'] = optimizerMap['RMSProp'];
	  optimizerMap['sgd'] = optimizerMap['SGD'];

	  if (identifier in optimizerMap) {
	    return optimizerMap[identifier]();
	  }

	  throw new ValueError("Unknown Optimizer " + identifier);
	}