function toDefineObject(mutatorMap) {
	  (0, _keys2.default)(mutatorMap).forEach(function (key) {
	    var map = mutatorMap[key];
	    if (map.value) map.writable = t.booleanLiteral(true);
	    map.configurable = t.booleanLiteral(true);
	    map.enumerable = t.booleanLiteral(true);
	  });

	  return toClassObject(mutatorMap);
	}