function _svg_hardlight() {
        if (2 * sr <= sa) {
            or = 2 * sr * dr + sr * (1 - da) + dr * (1 - sa);
        } else {
            or = sr * (1 + da) + dr * (1 + sa) - sa * da - 2 * sr * dr;
        }

        if (2 * sg <= sa) {
            og = 2 * sg * dg + sg * (1 - da) + dg * (1 - sa);
        } else {
            og = sg * (1 + da) + dg * (1 + sa) - sa * da - 2 * sg * dg;
        }

        if (2 * sb <= sa) {
            ob = 2 * sb * db + sb * (1 - da) + db * (1 - sa);
        } else {
            ob = sb * (1 + da) + db * (1 + sa) - sa * da - 2 * sb * db;
        }
    }