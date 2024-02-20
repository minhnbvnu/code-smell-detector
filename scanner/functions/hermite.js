function hermite(out, a, b, c, d, t) {
        var factorTimes2 = t * t;
        var factor1 = factorTimes2 * (2 * t - 3) + 1;
        var factor2 = factorTimes2 * (t - 2) + t;
        var factor3 = factorTimes2 * (t - 1);
        var factor4 = factorTimes2 * (3 - 2 * t);
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
    }