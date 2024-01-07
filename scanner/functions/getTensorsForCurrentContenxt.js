function getTensorsForCurrentContenxt(name, tensorsMap, context) {
	  return tensorsMap[getNodeNameWithContextId(name, context.currentContextId)];
	}