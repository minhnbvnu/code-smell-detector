function toClassObject(mutatorMap) {
	  var objExpr = t.objectExpression([]);

	  (0, _keys2.default)(mutatorMap).forEach(function (mutatorMapKey) {
	    var map = mutatorMap[mutatorMapKey];
	    var mapNode = t.objectExpression([]);

	    var propNode = t.objectProperty(map._key, mapNode, map._computed);

	    (0, _keys2.default)(map).forEach(function (key) {
	      var node = map[key];
	      if (key[0] === "_") return;

	      var inheritNode = node;
	      if (t.isClassMethod(node) || t.isClassProperty(node)) node = node.value;

	      var prop = t.objectProperty(t.identifier(key), node);
	      t.inheritsComments(prop, inheritNode);
	      t.removeComments(inheritNode);

	      mapNode.properties.push(prop);
	    });

	    objExpr.properties.push(propNode);
	  });

	  return objExpr;
	}