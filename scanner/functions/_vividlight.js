function _vividlight() {
        var a;

        if (sr < 128) {
            if (sr) {
                a = 255 - ((255 - dr) << 8) / (2 * sr);
                or = a < 0 ? 0 : a;
            } else {
                or = 0;
            }
        } else {
            a = 2 * sr - 256;
            if (a < 255) {
                a = (dr << 8) / (255 - a);
                or = a > 255 ? 255 : a;
            } else {
                or = a < 0 ? 0 : a;
            }
        }

        if (sg < 128) {
            if (sg) {
                a = 255 - ((255 - dg) << 8) / (2 * sg);
                og = a < 0 ? 0 : a;
            } else {
                og = 0;
            }
        } else {
            a = 2 * sg - 256;
            if (a < 255) {
                a = (dg << 8) / (255 - a);
                og = a > 255 ? 255 : a;
            } else {
                og = a < 0 ? 0 : a;
            }
        }

        if (sb < 128) {
            if (sb) {
                a = 255 - ((255 - db) << 8) / (2 * sb);
                ob = a < 0 ? 0 : a;
            } else {
                ob = 0;
            }
        } else {
            a = 2 * sb - 256;
            if (a < 255) {
                a = (db << 8) / (255 - a);
                ob = a > 255 ? 255 : a;
            } else {
                ob = a < 0 ? 0 : a;
            }
        }
    }