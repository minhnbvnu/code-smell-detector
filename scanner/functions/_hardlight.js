function _hardlight() {
        if (sr < 128) {
            or = dr * sr * div_2_255;
        } else {
            or = 255 - (255 - dr) * (255 - sr) * div_2_255;
        }

        if (sg < 128) {
            og = dg * sg * div_2_255;
        } else {
            og = 255 - (255 - dg) * (255 - sg) * div_2_255;
        }

        if (sb < 128) {
            ob = db * sb * div_2_255;
        } else {
            ob = 255 - (255 - db) * (255 - sb) * div_2_255;
        }
    }