function _cubicRoots(a, b, c, d) {
        var A = b / a,
            B = c / a,
            C = d / a,
            Q = (3*B - Math.pow(A, 2))/9,
            R = (9*A*B - 27*C - 2*Math.pow(A, 3))/54,
            D = Math.pow(Q, 3) + Math.pow(R, 2),
            S,
            T,
            t = [];

        if (D >= 0)                                 // complex or duplicate roots
        {
            S = sgn(R + Math.sqrt(D))*Math.pow(Math.abs(R + Math.sqrt(D)),(1/3));
            T = sgn(R - Math.sqrt(D))*Math.pow(Math.abs(R - Math.sqrt(D)),(1/3));

            t[0] = -A/3 + (S + T);
            t[1] = -A/3 - (S + T)/2;
            t[2] = -A/3 - (S + T)/2;

            /*discard complex roots*/
            if (Math.abs(Math.sqrt(3)*(S - T)/2) !== 0) {
                t[1] = -1;
                t[2] = -1;
            }
        }
        else                                          // distinct real roots
        {
            var th = Math.acos(R/Math.sqrt(-Math.pow(Q, 3)));
            t[0] = 2*Math.sqrt(-Q)*Math.cos(th/3) - A/3;
            t[1] = 2*Math.sqrt(-Q)*Math.cos((th + 2*Math.PI)/3) - A/3;
            t[2] = 2*Math.sqrt(-Q)*Math.cos((th + 4*Math.PI)/3) - A/3;
        }

        // discard out of spec roots
        for (var i = 0; i < 3; i++) {
            if (t[i] < 0 || t[i] > 1.0) {
                t[i] = -1;
            }
        }

        return t;
    }