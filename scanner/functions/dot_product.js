function dot_product(n, x, offsetx, y,  offsety){
    var result = 0.0;
    var i = 0;
    if(!x || !y || n ===0) return result;
    for(i = 0; i < n; ++i)
        result += x[i + offsetx]*y[i + offsety];
    return result;
}