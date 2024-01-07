function toComputedObjectFromClass(obj) {
	  var objExpr = t.arrayExpression([]);

	  for (var i = 0; i < obj.properties.length; i++) {
	    var prop = obj.properties[i];
	    var val = prop.value;
	    val.properties.unshift(t.objectProperty(t.identifier("key"), t.toComputedKey(prop)));
	    objExpr.elements.push(val);
	  }

	  return objExpr;
	}