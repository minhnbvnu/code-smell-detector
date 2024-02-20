function fft2D(m){
    var M = [];
    for(var i =0; i < m.length; ++i){
        M[i]  = fftSimple(m[i]["r"], m[i]["i"]);
    }
    transpose(M);
    for(var i =0; i < m.length; ++i){
        M[i]  = fftSimple(M[i]["r"], M[i]["i"]);
    }
    transpose(M);
    return M;
}