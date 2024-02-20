function getNextFaceInPool() {

		if ( _faceCount === _facePoolLength ) {

			var face = new RenderableFace();
			_facePool.push( face );
			_facePoolLength ++;
			_faceCount ++;
			return face;

		}

		return _facePool[ _faceCount ++ ];


	}