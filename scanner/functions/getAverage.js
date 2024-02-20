function getAverage( triangleBounds, offset, count, axis ) {

    	let avg = 0;
    	for ( let i = offset, end = offset + count; i < end; i ++ ) {

    		avg += triangleBounds[ i * 6 + axis * 2 ];

    	}

    	return avg / count;

    }