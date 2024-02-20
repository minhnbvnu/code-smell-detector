function _linearlight() {
        var dr1 = 2 * sr + dr - 256;
        var dg1 = 2 * sg + dg - 256;
        var db1 = 2 * sb + db - 256;

        or = (dr1 < 0 || (sr < 128 && dr1 < 0)) ? 0 : (dr1 > 255 ? 255 : dr1);
        og = (dg1 < 0 || (sg < 128 && dg1 < 0)) ? 0 : (dg1 > 255 ? 255 : dg1);
        ob = (db1 < 0 || (sb < 128 && db1 < 0)) ? 0 : (db1 > 255 ? 255 : db1);
    }