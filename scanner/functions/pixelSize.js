function pixelSize(type, channels) {
            if (type === GL_UNSIGNED_SHORT_5_5_5_1 ||
                type === GL_UNSIGNED_SHORT_4_4_4_4 ||
                type === GL_UNSIGNED_SHORT_5_6_5) {
                return 2;
            }
            else if (type === GL_UNSIGNED_INT_24_8_WEBGL) {
                return 4;
            }
            else {
                return TYPE_SIZE[type] * channels;
            }
        }