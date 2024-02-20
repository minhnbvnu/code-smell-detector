function seededRandom( s ) {

    	if ( s !== undefined ) _seed = s % 2147483647;

    	// Park-Miller algorithm

    	_seed = _seed * 16807 % 2147483647;

    	return ( _seed - 1 ) / 2147483646;

    }