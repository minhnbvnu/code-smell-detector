function eccentricity(a, b, rf, R_A) {
        var a2 = a * a; // used in geocentric
        var b2 = b * b; // used in geocentric
        var es = (a2 - b2) / a2; // e ^ 2
        var e = 0;
        if (R_A) {
            a *= 1 - es * (values_1.SIXTH + es * (values_1.RA4 + es * values_1.RA6));
            a2 = a * a;
            es = 0;
        }
        else {
            e = Math.sqrt(es); // eccentricity
        }
        var ep2 = (a2 - b2) / b2; // used in geocentric
        return {
            es: es,
            e: e,
            ep2: ep2
        };
    }