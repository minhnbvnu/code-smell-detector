function _get$1() {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get$1 = Reflect.get.bind();
	  } else {
	    _get$1 = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);
	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }
	      return desc.value;
	    };
	  }
	  return _get$1.apply(this, arguments);
	}