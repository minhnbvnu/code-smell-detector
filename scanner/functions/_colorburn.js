function _colorburn() {
        var dr1 = 255 - ((255 - dr) << 8) / sr;
        var dg1 = 255 - ((255 - dg) << 8) / sg;
        var db1 = 255 - ((255 - db) << 8) / sb;

        or = (dr1 < 0 || sr === 0) ? 0 : dr1;
        og = (dg1 < 0 || sg === 0) ? 0 : dg1;
        ob = (db1 < 0 || sb === 0) ? 0 : db1;
    }