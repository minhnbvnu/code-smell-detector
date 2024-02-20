function _softlight() {
        if (dr < 128) {
            or = ((sr >> 1) + 64) * dr * div_2_255;
        } else {
            or = 255 - (191 - (sr >> 1)) * (255 - dr) * div_2_255;
        }

        if (dg < 128) {
            og = ((sg >> 1) + 64) * dg * div_2_255;
        } else {
            og = 255 - (191 - (sg >> 1)) * (255 - dg) * div_2_255;
        }

        if (db < 128) {
            ob = ((sb >> 1) + 64) * db * div_2_255;
        } else {
            ob = 255 - (191 - (sb >> 1)) * (255 - db) * div_2_255;
        }
    }