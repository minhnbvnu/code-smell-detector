function calcCircleRadius(x,y,r) {
    var d = Math.sqrt(x*x+y*y);
    return r - d;
}