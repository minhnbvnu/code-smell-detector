function _pinlight() {
        var a;

        if (sr < 128) {
            a = 2 * sr;
            or = dr < a ? dr : a;
        } else {
            a = 2 * sr - 256;
            or = dr > a ? dr : a;
        }

        if (sg < 128) {
            a = 2 * sg;
            og = dg < a ? dg : a;
        } else {
            a = 2 * sg - 256;
            og = dg > a ? dg : a;
        }

        if (sb < 128) {
            a = 2 * sb;
            ob = db < a ? db : a;
        } else {
            a = 2 * sb - 256;
            ob = db > a ? db : a;
        }
    }