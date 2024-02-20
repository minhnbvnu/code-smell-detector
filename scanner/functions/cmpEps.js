function cmpEps(a, b)
{
    var error = 10e-10;
    return Math.abs(a -b) < error;
}