function _svg_softlight() {
        var m;
        var pow = Math.pow;

        if (0.0 === da) {
            or = sr;
            og = sg;
            ob = sb;
            return;
        }

        m = dr / da;
        if (2 * sr <= sa) {
            or = dr * (sa + (2 * sr - sa) * (1 - m)) + sr * (1 - da) + dr * (1 - sa);
        } else if (2 * sr > sa && 4 * dr <= da) {
            or = da * (2 * sr - sa) * (16 * pow(m, 3) - 12 * pow(m, 2) - 3 * m) + sr - sr * da + dr;
        } else if (2 * sr > sa && 4 * dr > da) {
            or = da * (2 * sr - sa) * (pow(m, 0.5) - m) + sr - sr * da + dr;
        }

        m = dg / da;
        if (2 * sg <= sa) {
            og = dg * (sa + (2 * sg - sa) * (1 - m)) + sg * (1 - da) + dg * (1 - sa);
        } else if (2 * sg > sa && 4 * dg <= da) {
            og = da * (2 * sg - sa) * (16 * pow(m, 3) - 12 * pow(m, 2) - 3 * m) + sg - sg * da + dg;
        } else if (2 * sg > sa && 4 * dg > da) {
            og = da * (2 * sg - sa) * (pow(m, 0.5) - m) + sg - sg * da + dg;
        }

        m = db / da;
        if (2 * sb <= sa) {
            ob = db * (sa + (2 * sb - sa) * (1 - m)) + sb * (1 - da) + db * (1 - sa);
        } else if (2 * sb > sa && 4 * db <= da) {
            ob = da * (2 * sb - sa) * (16 * pow(m, 3) - 12 * pow(m, 2) - 3 * m) + sb - sb * da + db;
        } else if (2 * sb > sa && 4 * db > da) {
            ob = da * (2 * sb - sa) * (pow(m, 0.5) - m) + sb - sb * da + db;
        }
    }