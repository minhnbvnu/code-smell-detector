function getRenderbufferSize(format, width, height) {
            return FORMAT_SIZES[format] * width * height;
        }