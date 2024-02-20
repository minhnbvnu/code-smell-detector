function ludVerify(m, lu) {
    var size = Math.sqrt(m.length);
    var tmp = new Float64Array(m.length);

    for (var i=0; i<size; i++) {
        for (var j=0; j<size; j++) {
            var sum = 0;
            var l,u;
            for (var k=0; k<=Math.min(i,j); k++) {
                if (i==k) {
                    l=1;
                } else {
                    l=lu[i*size+k];
                }
                u=lu[k*size+j];
                sum+=l*u;
            }
            tmp[i*size+j] = sum;
        }
    }

    for (var i=0; i<size; i++) {
        for (var j=0; j<size; j++) {
            var a = m[i*size+j];
            var b = tmp[i*size+j];
            if (Math.abs(a-b)/Math.abs(a) > 0.00000000001) {
                throw new Error("dismatch at (" + i + "," + j + "): (o)" + a + " (n)" + b);
            }
        }
    }
    console.log("For all practical purposes, the original matrix and the one computed from the LUD are identical");
}