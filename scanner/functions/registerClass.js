function registerClass(cls) {
	  assert(cls.className != null, function () {
	    return "Class being registered does not have the static className " + "property defined.";
	  });
	  assert(typeof cls.className === 'string', function () {
	    return "className is required to be a string, but got type " + typeof cls.className;
	  });
	  assert(cls.className.length > 0, function () {
	    return "Class being registered has an empty-string as its className, " + "which is disallowed.";
	  });
	  SerializationMap.register(cls);
	}