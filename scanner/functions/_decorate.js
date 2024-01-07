function _decorate(decorators, factory, superClass, mixins) {
	  var api = _getDecoratorsApi();

	  if (mixins) {
	    for (var i = 0; i < mixins.length; i++) {
	      api = mixins[i](api);
	    }
	  }

	  var r = factory(function initialize(O) {
	    api.initializeInstanceElements(O, decorated.elements);
	  }, superClass);
	  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
	  api.initializeClassElements(r.F, decorated.elements);
	  return api.runClassFinishers(r.F, decorated.finishers);
	}