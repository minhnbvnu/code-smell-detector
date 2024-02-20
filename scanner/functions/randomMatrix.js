function randomMatrix(matrix, max, min) {
    for(var i = 0; i < matrix.length; ++i) {
	//matrix[i] = Math.random()*(max-min) + min;
        matrix[i] = Math.abs(Math.commonRandomJS()) * (max-min) + min;
    }
}