function _mmult(a, m) {
        m = m.slice();

        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];

        m[0] = a[0] * m0 + a[1] * m3;
        m[1] = a[0] * m1 + a[1] * m4;
        m[3] = a[3] * m0 + a[4] * m3;
        m[4] = a[3] * m1 + a[4] * m4;
        m[6] = a[6] * m0 + a[7] * m3 + m6;
        m[7] = a[6] * m1 + a[7] * m4 + m7;

        return transform(m);
    }