function getNextLineInPool() {

		if ( _lineCount === _linePoolLength ) {

			var line = new RenderableLine();
			_linePool.push( line );
			_linePoolLength ++;
			_lineCount ++;
			return line;

		}

		return _linePool[ _lineCount ++ ];

	}