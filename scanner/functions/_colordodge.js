function _colordodge() {
        var dr1 = (dr << 8) / (255 - sr);
        var dg1 = (dg << 8) / (255 - sg);
        var db1 = (db << 8) / (255 - sb);

        or = (dr1 > 255 || sr === 255) ? 255 : dr1;
        og = (dg1 > 255 || sg === 255) ? 255 : dg1;
        ob = (db1 > 255 || sb === 255) ? 255 : db1;
    }