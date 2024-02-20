function typeEquiv( a, b ) {
		var type = QUnit.objectType( a );
		return QUnit.objectType( b ) === type && callbacks[ type ]( b, a );
	}