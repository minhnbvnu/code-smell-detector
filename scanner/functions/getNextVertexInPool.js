function getNextVertexInPool() {

		if ( _vertexCount === _vertexPoolLength ) {

			var vertex = new RenderableVertex();
			_vertexPool.push( vertex );
			_vertexPoolLength ++;
			_vertexCount ++;
			return vertex;

		}

		return _vertexPool[ _vertexCount ++ ];

	}