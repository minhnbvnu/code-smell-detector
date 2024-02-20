function fftSimple(r, i){
    var N = r.length;
    var R = new Float64Array(N);
    var I = new Float64Array(N);

    if(N===1){
        R[0] = r[0];
        I[0] = i[0];
        return { "r" : R, "i": I};
    }

    var er = new Float64Array(N/2);
    var ei = new Float64Array(N/2);
    var dr = new Float64Array(N/2);
    var di = new Float64Array(N/2);

    for(var k=0; k < N/2; ++k){
        er[k] = r[2*k];
        ei[k] = i[2*k];
        dr[k] = r[2*k + 1];
        di[k] = i[2*k + 1];
    }


    var E = fftSimple(er, ei);
    var D = fftSimple(dr, di);
    var ER = E.r;
    var EI = E.i;
    var DR = D.r;
    var DI = D.i;

    for(var k = 0; k < r.length/2; ++k){
        var c = complexPolar(1, -2.0*Math.PI*k/N);
        var t = DR[k];
        DR[k] = t*c.r - DI[k]*c.i;
        DI[k] = t*c.i + DI[k]*c.r;
    }



    for(k = 0; k<N/2; ++k){
        R[k] = ER[k] + DR[k];
        I[k] = EI[k] + DI[k];

        R[k + N/2] = ER[k] - DR[k];
        I[k + N/2] = EI[k] - DI[k];
    }
    return {"r":R, "i":I};
}