function sphere(a, b, rf, ellps, sphere) {
        if (!a) { // do we have an ellipsoid?
            var ellipse = (0, match_1.default)(Ellipsoid_1.default, ellps);
            if (!ellipse) {
                ellipse = Ellipsoid_1.WGS84;
            }
            a = ellipse.a;
            b = ellipse.b;
            rf = ellipse.rf;
        }
        if (rf && !b) {
            b = (1.0 - 1.0 / rf) * a;
        }
        if (rf === 0 || Math.abs(a - b) < values_1.EPSLN) {
            sphere = true;
            b = a;
        }
        return {
            a: a,
            b: b,
            rf: rf,
            sphere: sphere
        };
    }