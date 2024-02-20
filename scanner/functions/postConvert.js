function postConvert(image, data) {
            if (image.type === GL_HALF_FLOAT_OES$1) {
                image.data = convertToHalfFloat(data);
                pool.freeType(data);
            }
            else {
                image.data = data;
            }
        }