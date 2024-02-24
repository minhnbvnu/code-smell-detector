function signedArea( data, start, end, dim ) {

    	let sum = 0;
    	for ( let i = start, j = end - dim; i < end; i += dim ) {

    		sum += ( data[ j ] - data[ i ] ) * ( data[ i + 1 ] + data[ j + 1 ] );
    		j = i;

    	}

    	return sum;

    }