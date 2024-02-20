function _svg_overlay() {
        if (2 * dr <= da) {
            or = 2 * sr * dr + sr * (1 - da) + dr * (1 - sa);
        } else {
            or = sr * (1 + da) + dr * (1 + sa) - 2 * dr * sr - da * sa;
        }
        if (2 * dg <= da) {
            og = 2 * sg * dg + sg * (1 - da) + dg * (1 - sa);
        } else {
            og = sg * (1 + da) + dg * (1 + sa) - 2 * dg * sg - da * sa;
        }
        if (2 * db <= da) {
            ob = 2 * sb * db + sb * (1 - da) + db * (1 - sa);
        } else {
            ob = sb * (1 + da) + db * (1 + sa) - 2 * db * sb - da * sa;
        }
    }