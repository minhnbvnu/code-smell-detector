function getNextObjectInPool() {

		if ( _objectCount === _objectPoolLength ) {

			var object = new RenderableObject();
			_objectPool.push( object );
			_objectPoolLength ++;
			_objectCount ++;
			return object;

		}

		return _objectPool[ _objectCount ++ ];

	}