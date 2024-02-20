function _lightercolor() {
        if (dr * 0.3 + dg * 0.59 + db * 0.11 > sr * 0.3 + sg * 0.59 + sb * 0.11) {
            or = dr;
            og = dg;
            ob = db;
        } else {
            or = sr;
            og = sg;
            ob = sb;
        }
    }