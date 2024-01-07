function _coalesceClassElements(elements) {
	  var newElements = [];

	  var isSameElement = function (other) {
	    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
	  };

	  for (var i = 0; i < elements.length; i++) {
	    var element = elements[i];
	    var other;

	    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
	      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
	        if (_hasDecorators(element) || _hasDecorators(other)) {
	          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
	        }

	        other.descriptor = element.descriptor;
	      } else {
	        if (_hasDecorators(element)) {
	          if (_hasDecorators(other)) {
	            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
	          }

	          other.decorators = element.decorators;
	        }

	        _coalesceGetterSetter(element, other);
	      }
	    } else {
	      newElements.push(element);
	    }
	  }

	  return newElements;
	}