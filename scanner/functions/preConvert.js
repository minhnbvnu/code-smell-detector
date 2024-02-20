function preConvert(image, n) {
            return pool.allocType(image.type === GL_HALF_FLOAT_OES$1
                ? GL_FLOAT$4
                : image.type, n);
        }