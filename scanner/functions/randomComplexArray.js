function randomComplexArray(n){ // TA
    var r = new Float64Array(n);
    var i = new Float64Array(n);

    for(var j = 0; j < n; ++j){
        r[j] = Math.commonRandomJS()*2 - 1;
        i[j] = Math.commonRandomJS()*2 - 1;
    }
    return {"r": r, "i": i};
}