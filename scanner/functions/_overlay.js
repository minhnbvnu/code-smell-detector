function _overlay() {
        if (dr < 128) {
            or = sr * dr * div_2_255;
        } else {
            or = 255 - (255 - sr) * (255 - dr) * div_2_255;
        }

        if (dg < 128) {
            og = sg * dg * div_2_255;
        } else {
            og = 255 - (255 - sg) * (255 - dg) * div_2_255;
        }

        if (db < 128) {
            ob = sb * db * div_2_255;
        } else {
            ob = 255 - (255 - sb) * (255 - db) * div_2_255;
        }
    }