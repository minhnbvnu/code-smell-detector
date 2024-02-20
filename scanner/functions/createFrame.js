function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}