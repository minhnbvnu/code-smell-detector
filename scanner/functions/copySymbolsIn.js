function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}