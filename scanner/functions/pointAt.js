function pointAt(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    var a, b, c, d, coeff;
    coeff = coefficients(t);
    a = coeff[0];
    b = coeff[1];
    c = coeff[2];
    d = coeff[3];
    return {x: a * x1 + b * x2 + c * x3 + d * x4,
            y: a * y1 + b * y2 + c * y3 + d * y4};
}