function lud(size) {
    size = size|0;
    var i=0,j=0,k=0;
    var sum=0.0;

    for(i=0; (i|0)<(size|0); (++i)|0) {
	for(j=i|0; (j|0)<(size|0); (++j)|0) {
	    sum = +matrix[((((i|0)*(size|0))+j)|0)];
	    for (k=0; (k|0)<(i|0); (++k)|0) {
		sum = +(sum - +(+matrix[((i*size)|0+k)|0] * +matrix[((k*size)|0+j)|0]));
	    }

	    matrix[((i*size)|0+j)|0] = +sum;
	}

	for (j=(i+1)|0; (j|0)<(size|0); (j++)|0) {
	    sum=+matrix[((j*size)|0+i)|0];
	    for (k=0; (k|0)<(i|0); (++k)|0) {
		sum = +(sum - +(+matrix[((j*size)|0+k)|0] * +matrix[((k*size)|0+i)|0]));
	    }
	    matrix[((j*size)|0+i)|0] = +(+sum / +matrix[((i*size)|0+i)|0]);
	}
    }
}