function sumSqr(v) {

    var sum = 0;

    for (var i = 0; i < 1000000000; ++i)
    {
        var xx = v.x * v.x;
        var yy = v.y * v.y;
        var zz = v.z * v.z;
        sum += xx + yy + zz;
    }

    return sum;
}